import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Menu from "./Menu";
import Link from "next/link";

// type Props = {};

function Header() {
  const [isMenuActive, setMenuActive] = useState(false);
  return (
    <header className="fixed left-1/2 flex max-h-16 w-full max-w-[1140px] -translate-x-1/2 items-center justify-between bg-surface-500 p-2 py-6 lg:bg-surface-600 lg:py-10">
      <Bars3Icon
        width={24}
        color="white"
        className="lg:hidden"
        onClick={() => setMenuActive((prev) => !prev)}
      />
      <Link href="/">
        <h1 className="bg-sky-300 py-1 px-2 text-2xl font-bold uppercase text-white transition-all hover:scale-105">
          Bugladins
        </h1>
      </Link>
      <Menu
        handleCloseMenu={() => setMenuActive(false)}
        isActive={isMenuActive}
      />
      <UserCircleIcon width={24} color="white" />
    </header>
  );
}

export default Header;
