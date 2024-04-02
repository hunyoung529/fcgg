"use client";
import { useRouter } from "next/navigation";

interface MatchListProps {
  selectedMatchType: string;
  userId: string;
}
export default function matchList({
  selectedMatchType,
  userId,
}: MatchListProps) {
  const router = useRouter();

  const selectedMatch = (type: string) => selectedMatchType === type.toString();

  return (
    <div>
      <button
        className={`m-2 p-2 rounded ${
          selectedMatch("50")
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => router.push(`/${userId}/record?matchtype=50`)}
      >
        공식경기
      </button>

      <button
        className={`m-2 p-2 rounded ${
          selectedMatch("52")
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => router.push(`/${userId}/record?matchtype=52`)}
      >
        감독모드
      </button>
    </div>
  );
}
