import {
  getOuid,
  getBasicInfo,
  getMaxDivision,
  getMatchList,
  getAllMatchDetails,
} from "@/utils/api";
import divisionTypes from "@/data/divisionType.json";
import {
  matchDetailsConvert,
  TeamMatchInfo,
} from "@/utils/matchDetailsConvert";
import RecordClient from "./RecordClient";

interface IMaxdivision {
  matchType: number;
  division: number;
  achievementDate: string;
}

interface RecordPageProps {
  params: { userId: string };
  searchParams: { matchtype: string };
}

export default async function RecordPage({
  params: { userId },
  searchParams: { matchtype },
}: RecordPageProps) {
  const ouid = await getOuid(userId);
  if (!ouid) return <h2>유저 정보를 찾을 수 없습니다. 다시 검색해주세요</h2>;

  const basicInfo = await getBasicInfo(ouid);
  const maxDivision = await getMaxDivision(ouid);
  const matchIds = await getMatchList(matchtype, ouid);
  const matchDetails = await getAllMatchDetails(matchIds);

  // 변환된 matchDetails에서 마지막 업데이트 시간 확인
  const lastUpdatedTime =
    matchDetails.length > 0 ? new Date(matchDetails[0].fetchedAt) : new Date();

  // SSR에서 데이터를 변환하여 클라이언트로 전달
  const transformedMatchDetails: TeamMatchInfo[] = matchDetails.reduce(
    (acc, match) => {
      const homeTeam = matchDetailsConvert(match, 0);
      const awayTeam = matchDetailsConvert(match, 1);
      if (homeTeam && awayTeam) {
        acc.push({
          matchId: match.matchId,
          matchDate: match.matchDate,
          matchType: match.matchType,
          matchInfo: match.matchInfo,
          homeTeam,
          awayTeam,
        });
      } else {
        console.error("Failed to convert match data:", match);
      }
      return acc;
    },
    [] as TeamMatchInfo[]
  );

  const findItem = maxDivision.find(
    (item: IMaxdivision) => item.matchType === parseInt(matchtype)
  );

  if (!findItem) return <h2>경기 정보를 찾을 수 없습니다.</h2>;

  const divisionInfo = divisionTypes.find(
    (dt) => dt.divisionId === findItem?.division
  );
  const divisionName = divisionInfo?.divisionName || "알 수 없는 랭크 타입";
  const divisionIcon = divisionInfo?.icon || "";
  const achievedDate = findItem?.achievementDate;
  const isValidDate = Date.parse(achievedDate);
  const formattedDate = isValidDate
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(achievedDate))
    : "날짜 정보 없음";

  return (
    <RecordClient
      basicInfo={basicInfo}
      matchDetails={transformedMatchDetails} // 변환된 데이터를 클라이언트로 전달
      matchtype={matchtype}
      userId={userId}
      divisionName={divisionName}
      formattedDate={formattedDate}
      divisionIcon={divisionIcon}
      lastUpdatedTime={lastUpdatedTime}
    />
  );
}
