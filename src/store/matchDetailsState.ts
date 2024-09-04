import { atom } from "recoil";
import { TeamMatchInfo } from "@/utils/matchDetailsConvert";

// 모든 매치 데이터를 저장하는 상태
export const matchDetailsState = atom<TeamMatchInfo[]>({
  key: "matchDetailsState",
  default: [], // 초기 상태
});

// 선택된 매치 데이터를 저장하는 상태
export const selectedMatchState = atom<TeamMatchInfo | null>({
  key: "selectedMatchState",
  default: null, // 처음엔 선택된 매치가 없음
});
