"use client";
import { useState } from "react";
import { TeamMatchInfo } from "../utils/matchDetailsConvert";
import {
  OtherStatistics,
  PassStatistics,
  ShootStatistics,
} from "./DetailStats";

interface DetailStatisticsProps {
  data: TeamMatchInfo;
}
export default function DetailedStatistics({ data }: DetailStatisticsProps) {
  const [selectedTab, setSelectedTab] = useState("shoot");
  const { homeTeam, awayTeam } = data;
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
