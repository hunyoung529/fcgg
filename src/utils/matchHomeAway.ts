import { Match } from "./matchDetailsConvert";

export const getMatchTeams = (data: Match) => {
  const { matchInfo } = data;
  if (!matchInfo || matchInfo.length < 2) {
    throw new Error("유효하지 않은 매치 데이터입니다");
  }
  const homeTeam = matchInfo[0];
  const awayTeam = matchInfo[1];
  return { homeTeam, awayTeam };
};
