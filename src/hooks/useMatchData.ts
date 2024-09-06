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

  const relativeTime = getTimeDifference(matchDate);
  const detailedDate = formatDate(matchDate);

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
