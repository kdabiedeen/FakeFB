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

			$("<div></div>").addClass("post_likes").text(post.LikeCount + " likes").appendTo(postFooter);

			$("<a></a>").addClass("post_comments").text(post.CommentCount + " comments").appendTo(postFooter);

			$(".post_comments").click(function() {
				Post.ShowComments(post.PostId, element_id);
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

	LikePost : function(PostId) {

	},

	CommentOnPost : function(PostId, Content, UserId) {

	},

	ShowComments: function(PostId, element_id) {
		if (!PostId || !element_id)
			return;

		$.get("/showComments", {"PostId" : PostId}, function(data) {
			for (var i = 0; i < data.length; i++) {
				Comment.DisplayComment(data.CommentId, element_id);
			}
		});
	}
}


