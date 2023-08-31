import { type NextPage, type GetStaticPaths, type GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { type ParsedUrlQuery } from "querystring";
import Button from "~/components/Button";
import { API_ENDPOINT } from "~/constants";
import type ChampionData from "~/types/apiResponses";
import getRole from "~/utils/getRole";

const ChampionPage: NextPage<{ champion: ChampionData }> = ({ champion }) => {
  console.log(champion);
  return (
    <div className="mt-8 text-white/70 ">
      <div className="rounded-lg bg-surface-500 shadow-lg">
        <div className="overflow-hidden rounded-t-lg">
          <div className="h-24 w-full bg-green-primary object-cover"></div>
        </div>
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="relative md:flex md:items-end md:space-x-5">
            <div className="hidden h-0 w-28 sm:w-36 md:block"></div>
            <div className="-mt-8 md:absolute md:-top-8 md:mt-0">
              <div className="shadow-dark relative h-24 w-24 overflow-hidden rounded-lg bg-black shadow ring-2 ring-surface-500 sm:h-32 sm:w-32">
                <Image
                  src={champion.icon}
                  height={128}
                  width={128}
                  alt={champion.name + " icon"}
                />
              </div>
            </div>
            <div className="pt-2 pb-4 md:flex md:h-[120px] md:flex-1 md:items-start md:justify-end md:space-x-6 md:pb-2">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
                  <h1 className="font-title text-3xl italic text-white/90 md:text-4xl">
                    {champion.name}
                  </h1>
                </div>
                <Link
                  className="text-secondary flex flex-row flex-nowrap items-center justify-start"
                  href={`/roles/${getRole(champion.role).toLowerCase()}`}
                >
                  <Image
                    src={`/img/rolesIcons/${getRole(
                      champion.role
                    ).toLowerCase()}.webp`}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <div className="text-sm font-medium leading-none tracking-tighter">
                    {getRole(champion.role)}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="flex flex-row flex-wrap gap-2">
          <div className="flex flex-col flex-nowrap items-start justify-start">
            <div className="text-secondary px-0.5 pb-1 text-sm">Platform</div>
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
            <div className="text-secondary px-0.5 pb-1 text-sm">Game Mode</div>
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
                className="text-secondary block px-0.5 pb-1 text-sm"
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
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(API_ENDPOINT + "/api/champions");
  const champions = (await res.json()) as ChampionData[];
  const paths = champions.map((champion) => ({
    params: {
      id: champion.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log({ params });
  const { id } = params as IParams;
  const res = await fetch(`${API_ENDPOINT}/api/champions/${id}`);
  const champion = (await res.json()) as ChampionData;
  return {
    props: { champion },
  };
};

export default ChampionPage;
