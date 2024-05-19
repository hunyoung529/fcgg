"use client";
import { useEffect, useState } from "react";
import Ratings from "./Ratings";
import Squad from "./Squad";
import DetailedStatistics from "./DetailedStatistics";
import Statistics from "./Statistics";
import { getTimeDifference, formatDate } from "@/utils/timeDefference";
import { useRecoilValue } from "recoil";
import { matchDetailsState } from "@/store/appState";
import { Match } from "../utils/matchDetailsConvert";
import { getMatchTeams } from "@/utils/matchHomeAway";

export default function MatchDetail() {
  const matchDetails = useRecoilValue(matchDetailsState);
  const [visibleMatches, setVisibleMatches] = useState(5);
  const [activeMatches, setActiveMatches] = useState<Array<boolean>>([]);
  const [selectedTabs, setSelectedTabs] = useState<Array<string>>([]);

  useEffect(() => {
    setActiveMatches(new Array(matchDetails.length).fill(false));
    setSelectedTabs(new Array(matchDetails.length).fill("statistics"));
  }, [matchDetails]);

  const loadMoreMatches = () => {
    setVisibleMatches((prevVisible) => prevVisible + 10);
  };

  const toggleActive = (index: number) => {
    setActiveMatches((prevActive) =>
      prevActive.map((isActive, i) => (i === index ? !isActive : isActive))
    );
  };

  const setSelectedTab = (index: number, tab: string) => {
    setSelectedTabs((prevTabs) =>
      prevTabs.map((selectedTab, i) => (i === index ? tab : selectedTab))
    );
  };

  const selectedContent = (matchData: Match, matchId: string, selectedTab: string) => {
    switch (selectedTab) {
      case "statistics":
        return <Statistics data={matchData} />;
      case "detailedStatistics":
        return <DetailedStatistics data={matchData} />;
      case "ratings":
        return <Ratings data={matchData} matchId={matchId} />;
      // case "squad":
      //   return <Squad data={matchData} />;
      default:
        return null;
    }
  };

  const currentMatches = matchDetails.slice(0, visibleMatches);

  return (
    <div>
      {currentMatches.map((matchData: Match, index: number) => {
        const { matchDate, matchId } = matchData;
        const { homeTeam, awayTeam } = getMatchTeams(matchData);

        const relativeTime = getTimeDifference(matchDate);
        const detailedDate = formatDate(matchDate);

        const homeBgColor =
          homeTeam.matchDetail?.matchResult === "승"
            ? "bg-blue-500"
            : homeTeam.matchDetail?.matchResult === "패"
            ? "bg-red-500"
            : "bg-[#2c3035]";
        const awayBgColor =
          awayTeam.matchDetail?.matchResult === "승"
            ? "bg-blue-500"
            : awayTeam.matchDetail?.matchResult === "패"
            ? "bg-red-500"
            : "bg-[#2c3035]";

        const homeController = homeTeam.matchDetail?.controller;
        const awayController = awayTeam.matchDetail?.controller;
        const homeIcon =
          homeController === "keyboard"
            ? "/icon-keyboard.png"
            : "/icon-gamepad.png";
        const awayIcon =
          awayController === "keyboard"
            ? "/icon-keyboard.png"
            : "/icon-gamepad.png";

        return (
          <div key={index}>
            <div className="rounded-md bg-[#66788a] my-2 text-white py-1 px-10 min-h-10v flex items-center justify-between w-full">
              <p className="w-[15%]" title={detailedDate}>
                {relativeTime}
              </p>
              <div className="flex justify-between w-[70%] items-center">
                <span className={`${homeBgColor} p-1 rounded`}>
                  {homeTeam.matchDetail?.matchResult}
                </span>
                <div className="flex items-center justify-center gap-1 w-1/4 text-center">
                  <span>{homeTeam.nickname}</span>
                  <img src={homeIcon} alt="HomeController" className="size-7" />
                </div>
                <div className="w-[10%] text-center">
                  <span>{homeTeam.shoot?.goalTotal ?? 0}</span>
                  <span className="mx-1 rounded">:</span>
                  <span>{awayTeam.shoot?.goalTotal ?? 0}</span>
                </div>
                <div className="flex items-center justify-center gap-1 w-1/4 text-center">
                  <span>{awayTeam.nickname}</span>
                  <img src={awayIcon} alt="AwayController" className="size-7" />
                </div>
                <span className={`${awayBgColor} p-1 rounded`}>
                  {awayTeam.matchDetail?.matchResult}
                </span>
              </div>
              <div className="w-[15%] ml-auto text-right">
                <button onClick={() => toggleActive(index)}>더보기</button>
              </div>
            </div>
            {activeMatches[index] && (
              <div className="min-h-50v w-[80%] mx-auto">
                <div className="flex justify-around w-[60%] mx-auto">
                  <button onClick={() => setSelectedTab(index, "statistics")}>
                    주요통계
                  </button>
                  <button onClick={() => setSelectedTab(index, "detailedStatistics")}>
                    세부통계
                  </button>
                  <button onClick={() => setSelectedTab(index, "ratings")}>
                    평점
                  </button>
                  {/* <button onClick={() => setSelectedTab(index, "squad")}>
                    스쿼드
                  </button> */}
                </div>
                {selectedContent(matchData, matchId, selectedTabs[index])}
              </div>
            )}
          </div>
        );
      })}
      {visibleMatches < matchDetails.length && (
        <button
          onClick={loadMoreMatches}
          className="load-more bg-[#34495e] w-full p-2 rounded"
        >
          더 보기
        </button>
      )}
    </div>
  );
}
