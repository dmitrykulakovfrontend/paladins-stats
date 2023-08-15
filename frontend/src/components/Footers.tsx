import Link from "next/link";
import { LINKS } from "~/constants";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-[1140px]  bg-surface-600">
      <div className="container mx-auto max-w-screen-xl px-2 py-4">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          <div className="space-y-6">
            <div className="flex">
              <Logo />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/70">
                Rich statistics for Paladins.
              </p>
              <div className="h-6">
                <div className="inline-flex items-center space-x-2 text-sm text-white/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="text-state-success h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    ></path>
                  </svg>{" "}
                  <span>Everything operating normally</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 md:col-span-2 md:mt-0">
            <div className="md:mx-auto">
              <h3 className="text-base font-medium text-white">The Stats</h3>
              <ul role="list" className="mt-2 space-y-2">
                {LINKS.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:mx-auto">
              <h3 className="text-base font-medium text-white">The Site</h3>
              <ul role="list" className="mt-2 space-y-2">
                <li>
                  <Link
                    className="text-sm text-white/70 hover:text-white"
                    href="about"
                  >
                    About &amp; FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-white/70 hover:text-white"
                    href="conduct"
                  >
                    Code of Conduct
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-white/70 hover:text-white"
                    href="privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-white/70 hover:text-white"
                    href="terms"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="pt-6">
          <p className="text-sm text-white/70 md:text-center">
            © <span>2023</span> Elo Entertainment Inc. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
