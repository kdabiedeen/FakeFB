var Post = {

	/* Creates a post with the following arguments:
		PostId
		Date
		Content
		CommentCount
		Poster
		PageId
		GroupId
		LikeCount
		Likes
		
	*/
	CreatePost : function (args) {
		var Content = args.Content;
		var UserId = args.UserId;
		if (args.PageId) {
			// post to page
			var PageId = args.PageId;

			$.get("/createPostOnPage", {"Content" : Content, "PageId" : PageId, "Poster": UserId}, function(data) {
				window.location.reload();
			});
		}
		else if (args.GroupId) {
			// post to group
			var GroupId = args.GroupId;

			$.get("/createPostOnGroup", {"Content" : Content, "GroupId" : GroupId, "Poster" : UserId}, function(data) {
				window.location.reload();
			});
		}
	},

	DisplayPost : function(PostId, element_id) {
		if (!PostId || !element_id) 
			return;

		// Get info from database
		// For now, I'll hardcode it

		$.get("/displayPost", {"PostId": PostId}, function(data) {
			if (data.err) {
				console.log(data.err);
			}

			var post = data.post;
			var user = data.user;
			// Div post
			var postDiv = $("<div></div>").addClass("post").attr("id", "post_" + PostId).appendTo($("#" + element_id));

			// Div post_header
			var postHeader = $("<div></div>").addClass("post_header").appendTo(postDiv);

			$("<a></a>").addClass("post_delete").val(PostId).text("x")
				.click(function() {
					Post.DeletePost($(this).val());
				}).appendTo(postHeader);


			$("<a></a>").addClass("post_edit").val(PostId).text("Edit")
				.click(function() {
					Post.EditOverlay($(this).val(), post.Content);
				}).appendTo(postHeader);

			// Post name
			$("<div></div>").addClass("post_name").text(user.FirstName + " " + user.LastName).appendTo(postHeader);

			// Post date
			$("<div></div>").addClass("post_date").text(post.Date).appendTo(postHeader);

			// Div post_body
			var postBody = $("<div></div>").addClass("post_body").appendTo(postDiv);

			// Post content
			$("<div></div>").addClass("post_content").text(post.Content).appendTo(postBody);

			// Post Footer
			var postFooter = $("<div></div>").addClass("post_footer").appendTo(postDiv);

			if (!post.LikeCount)
				post.LikeCount = 0;

			var postLikes = $("<div></div>").addClass("post_likes").val(PostId).text(post.LikeCount + " likes").appendTo(postFooter);

			var postPlus = $("<a></a>").addClass("post_plus").val(PostId).text("+").appendTo(postLikes);
			var postMinus = $("<a></a>").addClass("post_minus").val(PostId).text("-").appendTo(postLikes);
			
			$(postPlus).click(function(){
				Post.LikePost($(this).val());
			});

			$(postMinus).click(function(){
				Post.UnlikePost($(this).val());
			});

			$("<a></a>").addClass("post_comments").val(PostId).text(post.CommentCount + " comments").appendTo(postFooter);

			$(".post_comments").unbind().click(function() {
				Post.ShowComments($(this).val(), element_id);
			});
		});

	},

	/* Transactions */

	DisplayAllPerUser : function(UserId, element_id) {
		
		if (!UserId || !element_id) 
			return;

		$.get("/displayAllPosts", {"UserId": UserId}, function(data) {
			var postIds = data;

			for (var i = 0; i < postIds.length; i++) {
				Post.DisplayPost(postIds[i], element_id);
			}
		});
	},

	DisplayPostByPage : function(PageId, element_id) {
		if (!PageId || !element_id)
			return;

		$.get("/postsByPage", {"PageId" : PageId}, function(data) {
			var postIds = data;

			for (var i = 0; i < postIds.length; i++) {
				Post.DisplayPost(postIds[i], element_id);
			}
		});
	},

	DisplayPostByGroup : function(GroupId, element_id) {
		if (!GroupId || !element_id)
			return;

		$.get("/postsByGroup", {"GroupId" : GroupId}, function(data) {
			var postIds = data;

			for (var i = 0; i < postIds.length; i++) {
				Post.DisplayPost(postIds[i], element_id);
			}
		});
	},

	LikePost : function(PostId) {
		if (!PostId) 
			return;

		$.get("/likePost", {"PostId" : PostId}, function(data) {
			window.location.reload();
		});
	},

	UnlikePost : function(PostId) {
		if (!PostId) 
			return;

		$.get("/unlikePost", {"PostId" : PostId}, function(data) {
			window.location.reload();
		});
	},

	DeletePost : function(PostId) {
		if(!PostId)
			return;

		var del = confirm("Would you like to delete this post?");
		if (!del)
			return;

		$.get("/deletePost", {"PostId": PostId}, function(data) {
			window.location.reload();
		});
	},

	EditPost : function(args) {
		$.get("/editPost", args, function(data) {
			window.location.reload();
		});
	},

	EditOverlay : function(PostId, Content) {
		if(!PostId)
			return;

		var overlay = $("<div></div>").addClass("overlay").appendTo("body");
		var innerOverlay = $("<div></div>").addClass("innerOverlay").appendTo(overlay);

		// Button to remove overlay
		$("<a></a>").text("x").click(function() {
			overlay.remove();
		}).appendTo(innerOverlay).css({
			"color":"red",
			"cursor":"pointer",
			"float":"right",
			"font-size":"16px"
		});

 		var formGroup = $("<div></div>").addClass("form-group");
		var form = $("<form></form>").appendTo(formGroup);
		var fieldset = $("<fieldset></fieldset").appendTo(form);
		$("<label></label").attr("for", "content").text("Edit Post:").appendTo(fieldset);
		$("<br />").appendTo(fieldset);
		$("<textarea></textarea>").css({
			"font-size": "16px",
			"width": "300px"
		}).attr("id", "content").val(Content).appendTo(fieldset);
		$("<br />").appendTo(fieldset);
		$("<button></button>").val(PostId).attr("type", "button")
			.addClass("btn btn-primary btn-md custom").text("Edit")
			.click(function() {
				Post.EditPost({
					"Content": $("#content").val(),
					"PostId" : $(this).val(),
				});
			}).appendTo(fieldset);

		formGroup.appendTo(innerOverlay);


		overlay.show();

	},

	ShowComments: function(PostId) {
		if (!PostId)
			return;

		var overlay = $("<div></div>").addClass("overlay").appendTo("body");
		var innerOverlay = $("<div></div>").addClass("innerOverlay").appendTo(overlay);
		var header = $("<h3></h3>").text("Comments:").appendTo(innerOverlay);
		$("<a></a>").text("x").click(function() {
			overlay.remove();
		}).appendTo(header).css({
			"color":"red",
			"cursor":"pointer",
			"float":"right",
			"font-size":"16px"
		});

		var commentContainer = $("<div></div>").addClass("commentContainer")
						.attr("id", "postOverlay_" + PostId).appendTo(innerOverlay);
		var footer = $("<div class='overlayFooter'></div>").appendTo(innerOverlay);

		// Form to submit comment
		var formGroup = $("<div></div>").addClass("form-group");
		var form = $("<form></form>").appendTo(formGroup);
		var fieldset = $("<fieldset></fieldset").appendTo(form);
		$("<label></label").attr("for", "content").text("New Comment:").appendTo(fieldset);
		$("<input />").attr("type", "text").attr("id", "content").appendTo(fieldset);
		
		$("<button></button>").val(PostId).attr("type", "button")
			.addClass("btn btn-primary btn-md custom").text("Post")
			.click(function() {
				Comment.CreateComment({
					"Content": $("#content").val(),
					"Poster": localStorage.getItem("id"),
					"PostId" : $(this).val(),
				});
			}).appendTo(fieldset);

		formGroup.appendTo(footer);
		

		$.get("/showComments", {"PostId" : PostId}, function(data) {
			for (var i = 0; i < data.length; i++) {
				Comment.DisplayComment(data[i], "postOverlay_" + PostId);
			}

			overlay.show();
		});
	}
}


