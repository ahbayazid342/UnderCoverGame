import React, { useState } from "react";
import { Language } from "../data/wordPair";
import styles from './PlayerSetup.module.css';

type Role = "civilian" | "undercover" | "white";

interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
}

interface Props {
  onStart: (
    players: Player[],
    undercoverCount: number,
    includeMrWhite: boolean,
    language: Language
  ) => void;
}

const PlayerSetup: React.FC<Props> = ({ onStart }) => {
  const [playerCount, setPlayerCount] = useState(5);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [includeMrWhite, setIncludeMrWhite] = useState(false);
  const [language, setLanguage] = useState<Language>("english");

  const handleNameChange = (index: number, name: string) => {
    const names = [...playerNames];
    names[index] = name;
    setPlayerNames(names);
  };

  const handleStartGame = () => {
    const players: Player[] = playerNames.map((name, index) => ({
      id: index,
      name: name || `Player ${index + 1}`,
      role: "civilian",
      isAlive: true,
    }));

    onStart(players, undercoverCount, includeMrWhite, language);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Undercover Game Setup</h1>

      <div className={styles.formGroup}>
        <label className={styles.label}>Select Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className={styles.select}
        >
          <option value="english">English</option>
          <option value="bangla">Bangla</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Number of Players (3-12)</label>
        <input
          type="number"
          min={3}
          max={12}
          value={playerCount}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setPlayerCount(value);
            setPlayerNames((prev) => Array.from({ length: value }, (_, i) => prev[i] || ""));
          }}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Enter Player Names:</label>
        <div className={styles.playerGrid}>
          {Array.from({ length: playerCount }).map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Player ${i + 1}`}
              value={playerNames[i] || ""}
              onChange={(e) => handleNameChange(i, e.target.value)}
              className={styles.input}
            />
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Number of Undercover(s)</label>
        <input
          type="number"
          min={1}
          max={playerCount - 2}
          value={undercoverCount}
          onChange={(e) => setUndercoverCount(parseInt(e.target.value))}
          className={styles.input}
        />
      </div>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={includeMrWhite}
          onChange={(e) => setIncludeMrWhite(e.target.checked)}
        />
        <span>Include Mr. White?</span>
      </label>

      <button
        onClick={handleStartGame}
        className={styles.button}
      >
        Start Game
      </button>
    </div>
  );
};

export default PlayerSetup;
