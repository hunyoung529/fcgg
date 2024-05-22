"use client";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { matchTypeState, userIdState } from "@/store/appState";
import MatchDetail from "./MatchDetail";

export default function MatchList() {
  const router = useRouter();
  const selectedMatchType = useRecoilValue(matchTypeState);
  const userId = useRecoilValue(userIdState);

  const handleMatchTypeChange = (type: string) => {
    router.push(`/${userId}/record?matchtype=${type}`);
  };

  return (
    <div className="mx-auto max-w-7xl ">
      <button
        className={`m-2 p-2 rounded ${
          selectedMatchType === "50"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => handleMatchTypeChange("50")}
      >
        공식경기
      </button>
      <button
        className={`m-2 p-2 rounded ${
          selectedMatchType === "52"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => handleMatchTypeChange("52")}
      >
        감독모드
      </button>
      <MatchDetail />
    </div>
  );
}
