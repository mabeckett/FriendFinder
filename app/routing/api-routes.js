var friends = require('../data/friends.js');

module.exports = function (app) {

	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function (req, res) {

		var match = {
			name: '',
			photo: '',
			friendDiff: 10
		};

		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;
		//calculating difference
		var totalDiff = 0;
		//looping through friends 
		for  (var i=0; i< friends.length; i++) {
			console.log(friends[i].name);
			totalDiff = 0;
			//loop through all the scores of each friend
			for (var f=0; f< friends[i].scores[f]; f++){
				totalDiff += Math.abs(parseInt(userScores[f]) - parseInt(friends[i].scores[f]));

				if (totalDiff <= match.friendDiff){
					match.name = friends[i].name;
					match.photo = friends[i].photo;
					match.friendDiff = totalDiff;
				};
			};
		};
		//saving data and providing json
		friends.push(userData);
		res.json(match);
	});
};