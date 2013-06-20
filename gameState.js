var db = require('mongojs').connect('quiz', ['state', 'players']);

function Quiz () {
    this.startQuiz();
}

Quiz.prototype = {
    startQuiz: function() {
        // Continue previous quiz, or start new one if none found
        db.state.findOne({}, function (err, state) {
            if (!state) {
                var state = {
                    state: 'starting',
                    pointsRed: 0,
                    pointsBlue: 0,
                    pointsGreen: 0,
                    pointsYellow: 0
                };

                db.state.insert(state);
            }
        });
    },

    addPlayer: function (uuid, details) {
        var player = {
            uuid: uuid,
            name: details.name,
            team: details.team
        }

        db.players.insert(player);
    },

    modifyPlayer: function (uuid, details) {
        db.players.update({uuid: uuid}, {$set: {name: details.name, team: details.team}});
    },

    getAllPlayers: function (callback) {
        db.players.find({}, function (err, players) {
            callback(players);
        });
    }
};

exports.Quiz = Quiz;