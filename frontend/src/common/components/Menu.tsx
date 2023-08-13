import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import TextInput from "./TextInput";

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
        className={`duration-600 absolute inset-0 h-screen bg-black/40 transition-all lg:hidden ${
          isActive ? "-left-0 opacity-100" : "-left-full -z-10 opacity-0"
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
        <div className="mx-auto my-auto w-full max-w-[250px] max-lg:mt-auto max-lg:mb-6 max-lg:max-w-full max-lg:px-6">
          <TextInput
            placeholder="Find players by username"
            className="p-2"
            type="search"
            Icon={MagnifyingGlassIcon}
          />
        </div>
      </div>
    </>
  );
}

export default Menu;
