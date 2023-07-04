import React from "react";

type Props = {
  data: {
    [key: string]: React.ReactNode;
  }[];
  headers: string[];
  className?: string;
  title?: string;
};
/*
"24.23%"
parseInt(24.23%) = 24.23
*/

export default function Table({ headers, data, className = "", title }: Props) {
  return (
    <div>
      <div className="mb-2 flex h-10 flex-row flex-wrap items-end justify-start text-white sm:flex-nowrap">
        <h1 className="flex-1 self-end pl-2 font-sans text-lg font-medium">
          <a
            className="group flex flex-nowrap items-center justify-start gap-x-2 hover:text-white"
            href="/heroes?role=damage"
          >
            <div className="align-baseline">{title}</div>
          </a>
        </h1>
      </div>
      <div className="w-full overflow-hidden rounded-lg bg-surface-500 shadow-lg">
        <table className={`${className} min-w-full`}>
          <thead className="bg-surface-700">
            <tr className="text-slate-300">
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((champion, index) => {
              return (
                <tr key={index} className="odd:bg-surface-odd even:bg-surface-even">
                  {Object.values(champion).map((value, index) => (
                    <td key={index} className="p-4 text-white">
                      {value}
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
  color?: "primary" | "secondary";
};

export function HorizontalBar({ value, color = "primary" }: BarProps) {
  return (
    <div className="w-full rounded-sm bg-surface-600 p-[1px] leading-[0]">
      <div
        className={`${
          color === "primary" ? "bg-sky-500" : "bg-green-600"
        } h-[4px] rounded-sm`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
