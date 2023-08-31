export default function getRole(role: string) {
  switch (role) {
    case "Paladins Damage":
      return "Damage";
    case "Paladins Support":
      return "Support";
    case "Paladins Front Line":
      return "Tank";
    case "Paladins Flanker":
      return "Flank";
    default:
      return "";
  }
}
