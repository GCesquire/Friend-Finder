var friendsList = require("../data/friend");

module.exports = function(app){
	app.get("api/friend", function(req, res){
		res.json(friendsList);
	})

    app.post("/api/friend", function(req, res) {
        var newFriend = req.body;
        var newScore = 0;
        var total = 0;
        var match = {
            name: "",
            photo: "",
            difference: 10000
        }

        for (var i = 0; i < friendsList.length; i++) {
            total = 0;

            for (var j = 0; j < friendsList[i].preferences.length; j++) {
                total += Math.abs(friendsList[i].preferences[j] - newFriend.preferences[j]);

                if (total <= match.difference) {
                    match.name = friendsList[i].name,
                    match.photo = friendsList[i].photo,
                    match.difference = total
                }
            }
        }
        friendsList.push(newFriend);
        res.json(match);
        console.log(match);
    });
}