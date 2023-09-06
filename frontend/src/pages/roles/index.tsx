import { type GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import Filter from "~/components/Filter";
import Table, { type TableColumn } from "~/components/Table";
import { API_ENDPOINT } from "~/constants";
import { type Roles } from "~/types/apiResponses";
import getRole from "~/utils/getRole";

function rolesData({ roles }: { roles: Roles }) {
  console.log(roles);
  const overviewData = roles.rolesData.map(
    ({ role, pickrate, winrate, KDA }) => {
      return {
        role: (
          <div className="flex items-center  gap-2">
            <Image
              src={`/img/rolesIcons/${getRole(role).toLowerCase()}.webp`}
              width={32}
              height={32}
              alt=""
            />
            {getRole(role)}
          </div>
        ),
        pickrate,
        winrate,
        KDA,
      };
    }
  );
  const overviewColumns: TableColumn[] = [
    {
      key: "role",
      name: "Role",
    },
    {
      key: "pickrate",
      name: "Pick Rate",
      bar: true,
      percentage: true,
      barColor: "primary",
    },
    {
      key: "winrate",
      name: "Win Rate",
      bar: true,
      percentage: true,
      barColor: "win",
    },
    {
      key: "KDA",
      name: "KDA",
      bar: true,
      barColor: "damage",
    },
  ];
  return (
    <div>
      <div className="flex flex-col space-y-2 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-2">
        <div className="flex flex-shrink space-x-4">
          <div className="space-y-2">
            <div className="text-3xl text-white lg:text-4xl">Roles</div>
          </div>
        </div>
      </div>
      <Filter />
      <Table data={overviewData} columns={overviewColumns} />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${API_ENDPOINT}/api/roles`);
  const roles = (await res.json()) as Roles;
  return {
    props: { roles },
  };
};
export default rolesData;
