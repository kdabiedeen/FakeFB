var Employee = {

	/* Creates an employee with the following argumets:
		SSN,
		StartDate,
		Hourly,
		UserId
	*/
	CreateEmployee : function (args) {

		$.get("/createEmployee", args, function(data){

	  		localStorage.setItem("SSN", args.SSN);
			window.location.reload();
		})
	},

	DisplayEmployee : function(SSN, element_id) {

		if (!SSN || !element_id) 
			return;

		$.get("/getEmployee", {"SSN":SSN}, function(data){
			var employee = data;

			var user = data;

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
		});
	},

	/* Transactions */
	EditEmployee : function(args) {
		$.get("/editEmployee", args, function(data) {
			window.location.reload();
		});
	},

	RemoveEmployee : function(SSN) {
		$.get("/removeEmployee", {SSN : SSN}, function(data) {
			
	  		localStorage.removeItem("SSN");
			window.location.reload();
		})
	},
}


