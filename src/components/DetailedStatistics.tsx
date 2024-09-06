"use client";
import { useState } from "react";
import {
  OtherStatistics,
  PassStatistics,
  ShootStatistics,
} from "./DetailStats";
import { matchDataState } from "@/store/matchDetailsState";
import { useRecoilValue } from "recoil";

export default function DetailedStatistics({ matchId }: { matchId: string }) {
  const matchData = useRecoilValue(matchDataState(matchId)); // matchId로 매치 데이터를 가져옴
  const [selectedTab, setSelectedTab] = useState("shoot");
  console.log(matchData);
  // 선택된 매치가 없을 경우 처리
  if (!matchData) {
    return <div className="text-center p-4">선택된 매치가 없습니다.</div>;
  }

  const { homeTeam, awayTeam } = matchData;
  const selectedStatistics = () => {
    switch (selectedTab) {
      case "shoot":
        return (
          <ShootStatistics
            homeStats={homeTeam.shoot}
            awayStats={awayTeam.shoot}
          />
        );
      case "pass":
        return (
          <PassStatistics homeStats={homeTeam.pass} awayStats={awayTeam.pass} />
        );
      case "other":
        return (
          <OtherStatistics
            homeStats={{
              ...homeTeam.defence,
              ...homeTeam.matchDetail,
            }}
            awayStats={{
              ...awayTeam.defence,
              ...awayTeam.matchDetail,
            }}
          />
        );
      default:
        return null;
    }
  };
  const isActive = (tabName: string) =>
    selectedTab === tabName
      ? "bg-blue-500 text-white border border-solid border-white"
      : "bg-white text-black border border-solid border-transparent";

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="mb-4">
        <button
          className={`px-4 py-2 ${isActive("shoot")}`}
          onClick={() => setSelectedTab("shoot")}
        >
          Shoot
        </button>
        <button
          className={`px-4 py-2 ${isActive("pass")}`}
          onClick={() => setSelectedTab("pass")}
        >
          Pass
        </button>
        <button
          className={`px-4 py-2 ${isActive("other")}`}
          onClick={() => setSelectedTab("other")}
        >
          기타
        </button>
      </div>
      {selectedStatistics()}
    </div>
  );
}
