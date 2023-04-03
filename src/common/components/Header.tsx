import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

// type Props = {};

function Header() {
  const [isMenuActive, setMenuActive] = useState(false);
  return (
    <header className="fixed flex max-h-16 w-full items-center justify-between bg-[rgb(33,44,71)] p-2">
      <Bars3Icon
        width={24}
        color="white"
        className="lg:hidden"
        onClick={() => setMenuActive((prev) => !prev)}
      />
      {isMenuActive && (
        <MobileMenu handleCloseMenu={() => setMenuActive(false)} />
      )}
      <h1 className="bg-[#65bfff] py-1 px-2 text-2xl font-bold uppercase text-white">
        Bugadins
      </h1>
      <UserCircleIcon width={24} color="white" />
    </header>
  );
}

export default Header;
