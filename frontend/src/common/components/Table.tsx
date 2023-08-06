import Link from "next/link";
import React from "react";

type Props = {
  data: {
    [key: string]: React.ReactNode;
  }[];
  headers: string[];
  className?: string;
  title?: {
    text?: string;
    icon?: React.ReactNode;
    href?: string;
  };
};

export default function Table({ headers, data, className = "", title }: Props) {
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
              {headers.map((header, index) => (
                <th
                  className={`p-4 ${
                    index === 0 ? "min-w-[150px]" : ""
                  } text-left font-inter text-xs font-medium uppercase tracking-wide text-white/70`}
                  key={index}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((champion, index) => {
              if (champion)
              return (
                <tr
                  key={index}
                  className="odd:bg-surface-odd even:bg-surface-even"
                >
                  {Object.values(champion).map((value, index) => (
                    <td
                      key={index}
                      className={`p-4 ${
                        index === 0 ? "min-w-[150px]" : ""
                      } text-sm font-medium text-white/90`}
                    >
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
          color === "primary" ? "bg-sky-300" : "bg-stat-win"
        } h-[4px] rounded-sm`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
