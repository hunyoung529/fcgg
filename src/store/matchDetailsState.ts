import { atomFamily, selectorFamily, atom } from "recoil";
import { TeamMatchInfo } from "@/utils/matchDetailsConvert";

// 전체 매치 데이터를 관리하는 atom
export const matchListState = atom<TeamMatchInfo[]>({
  key: "matchListState",
  default: [],
});

// 특정 matchId에 해당하는 매치 데이터를 가져오는 selectorFamily
export const matchDataState = selectorFamily<TeamMatchInfo | undefined, string>(
  {
    key: "matchDataState",
    get:
      (matchId) =>
      ({ get }) => {
        const matchList = get(matchListState); // 전체 매치 데이터를 가져옴
        return matchList.find((match) => match.matchId === matchId); // 특정 matchId에 해당하는 매치 데이터 찾기
      },
  }
);

// 각 matchId별 활성화 상태를 관리하는 atomFamily
export const matchActiveState = atomFamily<boolean, string>({
  key: "matchActiveState",
  default: false,
});
