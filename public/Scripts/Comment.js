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
}


