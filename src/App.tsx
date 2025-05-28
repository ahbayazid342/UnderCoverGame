import React, { useState } from "react";
import PlayerSetup from "./components/playerSetup";

const App = () => {
  const [phase, setPhase] = useState<"setup" | "reveal">("setup");
  const [players, setPlayers] = useState([]);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [includeMrWhite, setIncludeMrWhite] = useState(false);
  console.log(players);
  console.log(undercoverCount);
  console.log(includeMrWhite);

  const handleStart = (players: any, undercoverCount: number, includeMrWhite: boolean) => {
    setPlayers(players);
    setUndercoverCount(undercoverCount);
    setIncludeMrWhite(includeMrWhite);
    setPhase("reveal");
  };

  return (
    <>
      {phase === "setup" && <PlayerSetup onStart={handleStart} />}
      {phase === "reveal" && <div>TODO: Word Reveal Screen</div>}
    </>
  );
};

export default App;
