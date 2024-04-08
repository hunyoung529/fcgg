"use client";
import { Match } from "@/utils/matchDetailsConvert";
import { getTimeDifference, formatDate } from "@/utils/timeDefference";
import { useState } from "react";
import Ratings from "./Ratings";
import Squad from "./Squad";
import DetailedStatistics from "./DetailedStatistics";
import Statistics from "./Statistics";

interface MatchDetailProps {
  matchData: Match;
}

export default function MatchDetail({ matchData }: MatchDetailProps) {
  const { matchDate, homeTeam, awayTeam } = matchData;
  const relativeTime = getTimeDifference(matchDate);
  const detailedDate = formatDate(matchDate);
  const [isActive, setIsActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState("statistics");
  const homeBgColor =
    homeTeam.matchDetail.matchResult === "승"
      ? "bg-blue-500"
      : homeTeam.matchDetail.matchResult === "패"
      ? "bg-red-500"
      : "bg-gray-500";
  const awayBgColor =
    awayTeam.matchDetail.matchResult === "승"
      ? "bg-blue-500"
      : awayTeam.matchDetail.matchResult === "패"
      ? "bg-red-500"
      : "bg-[#2c3035]";

  const toggleActive = () => {
    setIsActive(!isActive);
  };

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
        return <div>내용을 선택해주세요.</div>;
    }
  };
  return (
    <>
      <div className="rounded-md bg-[#66788a] my-2 text-white py-1 px-10 min-h-10v flex items-center justify-between w-full ">
        <p className="" title={detailedDate}>
          {relativeTime}
        </p>
        <div className="  flex justify-between w-4/6 items-center ">
          <span className={`${homeBgColor} p-1 rounded`}>
            {homeTeam.matchDetail.matchResult}
          </span>
          <div className="">
            <span>{homeTeam.nickname}</span>
          </div>
          <div className="w-[10%] ">
            <span>{homeTeam.shoot.goalTotal}</span>
            <span className="mx-1 rounded">:</span>
            <span>{awayTeam.shoot.goalTotal}</span>
          </div>
          <div>
            <span className="">{awayTeam.nickname}</span>
          </div>
          <span className={`${awayBgColor}   p-1 rounded`}>
            {awayTeam.matchDetail.matchResult}
          </span>
        </div>
        <div className=" ">
          <button className="" onClick={toggleActive}>
            더보기
          </button>
        </div>
      </div>
      <>
        {isActive && (
          <div className="min-h-50v w-[80%] mx-auto">
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
    </>
  );
}
