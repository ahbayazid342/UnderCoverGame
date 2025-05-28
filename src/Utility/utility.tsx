import { WordPair, wordPairs } from "../data/wordPair";

export type Role = "civilian" | "undercover" | "white";

export interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
  word?: string;
}

export function assignRolesAndWords(
  players: Player[],
  undercoverCount: number,
  includeMrWhite: boolean
): { playersWithRoles: Player[]; wordPair: WordPair } {
  const totalPlayers = players.length;

  // Shuffle players array
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  // Assign Mr. White
  let whiteCount = includeMrWhite ? 1 : 0;

  // Assign roles
  const assignedPlayers = shuffledPlayers.map((player, index) => {
    let role: Role = "civilian";

    if (index < undercoverCount) {
      role = "undercover";
    } else if (index >= undercoverCount && index < undercoverCount + whiteCount) {
      role = "white";
    }

    return {
      ...player,
      role,
      isAlive: true,
    };
  });

  // Pick a random word pair
  const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];

  // Assign words
  const playersWithWords = assignedPlayers.map((player) => {
    let word = "";
    if (player.role === "civilian") word = wordPair.civilian;
    else if (player.role === "undercover") word = wordPair.undercover;
    else word = ""; // Mr. White gets no word
    return { ...player, word };
  });

  return { playersWithRoles: playersWithWords, wordPair };
}
