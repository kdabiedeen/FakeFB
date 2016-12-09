var Page = {

	/* Creates a page with the following argumets:
		PageId
		Name
		Owner
		PostCount		
	*/
	CreatePage : function (args) {
		$.get("/createPage", args, function(data) {
			window.location.href = "./main.html";
		});
	},

	DisplayPage : function(PageId, element_id) {
		if (!PageId || !element_id) 
			return;

		$.get("/displayPage", {"PageId": PageId}, function(data) {
			var page = data;

			// Div page
			var pageDiv = $("<div></div>").addClass("page").attr("id", "page_" + PageId).appendTo($("#" + element_id));

			// Div page_header
			var pageHeader = $("<div></div>").addClass("page_header").appendTo(pageDiv);

			// Page name
			$("<div></div>").addClass("page_name").text("Page: " + page.Name).appendTo(pageHeader);

			// Div page_body
			//var pageBody = $("<div></div>").addClass("page_body").appendTo(pageDiv);

			// page post
			//$("<div></div>").addClass("page_post").text(page.PostCount + " Posts").appendTo(pageBody);
		});

	},

	GetPageByUser : function(UserId, callback) {
		if (!UserId)
			return;

		$.get("/pageByUser", {"UserId" : UserId}, function(data) {
			var pageId = data.PageId;
			callback(pageId);
		});
	}

	/* Transactions */


}


