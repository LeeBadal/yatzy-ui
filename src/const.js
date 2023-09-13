// create a const json object to hold starting game data

const sgameData = {
    "game": {
        "Players": [
            {
                "Name": "Player 1",
                "Score": {
                  
                }
            },
            {
                "Name": "Player 2",
                "Score": {
                    "Ones": -1,
                    "Twos": -1,
                    "Threes": -1,
                    "Fours": -1,
                    "Fives": -1,
                    "Sixes": -1,
                    "Bonus": -1,
                    "OnePair": -1,
                    "TwoPairs": -1,
                    "ThreeOfAKind": -1,
                    "FourOfAKind": -1,
                    "SmallStraight": -1,
                    "LargeStraight": -1,
                    "FullHouse": -1,
                    "Chance": -1,
                    "Yatzy": -1,
                }
            }
        ],
        "Dice": [
            6,
            6,
            6,
            6,
            6
        ],
        "CurrentPlayer": 0,
        "RoundsLeft": 16,
        "CategoryChoice": "",
        "ScoreCalculator": {
            "Ones": -1,
            "Twos": -1,
            "Threes": -1,
            "Fours": -1,
            "Fives": -1,
            "Sixes": -1,
            "Bonus": -1,
            "OnePair": -1,
            "TwoPairs": -1,
            "ThreeOfAKind": -1,
            "FourOfAKind": -1,
            "SmallStraight": -1,
            "LargeStraight": -1,
            "FullHouse": -1,
            "Chance": -1,
            "Yatzy": -1,
        }

    }
}
exports.sgameData = sgameData
