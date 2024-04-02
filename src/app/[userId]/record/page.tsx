import matchTypes from "../../data/matchType.json";
import divisionTypes from "../../data/divisionType.json";
import MatchList from "./../../components/matchList";

const BASE_URL = `https://open.api.nexon.com/fconline/v1`;
const Static_URL = "https://open.api.nexon.com/static/fconline";
const API_KEY =
  "test_4f57153bb99a388e2ea5b693777f054e010263de4910d93b6b5422da86f93d6864855ef28173c38e8cfeb0c4fa1ed4aa";

async function getOuid(nickname: string) {
  const response = await fetch(`${BASE_URL}/id?nickname=${nickname}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  });
  const data = await response.json();
  return data.ouid;
}
async function getMatchList(matchtype: string, ouid: string) {
  const response = await fetch(
    `${BASE_URL}/user/match?ouid=${ouid}&matchtype=${matchtype}&offset=0&limit=100`,
    {
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
    }
  );
  const data = await response.json();
  console.log(data[0]);
}
async function getBasicInfo(ouid: string) {
  const basicResponse = await fetch(`${BASE_URL}/user/basic?ouid=${ouid}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  });
  const data = await basicResponse.json();
  return data;
}
async function getMatchDetail(matchId: string) {
  const matchDetailResponse = await fetch(
    `${BASE_URL}/match-detail?matchid=${matchId}`,
    {
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
    }
  );
  const data = await matchDetailResponse.json();
  return data;
}

async function getMaxDivision(ouid: string) {
  const maxDivisionResponse = await fetch(
    `${BASE_URL}/user/maxdivision?ouid=${ouid}`,
    {
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
    }
  );
  const data = await maxDivisionResponse.json();
  return data;
}

interface IMaxdivision {
  matchType: number;
  division: number;
  achievementDate: string;
}
export default async function RecordPage({
  params: { userId },
  searchParams: { matchtype },
}: {
  params: { userId: string };
  searchParams: { matchtype: string };
}) {
  const ouid = await getOuid(userId);
  const basicInfo = await getBasicInfo(ouid);
  const maxDivision = await getMaxDivision(ouid);
  const matchIds = await getMatchList(matchtype, ouid);
  console.log(matchIds);

  const findItem = maxDivision.find(
    (item: IMaxdivision) => item.matchType === parseInt(matchtype)
  );

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
  if (!ouid) return <h2>유저 정보를 찾을 수 없습니다. 다시 검색해주세요</h2>;
  if (!findItem) return <h2>경기 정보를 찾을 수 없습니다.</h2>;
  return (
    <>
      <section className="bg-[#34495e] rounded max-w-7xl flex items-center justify-between mx-auto p-2">
        <div className=" w-30 ml-5">
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
      <MatchList selectedMatchType={matchtype} userId={userId} />
    </>
  );
}
