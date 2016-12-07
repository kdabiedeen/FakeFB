$(function() {
	Employee.init();
});

var Employee = {

	init : function () {
		$("head").append("<link rel='stylesheet' type='text/css' href='./Styles/tools.css' />");
	},

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
	CreateEmployee : function (args) {
	
	},

	DisplayEmployee : function(SSN, element_id) {

		if (!SSN || !element_id) 
			return;

		// Get info from database
		// For now, I'll hardcode it

		var employee = {
			SSN: 100000000,
			StartDate: "12-4-2015",
			Hourly: 12.50,
			UserId: 1
		}

		var user = {
			UserId: employee.UserId,
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

		// Div user
		var userDiv = $("<div></div>").addClass("user").attr("id", "user_" + employee.UserId).appendTo($("#" + element_id));

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

		// Start Date and Hourly
		$("<div></div>").addClass("user_info").append("<strong>Start Date:</strong>").append("<br />")
			.append(employee.StartDate).append("<br />").append("<strong>Hourly Wage:</strong>").append("<br />")
			.append(employee.Hourly).appendTo(userBody);

		// Preferences
		$("<div></div>").addClass("user_info").append("<strong>Preferences:</strong>").append("<br />")
			.append(user.Preferences).appendTo(userBody);

		// Rating
		$("<div></div>").addClass("user_info").append("<strong>Rating:</strong>").append("<br />")
			.append(user.Rating).appendTo(userBody);
	},

	/* Transactions */
}


