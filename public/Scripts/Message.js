$(function() {
	Message.init();
});

var Message = {

	init : function () {
		$("head").append("<link rel='stylesheet' type='text/css' href='./Styles/tools.css' />");
	},

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

		// Get info from database
		// For now, I'll hardcode it

		var message = {
			MessageId: MessageId,
			Date: "12-4-2016",
			Content: "Hey, what's up?",
			Sender: 1,
			Receiver: 2,
		}

		// Get name of sender
		var sender = {
			UserId: message.Sender,
			FirstName: "Brandon",
			LastName: "Cuadrado"
		}

		// Get name of receiver
		var receiver = {
			UserId: message.Receiver,
			FirstName: "Kevin",
			LastName: "Dabiedeen"
		}

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


	},

	/* Transactions */
}


