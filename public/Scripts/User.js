var User = {
	/* Creates a user with the following argumets:
		UserId
		LastName
		FirstName
		Address
		City
		State
		ZipCode
		Telephone
		Email
		AcctNum
		Created
		CreditCard
		Preferences
		Rating
	*/
	CreateUser : function (args) {
		
	},

	DisplayUser : function(UserId, element_id) {

		if (!UserId || !element_id) 
			return;

		// Get info from database
		// For now, I'll hardcode it
		$.get("/displayUser", {"UserId": UserId}, function(user) {

			// Div user
			var userDiv = $("<div></div>").addClass("user").attr("id", "user_" + UserId).appendTo($("#" + element_id));

			// Div user_header
			var userHeader = $("<div></div>").addClass("user_header").appendTo(userDiv);

			// User image
			$("<img />").addClass("user_image").attr("src", "./Images/anon.jpg").appendTo(userHeader);

			$("<div></div>").addClass("user_name").html(user.FirstName + "<br />" + user.LastName).appendTo(userHeader);

			// Div user_body
			var userBody = $("<div></div>").addClass("user_body").appendTo(userDiv);

			// Address
			$("<div></div>").addClass("user_info").append("<strong>Address:</strong>").append("<br />")
				.append(user.Address).append("<br />").append(user.City + ", " + user.State)
				.append("<br />").append(user.ZipCode).appendTo(userBody);

			// Telephone
			$("<div></div>").addClass("user_info").append("<strong>Telephone:</strong>").append("<br />")
				.append(user.Telephone).appendTo(userBody);

			// Email
			$("<div></div>").addClass("user_info").append("<strong>Email:</strong>").append("<br />")
				.append(user.Email).appendTo(userBody);

			// AcctNum and CreditCard
			$("<div></div>").addClass("user_info").append("<strong>Account Number:</strong>").append("<br />")
				.append(user.AcctNum).append("<br />").append("<strong>Credit Card:</strong>").append("<br />")
				.append(user.CreditCard).appendTo(userBody);

			// Preferences
			$("<div></div>").addClass("user_info").append("<strong>Preferences:</strong>").append("<br />")
				.append(user.Preferences).appendTo(userBody);

			// Rating
			$("<div></div>").addClass("user_info").append("<strong>Rating:</strong>").append("<br />")
				.append(user.Rating).appendTo(userBody);
		});

		/*
		var user = {
			UserId: UserId,
			LastName: "Cuadrado",
			FirstName: "Brandon",
			Address: "450 Circle Road",
			City: "Stony Brook",
			State: "NY",
			ZipCode: 11790,
			Telephone: "6316781956",
			Email: "brancuad@gmail.com",
			AcctNum: 100000000,
			Created: "2016-11-4",
			CreditCard: "123456789",
			Preferences: "",
			Rating: 3,
		}
		*/

		
	},

	/* Transactions */
}


