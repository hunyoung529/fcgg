import React from "react";
import useMatchData from "@/hooks/useMatchData";
import Ratings from "./Ratings";
import Squad from "./Squad";
import DetailedStatistics from "./DetailedStatistics";
import Statistics from "./Statistics";
import { TeamMatchInfo } from "@/utils/matchDetailsConvert";
import Image from "next/image";

interface MatchDetailProps {
  matchData: TeamMatchInfo;
}

export default function MatchDetail({ matchData }: MatchDetailProps) {
  const {
    homeTeam,
    awayTeam,
    relativeTime,
    detailedDate,
    isActive,
    toggleActive,
    selectedTab,
    setSelectedTab,
    homeIcon,
    awayIcon,
  } = useMatchData(matchData);

  const selectedContent = () => {
    switch (selectedTab) {
      case "statistics":
        return <Statistics data={matchData} />;
      case "detailedStatistics":
        return <DetailedStatistics data={matchData} />;
      case "ratings":
        return <Ratings data={matchData} />;
      case "squad":
        return <Squad data={matchData} />;
      default:
        return null;
    }
  };

  const homeBgColor =
    homeTeam.matchDetail.matchResult === "승"
      ? "bg-win"
      : homeTeam.matchDetail.matchResult === "패"
      ? "bg-lose"
      : "bg-draw";

  const awayBgColor =
    awayTeam.matchDetail.matchResult === "승"
      ? "bg-win"
      : awayTeam.matchDetail.matchResult === "패"
      ? "bg-lose"
      : "bg-draw";

  return (
    <>
      <div className="rounded-md bg-[#66788a] my-2 text-white py-1 px-10 min-h-10v flex items-center justify-between w-full">
        <p className="" title={detailedDate}>
          {relativeTime}
        </p>
        <div className="flex justify-between w-4/6 items-center">
          <span className={`${homeBgColor} p-1 rounded`}>
            {homeTeam.matchDetail.matchResult}
          </span>
          <div className="flex items-center justify-center gap-1 w-[30%] text-center">
            <span>{homeTeam.nickname}</span>
            <Image src={homeIcon} alt="HomeController" width={28} height={28} />
          </div>
          <div className="w-[10%] text-center">
            <span>{homeTeam.shoot.goalTotal}</span>
            <span className="mx-1 rounded">:</span>
            <span>{awayTeam.shoot.goalTotal}</span>
          </div>
          <div className="flex items-center justify-center gap-1 w-[30%] text-center">
            <span>{awayTeam.nickname}</span>
            <Image src={awayIcon} alt="HomeController" width={28} height={28} />
          </div>
          <span className={`${awayBgColor} p-1 rounded`}>
            {awayTeam.matchDetail.matchResult}
          </span>
        </div>
        <div className="">
          <button className="" onClick={toggleActive}>
            더보기
          </button>
        </div>
      </div>
      {isActive && (
        <div className="min-h-50v w-[80%] mx-auto text-white">
          <div className="flex justify-between w-[60%] mx-auto">
            <button onClick={() => setSelectedTab("statistics")}>
              주요통계
            </button>
            <button onClick={() => setSelectedTab("detailedStatistics")}>
              세부통계
            </button>
            <button onClick={() => setSelectedTab("ratings")}>평점</button>
            <button onClick={() => setSelectedTab("squad")}>스쿼드</button>
          </div>
          {selectedContent()}
        </div>
      )}
    </>
  );
}
