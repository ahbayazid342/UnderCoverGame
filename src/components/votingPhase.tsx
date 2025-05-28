import React, { useState } from "react";
import { Player } from "../Utility/utility";
import styles from "./VotingPhase.module.css";

interface Props {
  players: Player[];
  onEliminate: (playerId: number) => void;
  onContinue: () => void;
}

const VotingPhase: React.FC<Props> = ({ players, onEliminate, onContinue }) => {
  const alivePlayers = players.filter((p) => p.isAlive);
  const [lastEliminated, setLastEliminated] = useState<Player | null>(null);

  const handleClick = (player: Player) => {
    onEliminate(player.id);
    setLastEliminated(player);
  };

  const handleCloseModal = () => {
    setLastEliminated(null);
    onContinue();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Voting Phase</h2>
      <p className={styles.subtitle}>
        Discuss and vote outside the app. Click the player who got the most votes.
      </p>
      <div className={styles.playerGrid}>
        {alivePlayers.map((player) => (
          <button
            key={player.id}
            onClick={() => handleClick(player)}
            className={styles.playerButton}
          >
            {player.name}
          </button>
        ))}
      </div>

      {lastEliminated && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Player Eliminated</h3>
            <p className={styles.eliminatedText}>
              <strong>{lastEliminated.name}</strong> was a{" "}
              <strong className="capitalize">{lastEliminated.role}</strong>
            </p>
            <button
              onClick={handleCloseModal}
              className={styles.continueButton}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPhase;
