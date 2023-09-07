import {
  ArrowDownCircleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState } from "react";
export type TableColumn = {
  key: string;
  name: string;
  bar?: boolean;
  percentage?: boolean;
  barColor?: React.PropsWithoutRef<BarProps>["color"];
};
type Props = {
  data: {
    [key: string]: React.ReactNode;
  }[];
  columns: TableColumn[];
  sort?: {
    defaultKey: string;
  };
  className?: string;
  title?: {
    text?: string;
    icon?: React.ReactNode;
    href?: string;
  };
};

export default function Table({
  columns,
  data,
  className = "",
  title,
  sort,
}: Props) {
  const [sortType, setSortType] = useState(sort?.defaultKey);
  const [isDesc, setIsDesc] = useState(true);
  const [isHoverColumn, setIsHoverColumn] = useState<string>();
  if (sort) {
    data.sort(sortData);
  }
  const relativeBarsData = data.map((obj) => {
    const newObj: typeof obj = {};

    for (const [key, value] of Object.entries(obj)) {
      const columnData = columns.find((col) => col.key === key);
      if (columnData?.bar) {
        let max = 0;
        for (const obj2 of data) {
          if (parseFloat(obj2[key] as string) > max) {
            max = parseFloat(obj2[key] as string);
          }
        }
        newObj[key] = (
          <div className="flex flex-col gap-1">
            <div>
              {value}
              {columnData.percentage && (
                <span className="ml-[1px] text-sm">%</span>
              )}
            </div>
            <HorizontalBar
              color={columnData?.barColor ? columnData.barColor : "damage"}
              value={(parseFloat(value as string) / max) * 100}
            />
          </div>
        );
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  });

  function sortData(a: (typeof data)[number], b: (typeof data)[number]) {
    if (!sortType || typeof a[sortType] !== "string") {
      console.log("Can't sort: ", sortType);
      return -1;
    }
    const aValue = parseFloat(a[sortType] as string);
    const bValue = parseFloat(b[sortType] as string);
    if (isDesc) {
      return bValue - aValue;
    } else {
      return aValue - bValue;
    }
  }
  return (
    <div>
      {title?.text && (
        <div className="mb-2 flex h-10 flex-row flex-wrap items-end justify-start text-white/90 sm:flex-nowrap">
          <h1 className="flex flex-1 gap-2 self-end pl-2 font-inter text-lg font-medium">
            {title.href ? (
              <Link
                className="group flex flex-nowrap items-center justify-start gap-x-2 hover:text-white"
                href={title.href}
              >
                {title.icon}
                {title.text}
              </Link>
            ) : (
              <div className="group flex flex-nowrap items-center justify-start gap-x-2 hover:text-white">
                {title.icon}
                {title.text}
              </div>
            )}
          </h1>
        </div>
      )}

      <div className="w-full overflow-hidden rounded-lg bg-surface-500 shadow-lg">
        <table className={`${className} min-w-full`}>
          <thead className="bg-surface-700">
            <tr>
              {columns.map(({ name, key }, index) => (
                <th
                  className={`p-4 ${index === 0 ? "min-w-[145px]" : ""} ${
                    sort ? "hover:cursor-pointer" : ""
                  }  text-left font-inter text-xs font-medium uppercase tracking-wide text-white/70`}
                  key={index}
                  onMouseEnter={() => setIsHoverColumn(key)}
                  onMouseLeave={() => setIsHoverColumn(undefined)}
                  onClick={
                    sort
                      ? () => {
                          setIsDesc(key === sortType ? !isDesc : true);
                          setSortType(key);
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2">
                    {name}
                    {sort && key === sortType ? (
                      isDesc ? (
                        <ArrowDownIcon
                          height={24}
                          width={24}
                          className="rounded-full bg-surface-400 p-1 text-white transition-all hover:cursor-pointer hover:bg-surface-300"
                          onClick={() => setIsDesc(!isDesc)}
                        />
                      ) : (
                        <ArrowUpIcon
                          height={24}
                          width={24}
                          className="rounded-full bg-surface-400 p-1 text-white transition-all hover:cursor-pointer hover:bg-surface-300"
                          onClick={() => setIsDesc(!isDesc)}
                        />
                      )
                    ) : sort ? (
                      <ArrowDownIcon
                        height={24}
                        width={24}
                        className={` ${
                          isHoverColumn === key ? "opacity-100" : "opacity-0"
                        } rounded-full bg-surface-400 p-1 text-white transition-all hover:cursor-pointer hover:bg-surface-300`}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {relativeBarsData.map((rowData, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-surface-odd even:bg-surface-even"
                >
                  {columns.map(({ key }) => (
                    <td
                      className="max-w-[120px] p-4 text-sm font-medium text-white/90"
                      key={key}
                    >
                      {rowData[key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type BarProps = {
  value: number;
  color?: keyof typeof colorMap;
};
const colorMap = {
  primary: "bg-sky-300",
  win: "bg-stat-win",
  damage: "bg-stat-damage",
};
export function HorizontalBar({ value, color = "primary" }: BarProps) {
  return (
    <div className="w-full rounded-sm bg-surface-600 p-[1px] leading-[0]">
      <div
        className={`${colorMap[color]} h-[4px] rounded-sm`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
