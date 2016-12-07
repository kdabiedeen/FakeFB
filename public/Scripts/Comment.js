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

			$("<div></div>").addClass("comment_likes").text(comment.LikeCount + " likes").appendTo(commentFooter);

		});

	},

	/* Transactions */
}


