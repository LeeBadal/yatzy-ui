// create a const json object to hold starting game data

export const sgameData = {
    "game": {
        "Players": [
            {
                "Name": "Player 1",
                "Score": {
                    "Ones": -1,
                    "Twos": -1,
                    "Threes": -1,
                    "Fours": -1,
                    "Fives": -1,
                    "Sixes": -1,
                    "ThreeOfAKind": -1,
                    "FourOfAKind": -1,
                    "FullHouse": -1,
                    "SmallStraight": -1,
                    "LargeStraight": -1,
                    "Chance": -1,
                    "Yatzy": -1
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
                    "ThreeOfAKind": -1,
                    "FourOfAKind": -1,
                    "FullHouse": -1,
                    "SmallStraight": -1,
                    "LargeStraight": -1,
                    "Chance": -1,
                    "Yatzy": -1
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
            "Chance": 19,
            "Fives": 5,
            "FourOfAKind": 0,
            "Fours": 0,
            "FullHouse": 0,
            "LargeStraight": 0,
            "OnePair": 6,
            "Ones": 0,
            "Sixes": 6,
            "SmallStraight": 0,
            "ThreeOfAKind": 0,
            "Threes": 6,
            "TwoPairs": 0,
            "Twos": 2,
            "Yatzy": 0
        }

    }
}


export const API_URL = process.env.API_URL

console.log(API_URL)
