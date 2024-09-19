import { useState } from "react";
import { TeamMatchInfo } from "../utils/matchDetailsConvert";
import { getTimeDifference, formatDate } from "../utils/timeDefference";

const useMatchData = (matchData: TeamMatchInfo | undefined) => {
  const [selectedTab, setSelectedTab] = useState("statistics");
  if (!matchData) {
    // 기본값 반환 또는 에러 처리
    return {
      homeTeam: null,
      awayTeam: null,
      relativeTime: "",
      detailedDate: "",
      selectedTab: "statistics",
      setSelectedTab: () => {},
      homeIcon: "",
      awayIcon: "",
    };
  }

  const { matchDate, homeTeam, awayTeam } = matchData;

  const matchDateUTCString = matchDate + "Z";
  const matchDateObj = new Date(matchDateUTCString);

  // matchDateObj가 유효한지 확인
  if (isNaN(matchDateObj.getTime())) {
    console.error("Invalid matchDate:", matchDate);
  }

  const relativeTime = getTimeDifference(matchDateObj);
  const detailedDate = formatDate(matchDateObj);

  const homeController = homeTeam?.matchDetail?.controller ?? "";
  const awayController = awayTeam?.matchDetail?.controller ?? "";
  const homeIcon =
    homeController === "keyboard" ? "/icon-keyboard.png" : "/icon-gamepad.png";
  const awayIcon =
    awayController === "keyboard" ? "/icon-keyboard.png" : "/icon-gamepad.png";

  return {
    homeTeam,
    awayTeam,
    relativeTime,
    detailedDate,
    selectedTab,
    setSelectedTab,
    homeIcon,
    awayIcon,
  };
};

export default useMatchData;
