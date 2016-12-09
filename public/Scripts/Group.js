var Group = {

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
	GetAllGroups : function(callback) {
		$.get("/getAllGroups", {}, function(data) {
			callback(data);
		});
	},

	JoinGroup : function(GroupId, UserId) {
		$.get("/joinGroup", {"GroupId" : GroupId, "UserId" : UserId}, function(data) {
			window.location.reload();
		});
	},

	UnjoinGroup : function(GroupId, UserId) {
		$.get("/unjoinGroup", {"GroupId" : GroupId, "UserId" : UserId}, function(data) {
			window.location.reload();
		});
	},

	GetAllGroupsByUser : function(UserId, callback) {
		$.get("/getAllGroupsByUser", {"UserId" : UserId}, function(data) {
			callback(data);
		});
	},

	GetGroupName : function(GruopId, callback) {
		$.get("/getGroupName", {"GroupId" : GroupId}, function(data) {
			callback(data.Name);
		});
	}
	
		RenameGroup : function(newName, GroupId) {
		$.get("/renameGroup"), {"newName" : newName}, function(data) {
			window.location.reload();
		});
	}
	
	DeleteGroup : function(GroupId) {
		$.get("/deleteGroup"), {"GroupId" : GroupId}, function(data) {
			window.location.href = "./main.html";
		});
	}
}


