import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type MobileMenuProps = {
  handleCloseMenu: () => void;
};

function MobileMenu({ handleCloseMenu }: MobileMenuProps) {
  return (
    <div className="absolute left-0 top-0 flex h-screen w-3/4 max-w-md flex-col bg-slate-500 p-6">
      <button onClick={handleCloseMenu}>
        <XMarkIcon width={24} color="white" />
      </button>
      <ul>
        <li>
          <Link href="#">Home</Link>
        </li>
        <li>
          <Link href="#">Meta</Link>
        </li>
        <li>
          <Link href="#">Champions Stats</Link>
        </li>
        <li>
          <Link href="#">Roles Stats</Link>
        </li>
        <li>
          <Link href="#">Leaderboard</Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileMenu;
