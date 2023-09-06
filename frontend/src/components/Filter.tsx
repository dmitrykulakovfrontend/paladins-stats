import React from "react";
import Button from "./Button";

function Filter() {
  return (
    <div className="py-2">
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-col flex-nowrap items-start justify-start">
          <div className="px-0.5 pb-1 text-sm text-white/80">Platform</div>
          <div className="flex flex-row flex-nowrap rounded-lg bg-surface-700 shadow-md">
            <div className="group">
              <Button
                className="flex h-10 items-center bg-surface-300 px-3.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-300 group-first:rounded-l-lg group-last:rounded-r-lg"
                href="/heroes/genji?platform=pc&amp;gameMode=quickplay&amp;hero=genji"
              >
                PC
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-start justify-start">
          <div className="px-0.5 pb-1 text-sm text-white/80">Game Mode</div>
          <div className="flex flex-row flex-nowrap rounded-lg bg-surface-700 shadow-md">
            <div className="group">
              <Button
                className="flex h-10 items-center bg-surface-300 px-3.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-300 group-first:rounded-l-lg group-last:rounded-r-lg"
                href="/heroes/genji?platform=pc&amp;gameMode=competitive&amp;hero=genji"
              >
                Competitive
              </Button>
            </div>
            {/* <li className="group">
                <a
                  className="flex h-10 items-center bg-surface-300 px-3.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-300 group-first:rounded-l-lg group-last:rounded-r-lg"
                  href="/heroes/genji?platform=pc&amp;gameMode=quickplay&amp;hero=genji"
                >
                  Quickplay
                </a>
              </li> */}
          </div>
        </div>
        {/* <div className="w-48">
            <div className="relative">
              <label
                className="text-white/80 block px-0.5 pb-1 text-sm"
                id="headlessui-listbox-label-:R6nl6tm:"
                data-headlessui-state=""
              >
                Skill Tier
              </label>
              <button
                className="hover:bg-surface-400 focus-visible:ring-surface-300 relative h-10 w-full rounded-lg bg-surface-700 pl-3 pr-10 text-left text-sm font-medium shadow-md focus:outline-none focus-visible:ring-2"
                id="headlessui-listbox-button-:Ranl6tm:"
                type="button"
                aria-haspopup="listbox"
                aria-expanded="false"
                data-headlessui-state=""
                aria-labelledby="headlessui-listbox-label-:R6nl6tm: headlessui-listbox-button-:Ranl6tm:"
              >
                <span className="inline-flex flex-nowrap items-center truncate leading-10">
                  <div className="inline-flex flex-row flex-nowrap items-center justify-start gap-2">
                    <div>All</div>
                  </div>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default Filter;
