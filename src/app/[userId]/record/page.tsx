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
import MatchList from "@/components/MatchList";

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

  if (!Array.isArray(matchIds)) {
    return <h2>경기 정보를 찾을 수 없습니다.</h2>;
  }

  const matchDetails = await getAllMatchDetails(matchIds);

  if (!Array.isArray(maxDivision)) {
    return <h2>경기 정보를 찾을 수 없습니다.</h2>;
  }

  const findItem = maxDivision.find(
    (item: IMaxdivision) => item.matchType === parseInt(matchtype)
  );

  if (!findItem) return <h2>경기 정보를 찾을 수 없습니다.</h2>;

  const divisionInfo = divisionTypes.find(
    (dt) => dt.divisionId === findItem?.division
  );
  const divisionName = divisionInfo?.divisionName || "알 수 없는 랭크 타입";
  const divisionIcon = divisionInfo?.icon;
  const achievedDate = findItem?.achievementDate;
  const isValidDate = Date.parse(achievedDate);
  const date = isValidDate ? new Date(achievedDate) : new Date();
  const formattedDate = isValidDate
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    : "날짜 정보 없음";

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

  return (
    <>
      <section className="bg-[#34495e] rounded max-w-7xl flex items-center justify-between mx-auto p-2">
        <div className="w-30 ml-5">
          <h2 className="text-2xl mb-1">구단주명: {basicInfo.nickname}</h2>
          <p>레벨: {basicInfo.level}</p>
        </div>
        <div className="w-100 flex items-center">
          <div>
            <p className="mb-1">탑 레이팅 - {divisionName}</p>
            <p className="">
              달성일 - {isValidDate ? formattedDate : "날짜 정보 없음"}
            </p>
          </div>
          <img src={divisionIcon} className="w-15 h-15 mx-5" />
        </div>
      </section>
      <MatchList
        selectedMatchType={matchtype}
        userId={userId}
        matchDetails={transformedMatchDetails}
      />
    </>
  );
}
