import { useRecoilValue, useSetRecoilState } from "recoil";
import { matchDataState, matchActiveState } from "@/store/matchDetailsState";
import Image from "next/image";
import Statistics from "./Statistics";
import DetailedStatistics from "./DetailedStatistics";
import Ratings from "./Ratings";
import Squad from "./Squad";
import { useState } from "react";
import useMatchData from "@/hooks/useMatchData"; // useMatchData 훅을 사용

interface MatchDetailProps {
  matchId: string;
}

export default function MatchDetail({ matchId }: MatchDetailProps) {
  const matchData = useRecoilValue(matchDataState(matchId)); // matchId로 매치 데이터를 가져옴
  const isActive = useRecoilValue(matchActiveState(matchId)); // 활성화 상태 가져오기
  const setActive = useSetRecoilState(matchActiveState(matchId)); // 활성화 상태 설정 함수
  const [selectedTab, setSelectedTab] = useState("statistics"); // 기본적으로 'statistics' 탭이 선택됨

  // useMatchData 훅으로 데이터를 가져옴
  const { homeTeam, awayTeam, relativeTime, detailedDate, homeIcon, awayIcon } =
    useMatchData(matchData); // matchData를 훅에 전달

  if (!matchData) return null; // 매치 데이터가 없으면 아무것도 렌더링하지 않음

  // 활성화 상태 토글 함수
  const toggleActive = () => {
    setActive((prev: boolean) => !prev); // 활성화 상태를 토글
  };

  // 선택된 탭에 맞는 콘텐츠 렌더링 함수
  const selectedContent = () => {
    switch (selectedTab) {
      case "detailedStatistics":
        return <DetailedStatistics matchId={matchId} />; // 세부 통계 컴포넌트
      case "ratings":
        return <Ratings matchId={matchId} />; // 평점 컴포넌트
      case "squad":
        return <Squad matchId={matchId} />; // 스쿼드 컴포넌트
      default:
        return <Statistics matchId={matchId} />;
    }
  };

  return (
    <>
      <div className="rounded-md bg-[#66788a] my-2 text-white py-1 px-10 min-h-10v flex items-center justify-between w-full">
        <p className="w-[15%]" title={detailedDate}>
          {relativeTime}
        </p>
        <div className="flex justify-between w-[70%] items-center">
          <span
            className={`p-1 rounded ${
              homeTeam?.matchDetail.matchResult === "승" ? "bg-win" : "bg-lose"
            }`}
          >
            {homeTeam?.matchDetail.matchResult}
          </span>
          <div className="flex items-center justify-center gap-1 w-1/4 text-center">
            <span>{homeTeam?.nickname}</span>
            <Image src={homeIcon} alt="Home Icon" width={28} height={28} />
          </div>
          <div className="w-[10%] text-center">
            <span>{homeTeam?.shoot.goalTotal}</span>
            <span className="mx-1 rounded">:</span>
            <span>{awayTeam?.shoot.goalTotal}</span>
          </div>
          <div className="flex items-center justify-center gap-1 w-1/4 text-center">
            <span>{awayTeam?.nickname}</span>
            <Image src={awayIcon} alt="Away Icon" width={28} height={28} />
          </div>
          <span
            className={`p-1 rounded ${
              awayTeam?.matchDetail.matchResult === "승" ? "bg-win" : "bg-lose"
            }`}
          >
            {awayTeam?.matchDetail.matchResult}
          </span>
        </div>
        <div className="w-[15%] ml-auto text-right">
          <button onClick={toggleActive}>
            {isActive ? "숨기기" : "더보기"}
          </button>
        </div>
      </div>

      {/* 활성화 상태일 경우 상세 정보 표시 */}
      {isActive && (
        <div className="min-h-50v w-full mx-auto text-white bg-black">
          <div className="flex justify-between w-[60%] mx-auto p-4">
            {/* 탭 버튼 */}
            <button onClick={() => setSelectedTab("statistics")}>
              주요통계
            </button>
            <button onClick={() => setSelectedTab("detailedStatistics")}>
              세부통계
            </button>
            <button onClick={() => setSelectedTab("ratings")}>평점</button>
            <button onClick={() => setSelectedTab("squad")}>스쿼드</button>
          </div>
          {/* 선택된 탭의 콘텐츠 렌더링 */}
          {selectedContent()}
        </div>
      )}
    </>
  );
}
