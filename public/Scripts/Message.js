var Message = {

	/* Creates a message with the following argumets:
		MessageId
		Date
		Content
		Sender
		Receiver
		
	*/
	CreateMessage : function (args) {
	
	},

	DisplayMessage : function(MessageId, element_id) {
		if (!MessageId || !element_id) 
			return;

		$.get("/displayMessage", {"MessageId" : MessageId}, function(data) {
			var message = data.message;
			var sender = data.sender;
			var receiver = data.receiver;

			// Div message
			var messageDiv = $("<div></div>").addClass("message").attr("id", "message_" + MessageId).appendTo($("#" + element_id));

			// Div message_header
			var messageHeader = $("<div></div>").addClass("message_header").appendTo(messageDiv);

			// Message name
			$("<div></div>").addClass("message_name").text(sender.FirstName + " " + sender.LastName).appendTo(messageHeader);

			// Div message_body
			var messageBody = $("<div></div>").addClass("message_body").appendTo(messageDiv);

			// Message content
			$("<div></div>").addClass("message_content").text(message.Content).appendTo(messageBody);

			// Message Footer
			var messageFooter = $("<div></div>").addClass("message_footer").appendTo(messageDiv);

			// Message date
			$("<div></div>").addClass("message_date").text(message.Date).appendTo(messageFooter);

		});


	},

	/* Transactions */

	GetAllReceived : function(UserId, element_id) {
		if (!UserId || !element_id)
			return;

		$.get("/receivedMessages", {"UserId" : UserId}, function(data) {
			if (data.length == 0) {
				$("#" + element_id).text("No messages");
			}

			for (var i = 0; i < data.length; i++) {
				Message.DisplayMessage(data[i], element_id);
			}
		});
	},

	GetAllSent : function(UserId, element_id) {
		if (!UserId || !element_id)
			return;

		$.get("/sentMessages", {"UserId" : UserId}, function(data) {
			if (data.length == 0) {
				$("#" + element_id).text("No messages");
			}

			for (var i = 0; i < data.length; i++) {
				Message.DisplayMessage(data[i], element_id);
			}
		});
	},
}


