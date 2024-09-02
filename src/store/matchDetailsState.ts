import { atom } from "recoil";
import { TeamMatchInfo } from "@/utils/matchDetailsConvert";

export const matchDetailsState = atom<TeamMatchInfo[]>({
  key: "matchDetailsState",
  default: [], // 초기 상태
});
