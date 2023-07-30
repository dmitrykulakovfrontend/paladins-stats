import { Champion } from "~/types/common.js";


 function calculateTotalMatches(champions: Champion[]): number {
  let totalMatches = 0;

  for (const champion of champions) {
    totalMatches += champion.wins + champion.loses;
  }

  return totalMatches;
}


export default calculateTotalMatches