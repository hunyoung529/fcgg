"use client";
import { useState } from "react";
import { Match } from "../utils/matchDetailsConvert";
import {
  OtherStatistics,
  PassStatistics,
  ShootStatistics,
} from "./DetailStats";

interface DetailStatisticsProps {
  data: Match;
}
export default function DetailedStatistics({ data }: DetailStatisticsProps) {
  const [selectedTab, setSelectedTab] = useState("shoot");

  const selectedStatistics = () => {
    switch (selectedTab) {
      case "shoot":
        return (
          <ShootStatistics
            homeStats={data.homeTeam.shoot}
            awayStats={data.awayTeam.shoot}
          />
        );
      case "pass":
        return (
          <PassStatistics
            homeStats={data.homeTeam.pass}
            awayStats={data.awayTeam.pass}
          />
        );
      case "other":
        return (
          <OtherStatistics
            homeStats={{
              ...data.homeTeam.defence,
              ...data.homeTeam.matchDetail,
            }}
            awayStats={{
              ...data.awayTeam.defence,
              ...data.awayTeam.matchDetail,
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
