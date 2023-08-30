import { type NextPage, type GetStaticPaths, type GetStaticProps } from "next";
import { type ParsedUrlQuery } from "querystring";
import { API_ENDPOINT } from "~/constants";
import type ChampionData from "~/types/apiResponses";

const ChampionPage: NextPage<{ champion: ChampionData }> = ({ champion }) => {
  console.log(champion);
  return <div>Enter</div>;
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
