import { useRecoilValue } from "recoil";
import { selectedMatchState } from "@/store/matchDetailsState"; // Recoil 상태 임포트

export default function Statistics() {
  // Recoil에서 선택된 매치 데이터 가져오기
  const data = useRecoilValue(selectedMatchState);

  // 선택된 매치가 없을 경우 처리
  if (!data) {
    return <div>선택된 매치가 없습니다.</div>;
  }

  const { homeTeam, awayTeam } = data;

  if (!homeTeam || !awayTeam) {
    return <div>유효하지 않은 매치 데이터입니다.</div>;
  }

  const homePassSuccess = homeTeam.pass.passSuccess;
  const homePassTry = homeTeam.pass.passTry;
  const homePassPercentage =
    homePassTry > 0 ? ((homePassSuccess / homePassTry) * 100).toFixed(1) : 0;

  const awayPassSuccess = awayTeam.pass.passSuccess;
  const awayPassTry = awayTeam.pass.passTry;
  const awayPassPercentage =
    awayPassTry > 0 ? ((awayPassSuccess / awayPassTry) * 100).toFixed(1) : 0;

  const stats = [
    {
      label: "전체슛",
      homeStat: homeTeam.shoot.shootTotal,
      awayStat: awayTeam.shoot.shootTotal,
    },
    {
      label: "유효 슈팅",
      homeStat: homeTeam.shoot.effectiveShootTotal,
      awayStat: awayTeam.shoot.effectiveShootTotal,
    },
    {
      label: "정확한 패스",
      homeStat:
        homePassSuccess != null
          ? `${homePassSuccess} (${homePassPercentage}%)`
          : "몰수패",
      awayStat:
        awayPassSuccess != null
          ? `${awayPassSuccess} (${awayPassPercentage}%)`
          : "몰수패",
    },
    {
      label: "반칙",
      homeStat: homeTeam.matchDetail.foul,
      awayStat: awayTeam.matchDetail.foul,
    },
    {
      label: (
        <>
          <img
            src="/yellowcard.png"
            alt="옐로우카드"
            className="inline-block w-5 h-5 mr-2"
          />
        </>
      ),
      homeStat: homeTeam.matchDetail.yellowCards,
      awayStat: awayTeam.matchDetail.yellowCards,
    },
    {
      label: (
        <>
          <img
            src="/redcard.png"
            alt="레드카드"
            className="inline-block w-5 h-5 mr-2"
          />
        </>
      ),
      homeStat: homeTeam.matchDetail.redCards,
      awayStat: awayTeam.matchDetail.redCards,
    },
    {
      label: "코너킥",
      homeStat: homeTeam.matchDetail.cornerKick,
      awayStat: awayTeam.matchDetail.cornerKick,
    },
  ];

  return (
    <div className="">
      <p className="text-center mt-5 ">공 점유율</p>
      <div className="flex h-2 rounded-xl overflow-hidden mt-5">
        <div
          style={{
            width: `${homeTeam.matchDetail.possession}%`,
            backgroundColor:
              homeTeam.matchDetail.possession > awayTeam.matchDetail.possession
                ? "#d3171e"
                : "white",
            color:
              homeTeam.matchDetail.possession > awayTeam.matchDetail.possession
                ? "white"
                : "black",
          }}
          className="text-white p-1 text-left pl-7"
        >
          {homeTeam.matchDetail.possession}%
        </div>
        <div
          style={{
            width: `${awayTeam.matchDetail.possession}%`,
            backgroundColor:
              awayTeam.matchDetail.possession > homeTeam.matchDetail.possession
                ? "#d3171e"
                : "white",
            color:
              awayTeam.matchDetail.possession > homeTeam.matchDetail.possession
                ? "white"
                : "black",
          }}
          className="bg-gray-300 p-1 text-right pr-7"
        >
          {awayTeam.matchDetail.possession}%
        </div>
      </div>
      <ul className="mt-5">
        {stats.map(({ label, homeStat, awayStat }, index) => (
          <li key={index} className="flex justify-between items-center p-1">
            <div className="w-[10%] text-center ">{homeStat}</div>
            <span>{label}</span>
            <div className="w-[10%] text-center">{awayStat}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
