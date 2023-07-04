import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TextInput from "~/common/components/TextInput";
import Button from "~/common/components/Button";
import Table, { HorizontalBar } from "~/common/components/Table"

const name = <div className="flex"><Image src="https://www.overbuff.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgenji.af8825d2.png&w=3840&q=100" alt="" width={32} height={32} />Furia</div>

const Home: NextPage = () => {
  
  const roles = [{
    type: "Damage",
    champions: [{
      name: name,
      pickRate: "13%",
      winRate: "57%",
    },
    {
      name: name,
      pickRate: "7%",
      winRate: "42%",
    },
    {
      name: name,
      pickRate: "14%",
      winRate: "56%",
    }]
  },{
    type: "Support",
    champions: [{
      name: name,
      pickRate: "13%",
      winRate: "57%",
      
    },
    {
      name: name,
      pickRate: "7%",
      winRate: "42%",
    },
    {
      name: name,
      pickRate: "14%",
      winRate: "56%",
    }]
    }].map(role => {
      const maxWinRate = role.champions.reduce((acc, curr) => {
        const winrate = parseInt(curr.winRate)
        if (winrate > acc) {
          return winrate
        } else {
          return acc
        }
      },0)
      const maxPickRate = role.champions.reduce((acc, curr) => {
        const pickRate = parseInt(curr.pickRate)
        if (pickRate > acc) {
          return pickRate
        } else {
          return acc
        }
      }, 0)
      const newChampions = role.champions.map(champion => {
        console.log(champion.winRate)
        console.log(parseInt(champion.winRate))
        return {
          ...champion,
          pickRate: (<div>{champion.pickRate }<HorizontalBar value={(parseInt(champion.pickRate) / maxPickRate) * 100} /></div>),
          winRate: (<div>{champion.winRate }<HorizontalBar color={"secondary"} value={(parseInt(champion.winRate) / maxWinRate) * 100} /></div>),
        }
      })
      return {
        ...role,
        champions: newChampions
      }
  })

  console.log(roles)
  const headers = ["Champion","Pick Rate", "Win Rate"]
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-full bg-surface-600">
        <h2 className="font-title rounded-md p-2 text-center text-3xl font-bold uppercase  text-white">
          Welcome to the new Overbuff!
        </h2>

        <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="inline-flex rounded-full bg-sky-300 p-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3 w-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </div>
            <div className="text-xs font-bold uppercase text-white md:text-sm">
              OW 2 Support
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="inline-flex rounded-full bg-sky-300 p-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3 w-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </div>
            <div className="text-xs font-bold uppercase text-white md:text-sm">
              New Heroes
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="inline-flex rounded-full bg-sky-300 p-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3 w-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </div>
            <div className="text-xs font-bold uppercase text-white md:text-sm">
              Added Stats
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="inline-flex rounded-full bg-sky-300 p-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3 w-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </div>
            <div className="text-xs font-bold uppercase text-white md:text-sm">
              Improved Rankings
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
          className="mx-auto block w-fit rounded-sm text-base font-semibold"
        >
          Sign in with Battle.net to see your stats!
        </Button>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Table
            data={roles[0]!.champions}
            title="Top Damage Heroes"
            headers={headers}
          />
          <Table
            data={roles[1]!.champions}
            title="Top Support Heroes"
            headers={headers}
          />
          <Table
            data={roles[1]!.champions}
            title="Top Tank Heroes"
            headers={headers}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
