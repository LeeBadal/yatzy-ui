import React, { useState,useEffect} from "react";
import { motion } from "framer-motion";
import "./App.css";
import Scoreboard from './Scoreboard';
//import gameData from const.js
//import {sgameData, API_URL} from './const.js';
import { sgameData } from "./const.js";


const API_URL = "http://127.0.0.1:58958"
//const API_URL = "http://127.0.0.1:8080"

// Animation properties for the container
// which is the face of the die
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    scale: [0, 1],
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
    },
  },
};

// Animation properties for the disc(s) that
// denote(s) the number player gets after rolling the die
const discsOnTheDie = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: [0.2, 1],
  },
};


const Die = ({ randomSize, index, clicked, setClicked }) => {
  const discNumbers = new Array(randomSize);

  // Assigning 0 to randomSize to the array
  for (var i = 0; i < discNumbers.length; i++) {
    discNumbers[i] = i;
  }

  const handleClick = (event) => {
    console.log(event.target.classList)
    const index = Number(event.currentTarget.dataset.index);
    setClicked((prevClicked) => {
      const newClicked = [...prevClicked];
      newClicked[index] = newClicked[index] === 0 ? 1 : 0;
      console.log(newClicked);
      return newClicked;
    });
    event.currentTarget.classList.toggle("disc-clicked");
  };

  return (
    <motion.ul
      className={`square-container ${clicked[index] ? "clicked" : ""}`}
      variants={container}
      initial="hidden"
      animate="visible"
      onClick={handleClick}
      data-index={index}
    >
      {/* Mapping javascript array discNumbers */}
      {discNumbers.map((index) => (
        <motion.li
        key={index}
        className="disc"
        variants={discsOnTheDie}
        data-index={index}
      />
      ))}
    </motion.ul>
  );
};


const App = () => {
  const [randomSize, setRandomSize] = useState([6, 6, 6, 6, 6]);
  const [clicked, setClicked] = useState([0, 0, 0, 0, 0]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState(sgameData); // add state variable to hold game data
  const [uuid, setUuid] = useState(null); // add state variable to hold UUID
  
  console.log(gameData)
  console.log(`${API_URL}/create-game`)
  const handleStartGame = async () => {
    try {
      const response = await fetch(`${API_URL}/create-game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numPlayers: 2 }),
      });
      const data = await response.json();
      console.log(data);
  
      const newRandomSize = data.game.Dice
      setRandomSize(newRandomSize);
      setGameData(data); // update game data state variable
      setUuid(data.game.Uuid); // update UUID state variable
      setGameStarted(true);
      console.log(uuid)
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoll = async () => {
    console.log(uuid)
    try {
      const response = await fetch(`${API_URL}/next-turn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keep: clicked,
                                uuid: uuid // use UUID state variable
                    }),
      });
      const data = await response.json();
      console.log(data);
      
      const newRandomSize = data.game.Dice
      setRandomSize(newRandomSize);
      setGameData(data); // update game data state variable
      setUuid(data.game.Uuid); // update UUID state variable
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Check if gameData is not null before updating the game state
    if (gameData !== null) {
      // Update the game state here
      console.log("Game state updated:", gameData);
    }
  }, [gameData]);

  const handleGameDataUpdate = (newGameData) => {
    setGameData(newGameData);
  };

  return (
    <div className="container"> {/* add the container class */}
    <div className="scoreboard"> {/* add the scoreboard class */}
      {/* Pass game data state variable as a prop to Scoreboard component */}
      <Scoreboard gameData={gameData} setGameData={handleGameDataUpdate} setRandomSize={setRandomSize} setClicked={setClicked}/>
    </div>
    
    <div className="dice"> {/* add the dice class */}
      <div className="dice-container">
        <Die randomSize={randomSize[0]} setRandomSize={setRandomSize} index={0} clicked={clicked} setClicked={setClicked} />
        <div className="margin"></div>
        <Die randomSize={randomSize[1]} setRandomSize={setRandomSize} index={1} clicked={clicked} setClicked={setClicked} />
        <div className="margin"></div>
        <Die randomSize={randomSize[2]} setRandomSize={setRandomSize} index={2} clicked={clicked} setClicked={setClicked} />
        <div className="margin"></div>
        <Die randomSize={randomSize[3]} setRandomSize={setRandomSize} index={3} clicked={clicked} setClicked={setClicked} />
        <div className="margin"></div>
        <Die randomSize={randomSize[4]} setRandomSize={setRandomSize} index={4} clicked={clicked} setClicked={setClicked} />
        {gameStarted ? (
          gameData.game.RollsLeft === 0 ? (
            <button className="yellow-button">Submit a category</button>
          ) : (
            <button onClick={handleRoll}>ROLL</button>
          )
        ) : (
          <button onClick={handleStartGame}>Start game</button>
        )}
      </div>
    </div>
  </div>
);
};


export default App;


