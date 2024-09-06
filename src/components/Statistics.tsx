import React from "react";
import { useRecoilValue } from "recoil";
import { matchDataState } from "@/store/matchDetailsState";

interface Stat {
  label: string;
  homeStat: number | string;
  awayStat: number | string;
}

export default function Statistics({ matchId }: { matchId: string }) {
  const matchData = useRecoilValue(matchDataState(matchId));

  if (!matchData) {
    return (
      <div className="text-center p-4 text-red-500">
        선택된 매치가 없습니다.
      </div>
    );
  }

  const { homeTeam, awayTeam } = matchData;

  const stats: Stat[] = [
    {
      label: "전체 슛",
      homeStat: homeTeam.shoot.shootTotal,
      awayStat: awayTeam.shoot.shootTotal,
    },
    {
      label: "유효 슈팅",
      homeStat: homeTeam.shoot.effectiveShootTotal,
      awayStat: awayTeam.shoot.effectiveShootTotal,
    },
    {
      label: "파울",
      homeStat: homeTeam.matchDetail.foul,
      awayStat: awayTeam.matchDetail.foul,
    },
    {
      label: "코너킥",
      homeStat: homeTeam.matchDetail.cornerKick,
      awayStat: awayTeam.matchDetail.cornerKick,
    },
    {
      label: "오프사이드",
      homeStat: homeTeam.matchDetail.offsideCount,
      awayStat: awayTeam.matchDetail.offsideCount,
    },
    {
      label: "경고",
      homeStat: homeTeam.matchDetail.yellowCards,
      awayStat: awayTeam.matchDetail.yellowCards,
    },
    {
      label: "퇴장",
      homeStat: homeTeam.matchDetail.redCards,
      awayStat: awayTeam.matchDetail.redCards,
    },
  ];

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <p className="text-center mt-5 text-xl font-bold">공 점유율</p>
      <div className="flex h-8 rounded-xl overflow-hidden mt-5">
        <div
          style={{
            width: `${homeTeam.matchDetail.possession}%`,
            backgroundColor:
              homeTeam.matchDetail.possession > awayTeam.matchDetail.possession
                ? "#d3171e"
                : "white",
          }}
          className="flex items-center justify-start pl-2 text-sm"
        >
          <span
            className={
              homeTeam.matchDetail.possession > awayTeam.matchDetail.possession
                ? "text-white"
                : "text-black"
            }
          >
            {homeTeam.matchDetail.possession}%
          </span>
        </div>
        <div
          style={{
            width: `${awayTeam.matchDetail.possession}%`,
            backgroundColor:
              awayTeam.matchDetail.possession > homeTeam.matchDetail.possession
                ? "#d3171e"
                : "white",
          }}
          className="flex items-center justify-end pr-2 text-sm"
        >
          <span
            className={
              awayTeam.matchDetail.possession > homeTeam.matchDetail.possession
                ? "text-white"
                : "text-black"
            }
          >
            {awayTeam.matchDetail.possession}%
          </span>
        </div>
      </div>
      <ul className="mt-5 space-y-2">
        {stats.map(({ label, homeStat, awayStat }, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-1 bg-gray-800 rounded"
          >
            <div className="w-[15%] text-center text-blue-400">{homeStat}</div>
            <span className="flex-grow text-center">{label}</span>
            <div className="w-[15%] text-center text-red-400">{awayStat}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
