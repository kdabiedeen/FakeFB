$(function() {
	Group.init();
});

var Group = {

	init : function () {
		$("head").append("<link rel='stylesheet' type='text/css' href='./Styles/tools.css' />");
	},

	/* Creates a group with the following argumets:
		GroupId
		Name
		Type
		Owner
		MemberCount
		Members
		
	*/
	CreateGroup : function (args) {
	
	},

	DisplayGroup : function(GroupId, element_id) {
		if (!GroupId || !element_id) 
			return;

		// Get info from database
		// For now, I'll hardcode it

		var group = {
			GroupId: GroupId,
			Name: "Archery Club",
			Type: "Community",
			Owner: 1,
			MemberCount: 2,
		}

		// Div group
		var groupDiv = $("<div></div>").addClass("group").attr("id", "group_" + GroupId).appendTo($("#" + element_id));

		// Div group_header
		var groupHeader = $("<div></div>").addClass("group_header").appendTo(groupDiv);

		// Group name
		$("<div></div>").addClass("group_name").text(group.Name).appendTo(groupHeader);

		// Div group_body
		var groupBody = $("<div></div>").addClass("group_body").appendTo(groupDiv);

		// group members
		$("<div></div>").addClass("group_member").text(group.MemberCount + " Members").appendTo(groupBody);


	},

	/* Transactions */


}


