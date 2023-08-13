import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TextInput from "~/common/components/TextInput";
import Button from "~/common/components/Button";
import Table, { HorizontalBar } from "~/common/components/Table";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import type ChampionData from "~/types/apiResponses";
import { API_ENDPOINT } from "~/constants";

type Data = {
  champions: ChampionData[];
};

const Home: NextPage<Data> = ({ champions }) => {
  const roles = champions
    .reduce((acc, curr) => {
      const role = curr.role;
      const roleObject = acc.find((item) => item.type === role);
      if (roleObject) {
        roleObject.champions.push(curr);
        return acc;
      } else {
        return [...acc, { type: role, champions: [curr] }];
      }
    }, [] as { type: string; champions: ChampionData[] }[])
    .map((role) => {
      let maxWinRate = 0;
      let maxPickRate = 0;

      role.champions.forEach(({ winrate, pickrate }) => {
        if (parseFloat(winrate) > maxWinRate) {
          maxWinRate = parseFloat(winrate);
        }
        if (parseFloat(pickrate) > maxPickRate) {
          maxPickRate = parseFloat(pickrate);
        }
      });

      const newChampions = role.champions
        .sort((a, b) => parseFloat(b.pickrate) - parseFloat(a.pickrate))
        .map((champion) => {
          return {
            ...champion,

            name: (
              <div className="flex w-fit items-center gap-2">
                <Image
                  src={champion.icon}
                  alt=""
                  width={32}
                  className="rounded"
                  height={32}
                />
                {champion.name}
              </div>
            ),
            pickrate: (
              <div>
                {champion.pickrate}
                <HorizontalBar
                  value={(parseFloat(champion.pickrate) / maxPickRate) * 100}
                />
              </div>
            ),
            winrate: (
              <div>
                {champion.winrate}
                <HorizontalBar
                  color={"secondary"}
                  value={(parseFloat(champion.winrate) / maxWinRate) * 100}
                />
              </div>
            ),
          };
        })
        .slice(0, 5);

      return {
        ...role,
        champions: newChampions,
      };
    });

  const features = [
    "All champions",
    "Custom elo system",
    "Meta suggestions",
    "Graphs and charts",
  ];
  const columns = [
    {
      key: "name",
      name: "Champion",
    },
    {
      key: "pickrate",
      name: "Pick Rate",
    },
    {
      key: "winrate",
      name: "Win Rate",
    },
  ];

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-full bg-surface-600">
        <h2 className="mt-8 rounded-md p-2 text-center font-title text-3xl uppercase  tracking-wide  text-white">
          Welcome to the Paladins Analyzer!
        </h2>
        <div className="flex flex-col items-center justify-center ">
          <div className="w-full space-y-2 md:w-[75%]">
            <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="inline-flex rounded-full bg-sky-300 p-1 text-white">
                    <CircleIcon />
                  </div>
                  <div className="text-xs font-bold uppercase text-white/90 md:text-sm">
                    {feature}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-brand-500 mx-auto my-8 w-full rounded-md border-2 border-sky-300 bg-black text-xl text-white shadow-lg md:w-[75%]">
          <TextInput
            className="p-4 text-xl"
            placeholder="Find player by username"
          />
        </div>
        <Button
          href="/"
          className="mx-auto flex w-fit gap-2 rounded py-2 text-base font-semibold"
        >
          <UserCircleIcon width={24} color="white" />
          Sign in with Battle.net to see your stats!
        </Button>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {roles.map((role, i) => (
            <Table
              key={i}
              data={role.champions}
              title={{
                text: `Top ${getTitle(role.type)} Champions`,
                href: getTitle(role.type).toLowerCase(),
                icon: (
                  <Image
                    src={`/img/rolesIcons/${getTitle(
                      role.type
                    ).toLowerCase()}.webp`}
                    width={32}
                    height={32}
                    alt=""
                  />
                ),
              }}
              columns={columns}
            />
          ))}
        </div>
      </div>
    </>
  );
};

function getTitle(title: string) {
  switch (title) {
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

export const getStaticProps: GetStaticProps<Data> = async () => {
  const res = await fetch(API_ENDPOINT + "/api/champions");
  const champions = (await res.json()) as ChampionData[];
  return { props: { champions } };
};

export function CircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="6"
      stroke="currentColor"
      aria-hidden="true"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      ></path>
    </svg>
  );
}

export default Home;
