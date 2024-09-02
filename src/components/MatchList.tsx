"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MatchDetail from "./MatchDetail";
import { TeamMatchInfo } from "@/utils/matchDetailsConvert";
import { useRecoilState } from "recoil";
import { matchDetailsState } from "@/store/matchDetailsState";

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
  const [visibleMatches, setVisibleMatches] = useState(5);
  const [stateMatchDetails, setStateMatchDetails] =
    useRecoilState(matchDetailsState);
  const loadMoreMatches = () => {
    setVisibleMatches((prevVisible) => prevVisible + 10);
  };

  useEffect(() => {
    // Recoil 상태 초기화
    setStateMatchDetails(matchDetails);
  }, [matchDetails, setStateMatchDetails]);

  const currentMatches = stateMatchDetails.slice(0, visibleMatches);
  console.log(stateMatchDetails, "리코일로 부름");
  return (
    <div className="mx-auto max-w-7xl">
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
      {currentMatches.map((match, index) => (
        <MatchDetail key={index} matchData={match} />
      ))}
      {visibleMatches < matchDetails.length && (
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
