import React from "react";

type Props = {
  data: {
    [key: string]: {
      value: string,
      bar?: number;
    } | React.ReactNode;
  }[];
  headers: string[];
};
/*
"24.23%"
parseInt(24.23%) = 24.23
*/

export default function Table({ headers, data }: Props) {


  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((champion, index) => {
          return (
          <tr>
            {Object.values(champion).map((value, index) => (
              <td key={index}>{value?.bar ? <div><HorizontalBar value={bar} />{value} </div> : <>{value}</>} </td>
            ))}
          </tr>
        )})}
      </tbody>
    </table>
  );
}

type BarProps = {
  value: number;
}

function HorizontalBar({ value}: BarProps) {
  return (
    <div className="w-full rounded-sm bg-surface-600 p-[1px] leading-[0]">
      <div className="bg-stat-score h-[4px] rounded-sm" style={{width: `${value}%`}}></div>
    </div>
  );
}
