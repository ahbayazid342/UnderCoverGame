import React, { useState } from "react";
import { Player } from "../Utility/utility";
import styles from './WordReveal.module.css';

interface Props {
  players: Player[];
  onFinish: (players: Player[]) => void;
}

const WordReveal: React.FC<Props> = ({ players, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);

  const currentPlayer = players[currentIndex];

  const handleNext = () => {
    setShowWord(false);
    if (currentIndex + 1 < players.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish(players); // done revealing
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.playerTurn}>{currentPlayer.name}'s Turn</h2>

      <div className={styles.card}>
        {!showWord ? (
          <>
            <button
              onClick={() => setShowWord(true)}
              className={styles.revealButton}
            >
              Reveal Your Role & Word
            </button>
            <p className={styles.instruction}>Hey You, Please Pass the device to {currentPlayer.name}</p>
          </>
        ) : (
          <div>
            <p className={styles.role}>
              Role: <span className="capitalize">{currentPlayer.role}</span>
            </p>
            {currentPlayer.role !== "white" ? (
              <p className={styles.word}>{currentPlayer.word}</p>
            ) : (
              <p className={styles.word}>You are Mr. White</p>
            )}
            <button
              onClick={handleNext}
              className={styles.nextButton}
            >
              {currentIndex + 1 === players.length ? "Start Game" : "Next Player"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordReveal;