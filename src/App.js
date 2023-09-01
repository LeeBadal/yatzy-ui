import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

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

  const handleStartGame = async () => {
    try {
      const response = await fetch("http://localhost:8080/create-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numPlayers: 2 }),
      });
      const data = await response.json();
      console.log(data);
      //extract dice roll from data
      
      
      const newRandomSize = data.game.Dice
      setRandomSize(newRandomSize);
      setGameStarted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoll = async () => {
    try {
      const response = await fetch("http://localhost:8080/next-turn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keep: clicked}),
      });
      const data = await response.json();
      console.log(data);
      //extract dice roll from data
      
      
      const newRandomSize = data.game.Dice
      setRandomSize(newRandomSize);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dice-container">
      <Die randomSize={randomSize[0]} setRandomSize={setRandomSize} index={0} clicked={clicked} setClicked={setClicked} />
      <Die randomSize={randomSize[1]} setRandomSize={setRandomSize} index={1} clicked={clicked} setClicked={setClicked} />
      <Die randomSize={randomSize[2]} setRandomSize={setRandomSize} index={2} clicked={clicked} setClicked={setClicked} />
      <Die randomSize={randomSize[3]} setRandomSize={setRandomSize} index={3} clicked={clicked} setClicked={setClicked} />
      <Die randomSize={randomSize[4]} setRandomSize={setRandomSize} index={4} clicked={clicked} setClicked={setClicked} />
      {gameStarted ? (
        <button onClick={handleRoll}>ROLL</button>
      ) : (
        <button onClick={handleStartGame}>Start game</button>
      )}
    </div>
  );
};

export default App;
