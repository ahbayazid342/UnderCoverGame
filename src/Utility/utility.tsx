import { WordPair, wordPairs } from "../data/wordPair";

export type Role = "civilian" | "undercover" | "white";

export interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
  word?: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function assignRolesAndWords(
  players: Player[],
  undercoverCount: number,
  includeMrWhite: boolean
): { playersWithRoles: Player[]; wordPair: WordPair } {
  const totalPlayers = players.length;
  
  // Create array of all roles needed
  const roles: Role[] = [
    ...Array(undercoverCount).fill("undercover"),
    ...(includeMrWhite ? ["white"] : []),
    ...Array(totalPlayers - undercoverCount - (includeMrWhite ? 1 : 0)).fill("civilian")
  ];

  // Use Fisher-Yates shuffle for better randomization
  const shuffledRoles = shuffleArray(roles);
  const shuffledPlayers = shuffleArray(players);

  // Assign shuffled roles to shuffled players
  const assignedPlayers = shuffledPlayers.map((player, index) => ({
    ...player,
    role: shuffledRoles[index],
    isAlive: true,
  }));

  // Pick a random word pair
  const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];

  // Assign words based on roles
  const playersWithWords = assignedPlayers.map((player) => ({
    ...player,
    word: player.role === "civilian" ? wordPair.civilian : 
          player.role === "undercover" ? wordPair.undercover : 
          "" // Mr. White gets no word
  }));

  return { playersWithRoles: playersWithWords, wordPair };
}
