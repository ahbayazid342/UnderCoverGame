import React, { useState } from 'react';
import styles from './WhiteGuess.module.css';

interface Props {
  eliminatedPlayer: { name: string };
  correctWord: string;
  onGuessSubmit: (isCorrect: boolean) => void;
}

const WhiteGuess: React.FC<Props> = ({ eliminatedPlayer, correctWord, onGuessSubmit }) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = () => {
    const isCorrect = guess.toLowerCase().trim() === correctWord.toLowerCase().trim();
    onGuessSubmit(isCorrect);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mr. White's Last Chance!</h2>
      <p className={styles.description}>
        {eliminatedPlayer.name}, you have one chance to guess the Civilian's word!
      </p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess..."
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Submit Guess
      </button>
    </div>
  );
};

export default WhiteGuess;
