import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  matchDataState,
  matchActiveState,
  ouidState,
} from "@/store/matchDetailsState";
import Image from "next/image";
import Statistics from "./Statistics";
import DetailedStatistics from "./DetailedStatistics";
import Ratings from "./Ratings";
import Squad from "./Squad";
import { useState } from "react";
import useMatchData from "@/hooks/useMatchData"; // useMatchData 훅을 사용
import MatchEndTypeModal from "./MatchEndTypeModal";

interface MatchDetailProps {
  matchId: string;
}

export default function MatchDetail({ matchId }: MatchDetailProps) {
  const [showModal, setShowModal] = useState(false);
  const matchData = useRecoilValue(matchDataState(matchId)); // matchId로 매치 데이터를 가져옴
  const isActive = useRecoilValue(matchActiveState(matchId)); // 활성화 상태 가져오기
  const setActive = useSetRecoilState(matchActiveState(matchId)); // 활성화 상태 설정 함수
  const [selectedTab, setSelectedTab] = useState("statistics"); // 기본적으로 'statistics' 탭이 선택됨
  const ouid = useRecoilValue(ouidState); // Recoil에서 ouid 값을 가져옴
  // useMatchData 훅으로 데이터를 가져옴
  const { homeTeam, awayTeam, relativeTime, detailedDate, homeIcon, awayIcon } =
    useMatchData(matchData); // matchData를 훅에 전달

  if (!matchData) return null;

  // matchInfo에서 ouid가 일치하는 팀의 matchResult 찾기
  const userTeam = matchData.matchInfo.find((team) => team.ouid === ouid);

  // ouid가 일치하는 팀의 matchResult를 추출
  const matchResult = userTeam ? userTeam.matchDetail.matchResult : "결과 없음";
  const matchEndType = userTeam?.matchDetail.matchEndType;

  // 활성화 상태 토글 함수
  const toggleActive = () => {
    if (matchEndType === 1 || matchEndType === 2) {
      // matchEndType이 1이나 2일 경우 모달을 표시
      setShowModal(true);
    } else {
      setActive((prev: boolean) => !prev); // 활성화 상태를 토글
    }
  };

  // 선택된 탭에 맞는 콘텐츠 렌더링 함수
  const selectedContent = () => {
    switch (selectedTab) {
      case "detailedStatistics":
        return <DetailedStatistics matchId={matchId} />; // 세부 통계 컴포넌트
      case "ratings":
        return <Ratings matchId={matchId} />; // 평점 컴포넌트
      case "squad":
        return <Squad matchId={matchId} />;
      default:
        return <Statistics matchId={matchId} />;
    }
  };

  // matchResult와 matchEndType에 따른 배경색 설정
  const backgroundClass =
    matchEndType === 0
      ? matchResult === "승"
        ? "bg-gradient-to-r from-blue-500 to-blue-400"
        : matchResult === "패"
        ? "bg-gradient-to-r from-red-500 to-red-400"
        : "bg-gradient-to-r from-yellow-400 to-yellow-300"
      : matchEndType === 1
      ? "bg-gradient-to-r from-red-700 to-red-600"
      : "bg-gradient-to-r from-gray-700 to-gray-600";

  // matchEndType이 에 따른 스코어
  const scoreDisplay =
    matchEndType === 0 ? (
      <>
        <span>{homeTeam?.shoot.goalTotal}</span>
        <span className="mx-1 rounded">:</span>
        <span>{awayTeam?.shoot.goalTotal}</span>
      </>
    ) : matchEndType === 1 ? (
      <span>몰수승</span>
    ) : matchEndType === 2 ? (
      <span>몰수패</span>
    ) : null;

  return (
    <>
      <div
        className={`rounded-md ${backgroundClass} my-2 text-white py-1 px-10 min-h-10v flex items-center justify-between w-full`}
      >
        <p className="w-[15%]" title={detailedDate}>
          {relativeTime}
        </p>
        <div className="flex justify-between w-[70%] items-center">
          <div className="flex items-center justify-center gap-1 w-1/4 text-center">
            <span>{homeTeam?.nickname}</span>
            <Image src={homeIcon} alt="Home Icon" width={28} height={28} />
          </div>
          <div className="w-[10%] text-center">{scoreDisplay}</div>
          <div className="flex items-center justify-center gap-1 w-1/4 text-center">
            <span>{awayTeam?.nickname}</span>
            <Image src={awayIcon} alt="Away Icon" width={28} height={28} />
          </div>
        </div>
        <div className="w-[15%] ml-auto text-right">
          <button onClick={toggleActive}>
            {isActive ? "숨기기" : "더보기"}
          </button>
        </div>
      </div>
      <MatchEndTypeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
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
