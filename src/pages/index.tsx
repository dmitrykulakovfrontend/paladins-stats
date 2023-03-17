import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { type MouseEvent } from "react";
import { type GetDataUsedRes } from "~/types/apiResponses";

function handleApiUsage(e: MouseEvent<HTMLButtonElement>) {
  fetch("/api/usage")
    .then((data) => data.json())
    .then((data: Error | GetDataUsedRes) => {
      if (data instanceof Error) {
        console.error(data);
      } else console.log(data);
    })
    .catch((e) => console.error(e));
  return;
}
function handleApiTest(e: MouseEvent<HTMLButtonElement>) {
  fetch("/api/test")
    .then((data) => data.json())
    .then((data: any) => {
      if (data instanceof Error) {
        console.error(data);
      } else console.log(data);
    })
    .catch((e) => console.error(e));
  return;
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <button
              onClick={handleApiUsage}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">Get data usage →</h3>
              <div className="text-left text-lg">
                Just the basics - Everything you need to know
              </div>
            </button>
            <button
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={handleApiTest}
            >
              <h3 className="text-2xl font-bold">Test route →</h3>
              <div className="text-lg">Learn more.</div>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;