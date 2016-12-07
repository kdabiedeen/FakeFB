$(function() {
	Advertisement.init();
});

var Advertisement = {

	init : function () {
		$("head").append("<link rel='stylesheet' type='text/css' href='./Styles/tools.css' />");
	},

	/* Creates an advertisement with the following argumets:
		AdId
		EmployeeId
		Type
		Date
		Company
		ItemName
		Content
		Category
		UnitPrice
		NumUnits
	*/
	CreateAdvertisement : function (args) {
	
	},

	DisplayAdvertisement : function(AdId, element_id) {

		if (!AdId || !element_id) 
			return;

		// Get info from database
		// For now, I'll hardcode it

		var advertisement = {
			AdId: AdId,
			EmployeeId: 100000000,
			Type: "Toys",
			Date: "12-4-2016",
			Company: "Toys R Us",
			ItemName: "Action Figure",
			Content: "Don't miss out on the deal!",
			Category: "Toys",
			UnitPrice: 12.50,
			NumUnits: 2,
		}

		var employee = {
			SSN: 100000000,
			StartDate: "12-4-2015",
			Hourly: 12.50,
			UserId: 1
		}

		// Div ad
		var adDiv = $("<div></div>").addClass("ad").attr("id", "ad_" + AdId).appendTo($("#" + element_id));

		// Div ad_header
		var adHeader = $("<div></div>").addClass("ad_header").appendTo(adDiv);

		// Ad item name
		$("<div></div>").addClass("ad_item").text(advertisement.ItemName).appendTo(adHeader);

		// Ad company
		$("<div></div>").addClass("ad_company").text(advertisement.Company).appendTo(adHeader);

		// Div ad_body
		var adBody = $("<div></div>").addClass("ad_body").appendTo(adDiv);

		// Ad content
		$("<div></div>").addClass("ad_content").text(advertisement.Content).appendTo(adBody);

		// ad Footer
		var adFooter = $("<div></div>").addClass("ad_footer").appendTo(adDiv);

		$("<div></div>").addClass("ad_price").text("$" + advertisement.UnitPrice).appendTo(adFooter);

		$("<div></div>").addClass("ad_numunits").text(advertisement.NumUnits + " units").appendTo(adFooter);
	},

	/* Transactions */
}


