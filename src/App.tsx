import React, { useState } from "react";
import PlayerSetup from "./components/playerSetup";
import VotingPhase from "./components/votingPhase";
import WordReveal from "./components/wordReveal";
import { Player, assignRolesAndWords } from "./Utility/utility";
import styles from './App.module.css';

const App = () => {
  const [phase, setPhase] = useState<"setup" | "reveal" | "voting" | "end">(
    "setup"
  );
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [pendingWinCheck, setPendingWinCheck] = useState(false);

  const handleStart = (
    initialPlayers: Player[],
    undercovers: number,
    includeMrWhite: boolean
  ) => {
    const { playersWithRoles } = assignRolesAndWords(
      initialPlayers,
      undercovers,
      includeMrWhite
    );
    setPlayers(playersWithRoles);
    setPhase("reveal");
  };

  const handleRevealFinish = (players: Player[]) => {
    setPlayers(players);
    setPhase("voting");
  };

  const checkWinCondition = (updatedPlayers: Player[]) => {
    const alivePlayers = updatedPlayers.filter((p) => p.isAlive);
    const undercoverAlive = alivePlayers.filter(
      (p) => p.role === "undercover"
    ).length;
    const civilianAlive = alivePlayers.filter(
      (p) => p.role === "civilian"
    ).length;
    const whiteAlive = alivePlayers.filter((p) => p.role === "white").length;

    // Civilians win if both Undercover and White are eliminated
    if (undercoverAlive === 0 && whiteAlive === 0) return "Civilians Win!";

    // Undercover wins if all civilians are eliminated but at least one undercover or white is alive
    if (civilianAlive === 0 && (undercoverAlive > 0 || whiteAlive > 0))
      return "Undercover Wins!";

    // Otherwise game continues
    return null;
  };

  const handleEliminate = (playerId: number) => {
    const updatedPlayers = players.map((p) =>
      p.id === playerId ? { ...p, isAlive: false } : p
    );
    setPlayers(updatedPlayers);
    setPendingWinCheck(true);
  };

  const handleContinueAfterElimination = () => {
    if (pendingWinCheck) {
      const result = checkWinCondition(players);
      if (result) {
        setGameResult(result);
        setPhase("end");
      }
      setPendingWinCheck(false);
    }
  };

  const handleRestart = () => {
    setPlayers([]);
    setGameResult(null);
    setPhase("setup");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.gameTitle}>Undercover Game</h1>
      <div className={styles.gameContainer}>
        {phase === "setup" && <PlayerSetup onStart={handleStart} />}
        {phase === "reveal" && (
          <WordReveal players={players} onFinish={handleRevealFinish} />
        )}
        {phase === "voting" && (
          <VotingPhase 
            players={players} 
            onEliminate={handleEliminate}
            onContinue={handleContinueAfterElimination}
          />
        )}
        {phase === "end" && (
          <div className={styles.endContainer}>
            <h2 className={styles.resultText}>{gameResult}</h2>
            <button
              onClick={handleRestart}
              className={styles.restartButton}
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
