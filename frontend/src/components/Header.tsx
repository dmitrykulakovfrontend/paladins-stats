import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
// type Props = {};

function Header() {
  const [isMenuActive, setMenuActive] = useState(false);
  return (
    <header className="fixed left-1/2 z-10 flex max-h-16 w-full max-w-[1140px] -translate-x-1/2 items-center justify-between bg-surface-500 p-2 py-6 lg:bg-surface-600 lg:py-10">
      <Bars3Icon
        width={24}
        color="white"
        className="lg:hidden"
        onClick={() => setMenuActive((prev) => !prev)}
      />
      <Logo />
      <Menu
        handleCloseMenu={() => setMenuActive(false)}
        isActive={isMenuActive}
      />
      {/* <UserCircleIcon width={24} color="white" /> */}
    </header>
  );
}

export default Header;
