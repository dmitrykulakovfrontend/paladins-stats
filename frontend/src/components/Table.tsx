import Link from "next/link";
import React from "react";
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
  className?: string;
  title?: {
    text?: string;
    icon?: React.ReactNode;
    href?: string;
  };
};

export default function Table({ columns, data, className = "", title }: Props) {
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
              {columns.map(({ name }, index) => (
                <th
                  className={`p-4 ${
                    index === 0 ? "min-w-[145px]" : ""
                  } text-left font-inter text-xs font-medium uppercase tracking-wide text-white/70`}
                  key={index}
                >
                  {name}
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
