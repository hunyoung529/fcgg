"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MatchDetail from "./MatchDetail";
import { TeamMatchInfo } from "@/utils/matchDetailsConvert";

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

  const loadMoreMatches = () => {
    setVisibleMatches((prevVisible) => prevVisible + 10);
  };

  const currentMatches = matchDetails.slice(0, visibleMatches);
  console.log(currentMatches);

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
