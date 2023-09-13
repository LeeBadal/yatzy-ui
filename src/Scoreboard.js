// I want a scoreboard that can proceess data that looks like this:
/*
{
  "game": {
      "Players": [
          {
              "Name": "Player 0",
              "Score": {
                  "Bonus": -1,
                  "Chance": -1,
                  "Fives": -1,
                  "FourOfAKind": -1,
                  "Fours": -1,
                  "FullHouse": -1,
                  "LargeStraight": -1,
                  "OnePair": -1,
                  "Ones": -1,
                  "Sixes": -1,
                  "SmallStraight": -1,
                  "ThreeOfAKind": -1,
                  "Threes": -1,
                  "TwoPairs": -1,
                  "Twos": -1,
                  "Yatzy": -1
              }
          },
          {
              "Name": "Player 1",
              "Score": {
                  "Bonus": -1,
                  "Chance": -1,
                  "Fives": -1,
                  "FourOfAKind": -1,
                  "Fours": -1,
                  "FullHouse": -1,
                  "LargeStraight": -1,
                  "OnePair": -1,
                  "Ones": -1,
                  "Sixes": -1,
                  "SmallStraight": -1,
                  "ThreeOfAKind": -1,
                  "Threes": -1,
                  "TwoPairs": -1,
                  "Twos": -1,
                  "Yatzy": -1
              }
          }
      ],
      "CurrentPlayer": 0,
      "RollsLeft": 2,
      "Dice": [
          2,
          3,
          3,
          5,
          6
      ],
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
      },
      "Uuid": "e2173b2b-7281-4260-8801-b1ab453234c8"
  }
}

*/
import React, { useState,useEffect } from "react";
import "./Scoreboard.css";
//import {API_URL} from './const.js';

const API_URL = "http://127.0.0.1:52022"

  const Scoreboard = ({ gameData, setGameData, setRandomSize,setClicked}) => {
    const [scoreboard, setScoreboard] = useState(gameData.game.Players);
    const [currentPlayer, setCurrentPlayer] = useState(gameData.game.CurrentPlayer);
    const [roundsLeft, setRoundsLeft] = useState(gameData.game.RoundsLeft);
    const [categoryChoice, setCategoryChoice] = useState(gameData.game.CategoryChoice);
    const [scoreCalculator, setScoreCalculator] = useState(gameData.game.ScoreCalculator);
    const [uuid, setUuid] = useState(gameData.game.Uuid);
    console.log(scoreboard.Score)

    useEffect(() => {
      setGameData(gameData);
      setScoreboard(gameData.game.Players);
      setCurrentPlayer(gameData.game.CurrentPlayer);
      setRoundsLeft(gameData.game.RoundsLeft);
      setCategoryChoice(gameData.game.CategoryChoice);
      setScoreCalculator(gameData.game.ScoreCalculator);
      setUuid(gameData.game.Uuid);
    }, [gameData]);

    const handleScoreboard = async (category) => {
      try {
        const response = await fetch(`${API_URL}/submit-choice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ choice: category }),
        });

        const data = await response.json();
        console.log(data);
        setGameData(data);
        setRandomSize(data.game.Dice);
        const newScoreboard = data.game.Players;
        setScoreboard(newScoreboard);

        const newCurrentPlayer = data.game.CurrentPlayer;
        setCurrentPlayer(newCurrentPlayer);
        const newRoundsLeft = data.game.RoundsLeft;
        setRoundsLeft(newRoundsLeft);
        const newCategoryChoice = data.game.CategoryChoice;
        setCategoryChoice(newCategoryChoice);
        const newScoreCalculator = data.game.ScoreCalculator;
        setScoreCalculator(newScoreCalculator);
        const newUuid = data.game.Uuid;
        setUuid(newUuid);
        resetClicked();
      } catch (error) {
        console.error(error);
      }
    };

    const resetClicked = () => {
      setClicked([0, 0, 0, 0, 0]);
    }

    const handleCellClick = (category) => {
      const currentPlayerScore = scoreboard[currentPlayer].Score[category];
      if (currentPlayerScore === -1) {
        handleScoreboard(category);
      }
    };

    return (
      <>
        <div>
          <h1>Scoreboard</h1>

          {/* Scoreboard*/}
          <table className="scoreboard-table">
            <thead>
              <tr>
                <th className="scoreboard-category-column">Category</th>
                {scoreboard.map((player, index) => (
                  <th
                    key={index}
                    className={currentPlayer === index ? "current-player" : ""}
                  >
                    Player {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(scoreCalculator).map(([key, value]) => (
                <tr key={key}>
                  <td className="scoreboard-cell">{key}</td>
                  {scoreboard.map((player, index) => (
                    <td
                      key={index}
                      className={
                        player.Score[key] === -1
                          ? currentPlayer === index && value > 0
                            ? "scoreboard-cell-above-zero"
                            : "scoreboard-cell-empty"
                          : "scoreboard-cell"
                      }
                      onClick={
                        (key === "Bonus" || key === "Total") ? null :
                        (currentPlayer === index ? () => handleCellClick(key) : null)
                      }
                    >
                      {player.Score[key] !== -1 ? (
                        player.Score[key]
                      ) : currentPlayer === index ? (
                        <strong>{value}</strong>
                      ) : (
                        ""
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
                      };
export default Scoreboard;
