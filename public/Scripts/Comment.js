var Comment = {
	/* Creates a comment with the following argumets:
		CommentId
		Date
		Content
		Poster
		Post
		LikeCount
		
	*/
	CreateComment : function (args) {
		var Content = args.Content;
		var Poster = args.Poster;
		var PostId = args.PostId;

		$.get("/createComment", {"Content" : Content, "PostId" : PostId, "Poster": Poster}, function(data) {
			window.location.reload();
		});
	},

	DisplayComment : function(CommentId, element_id) {
		if (!CommentId || !element_id) 
			return;

		$.get("/displayComment", {"CommentId": CommentId}, function(data) {
			var comment = data.comment;
			var user = data.user;

			// Div comment
			var commentDiv = $("<div></div>").addClass("comment").attr("id", "comment_" + CommentId).appendTo($("#" + element_id));

			// Div comment_header
			var commentHeader = $("<div></div>").addClass("comment_header").appendTo(commentDiv);

			$("<a></a>").addClass("comment_delete").val(CommentId).text("x")
				.click(function() {
					Comment.DeleteComment($(this).val());
				}).appendTo(commentHeader);

			$("<a></a>").addClass("comment_edit").val(CommentId).text("Edit")
				.click(function() {
					Comment.EditOverlay($(this).val(), comment.Content);
				}).appendTo(commentHeader);

			// Comment name
			$("<div></div>").addClass("comment_name").text(user.FirstName + " " + user.LastName).appendTo(commentHeader);

			// Comment date
			$("<div></div>").addClass("comment_date").text(comment.Date).appendTo(commentHeader);

			// Div comment_body
			var commentBody = $("<div></div>").addClass("comment_body").appendTo(commentDiv);

			// Comment content
			$("<div></div>").addClass("comment_content").text(comment.Content).appendTo(commentBody);

			// Comment Footer
			var commentFooter = $("<div></div>").addClass("comment_footer").appendTo(commentDiv);

			var commentLikes = $("<div></div>").addClass("comment_likes").val(CommentId).text(comment.LikeCount + " likes").appendTo(commentFooter);

			$("<a></a>").addClass("comment_plus").val(CommentId).text("+").appendTo(commentLikes);
			$("<a></a>").addClass("comment_minus").val(CommentId).text("-").appendTo(commentLikes);
			
			$(".comment_plus").unbind().click(function(){
				Comment.LikeComment($(this).val());
			});

			$(".comment_minus").unbind().click(function(){
				Comment.UnlikeComment($(this).val());
			});

		});

	},

	/* Transactions */
	LikeComment : function(CommentId) {
		if (!CommentId) 
			return;

		$.get("/likeComment", {"CommentId" : CommentId}, function(data) {
			window.location.reload();
		});
	},

	UnlikeComment : function(CommentId) {
		if (!CommentId) 
			return;

		$.get("/unlikeComment", {"CommentId" : CommentId}, function(data) {
			window.location.reload();
		});
	},

	DeleteComment : function(CommentId) {
		if(!CommentId)
			return;

		var del = confirm("Would you like to delete this comment?");
		if (!del)
			return;

		$.get("/deleteComment", {"CommentId": CommentId}, function(data) {
			window.location.reload();
		});
	},

	EditComment : function(args) {
		$.get("/editComment", args, function(data) {
			window.location.reload();
		});
	},

	EditOverlay : function(CommentId, Content) {
		if(!CommentId)
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
		$("<label></label").attr("for", "content").text("Edit Comment:").appendTo(fieldset);
		$("<br />").appendTo(fieldset);
		$("<input />").css({
			"width": "300px"
		}).attr("type", "text").attr("id", "editContent").val(Content).appendTo(fieldset);
		$("<br />").appendTo(fieldset);
		$("<button></button>").val(CommentId).attr("type", "button")
			.addClass("btn btn-primary btn-md custom").text("Edit")
			.click(function() {
				Comment.EditComment({
					"Content": $("#editContent").val(),
					"CommentId" : $(this).val(),
				});
			}).appendTo(fieldset);

		formGroup.appendTo(innerOverlay);


		overlay.show();

	},
}


