import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type MenuProps = {
  handleCloseMenu: () => void;
  isActive: boolean;
};

function Menu({ handleCloseMenu, isActive }: MenuProps) {
  const linkClassName =
    "py-4 outline-none transition-all hover:text-white focus-visible:ring-2  focus-visible:ring-sky-300";
  return (
    <>
      <div
        className={`absolute inset-0 h-screen bg-black/40 transition-opacity duration-500 lg:hidden ${
          isActive ? "opacity-100" : "-z-10 opacity-0"
        }`}
      ></div>
      <div
        className={`absolute top-0 flex h-screen w-3/4 max-w-md flex-col bg-surface-500  transition-all duration-500 lg:static  lg:h-full lg:max-w-none  lg:flex-1 lg:flex-row lg:items-center ${
          isActive ? "left-0" : "-left-full"
        }`}
      >
        <button
          className="relative top-6 left-6 lg:hidden"
          onClick={handleCloseMenu}
        >
          <XMarkIcon width={24} className="text-white/90" />
        </button>
        <ul className=" mt-8 flex flex-col gap-8 py-6 pl-6 font-inter text-lg font-medium text-white/70 lg:mt-0 lg:flex-row lg:py-0 lg:pl-6 lg:text-base">
          <li className="lg:hidden">
            <Link href="#" className={linkClassName}>
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className={linkClassName}>
              Meta
            </Link>
          </li>
          <li>
            <Link href="#" className={linkClassName}>
              Roles Stats
            </Link>
          </li>
          <li>
            <Link href="#" className={linkClassName}>
              Champions Stats
            </Link>
          </li>
          <li>
            <Link href="#" className={linkClassName}>
              Leaderboard
            </Link>
          </li>
        </ul>
        <div className="relative mt-auto px-4 py-6 lg:mx-auto lg:p-0">
          <input
            type="search"
            placeholder="Find players by username"
            className="w-full rounded-md bg-black p-2 font-inter text-sm text-white/70 outline-none focus-visible:ring-2  focus-visible:ring-sky-300"
          />
          <MagnifyingGlassIcon
            className="absolute right-8 top-1/2 -translate-y-1/2 lg:right-2"
            width={20}
            color="white"
          />
        </div>
      </div>
    </>
  );
}

export default Menu;
