import React, { useState } from "react";

type Role = "civilian" | "undercover" | "white";

interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
}

interface Props {
  onStart: (players: Player[], undercoverCount: number, includeMrWhite: boolean) => void;
}

const PlayerSetup: React.FC<Props> = ({ onStart }) => {
  const [playerCount, setPlayerCount] = useState(5);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [includeMrWhite, setIncludeMrWhite] = useState(false);

  const handleNameChange = (index: number, name: string) => {
    const names = [...playerNames];
    names[index] = name;
    setPlayerNames(names);
  };

  const handleStartGame = () => {
    const players: Player[] = playerNames.map((name, index) => ({
      id: index,
      name: name || `Player ${index + 1}`,
      role: "civilian", // to be updated later
      isAlive: true,
    }));

    onStart(players, undercoverCount, includeMrWhite);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Undercover Game Setup</h1>

      <div>
        <label className="block font-semibold">Number of Players (3-12)</label>
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
          className="input input-bordered w-full mt-1 p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Enter Player Names:</label>
        {Array.from({ length: playerCount }).map((_, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Player ${i + 1}`}
            value={playerNames[i] || ""}
            onChange={(e) => handleNameChange(i, e.target.value)}
            className="w-full p-2 mb-2 rounded border"
          />
        ))}
      </div>

      <div>
        <label className="block font-semibold">Number of Undercover(s)</label>
        <input
          type="number"
          min={1}
          max={playerCount - 2}
          value={undercoverCount}
          onChange={(e) => setUndercoverCount(parseInt(e.target.value))}
          className="input input-bordered w-full mt-1 p-2 rounded"
        />
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeMrWhite}
            onChange={(e) => setIncludeMrWhite(e.target.checked)}
          />
          <span>Include Mr. White?</span>
        </label>
      </div>

      <button
        onClick={handleStartGame}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full font-bold"
      >
        Start Game
      </button>
    </div>
  );
};

export default PlayerSetup;
