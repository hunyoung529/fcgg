"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MatchDetail from "./MatchDetail";
import { TeamMatchInfo } from "@/utils/matchDetailsConvert";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { matchListState } from "@/store/matchDetailsState";

interface MatchListProps {
  selectedMatchType: string;
  userId: string;
  matchDetails: TeamMatchInfo[];
}

export default function MatchList({
  selectedMatchType,
  userId,
  matchDetails,
}: MatchListProps) {
  const router = useRouter();
  const [visibleMatches, setVisibleMatches] = useState(5); // 한 번에 보이는 매치 수
  const setMatchList = useSetRecoilState(matchListState); // 전역 상태에 매치 데이터를 저장하는 함수
  const currentMatches = useRecoilValue(matchListState); // Recoil에서 현재 매치 데이터를 가져옴

  // matchDetails가 변경될 때 Recoil의 matchListState를 업데이트
  useEffect(() => {
    setMatchList(matchDetails);
  }, [matchDetails, setMatchList]);

  // 더 많은 매치를 보여주는 함수
  const loadMoreMatches = () => {
    setVisibleMatches((prevVisible) => prevVisible + 10); // 매치 10개씩 추가로 보여줌
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* 버튼으로 경기 유형을 선택 */}
      <button
        className={`m-2 p-2 rounded ${
          selectedMatchType === "50"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => router.push(`/${userId}/record?matchtype=50`)}
      >
        공식경기
      </button>
      <button
        className={`m-2 p-2 rounded ${
          selectedMatchType === "52"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => router.push(`/${userId}/record?matchtype=52`)}
      >
        감독모드
      </button>

      {/* 현재 보이는 매치들만 렌더링 */}
      {currentMatches.slice(0, visibleMatches).map((match) => (
        <MatchDetail key={match.matchId} matchId={match.matchId} />
      ))}

      {/* 더 보기 버튼 */}
      {visibleMatches < currentMatches.length && (
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
