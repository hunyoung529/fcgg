import { atom, atomFamily, selector } from "recoil";
import {
  getOuid,
  getBasicInfo,
  getMaxDivision,
  getMatchList,
  getAllMatchDetails,
} from "@/utils/api";
import { IMaxdivision, Match } from "@/utils/matchDetailsConvert";
import { Player } from "@/utils/matchDetailsConvert";

export const ouidState = atom<string>({
  key: "ouidState",
  default: "",
});

export const userIdState = atom<string>({
  key: "userIdState",
  default: "",
});

export const matchTypeState = atom<string>({
  key: "matchTypeState",
  default: "",
});

export const basicInfoState = atom<any>({
  key: "basicInfoState",
  default: null,
});

export const maxDivisionState = atom<IMaxdivision[]>({
  key: "maxDivisionState",
  default: [],
});

export const matchIdsState = atom<string[]>({
  key: "matchIdsState",
  default: [],
});

export const matchDetailsState = atom<Match[]>({
  key: "matchDetailsState",
  default: [],
});

export const selectedMatchState = atom<number | null>({
  key: "selectedMatchState",
  default: null,
});

export const selectedTabState = atom<string>({
  key: "selectedTabState",
  default: "statistics",
});
export const homePlayersExtendedState = atomFamily<
  Array<
    Player & {
      playerName?: string;
      seasonImg?: string;
      seasonClassName?: string;
    }
  >,
  string
>({
  key: "homePlayersExtendedState",
  default: [],
});

export const awayPlayersExtendedState = atomFamily<
  Array<
    Player & {
      playerName?: string;
      seasonImg?: string;
      seasonClassName?: string;
    }
  >,
  string
>({
  key: "awayPlayersExtendedState",
  default: [],
});

export const initialDataSelector = selector({
  key: "initialDataSelector",
  get: async ({ get }) => {
    const userId = get(userIdState);
    const matchType = get(matchTypeState);
    if (!userId) return;

    try {
      const ouid = await getOuid(userId);
      const basicInfo = await getBasicInfo(ouid);
      const maxDivision = await getMaxDivision(ouid);
      const matchIds = (await getMatchList(matchType, ouid)) || [];
      const matchDetails = (await getAllMatchDetails(matchIds)) || [];

      return {
        ouid,
        basicInfo,
        maxDivision,
        matchIds: Array.isArray(matchIds) ? matchIds : [],
        matchDetails: Array.isArray(matchDetails) ? matchDetails : [],
      };
    } catch (error) {
      console.error("Error fetching initial data:", error);
      return {
        ouid: "",
        basicInfo: null,
        maxDivision: [],
        matchIds: [],
        matchDetails: [],
      };
    }
  },
});
