export interface MatchInfo {
  nickname: string;
  matchDetail: {
    seasonId: number;
    matchResult: string;
    matchEndType: number;
    systemPause: number;
    foul: number;
    injury: number;
    redCards: number;
    yellowCards: number;
    dribble: number;
    cornerKick: number;
    possession: number;
    offsideCount: number;
    averageRating: number;
    controller: string;
  };
  shoot: {
    shootTotal: number;
    effectiveShootTotal: number;
    goalTotal: number;
    goalTotalDisplay: number;
    ownGoal: number;
    shootHeading: number;
    goalHeading: number;
    shootFreekick: number;
    goalFreekick: number;
    shootInPenalty: number;
    goalInPenalty: number;
    shootOutPenalty: number;
    goalOutPenalty: number;
    shootPenaltyKick: number;
    goalPenaltyKick: number;
  };
  pass: {
    passTry: number;
    passSuccess: number;
    shortPassTry: number;
    shortPassSuccess: number;
    longPassTry: number;
    longPassSuccess: number;
    bouncingLobPassTry: number;
    bouncingLobPassSuccess: number;
    drivenGroundPassTry: number;
    drivenGroundPassSuccess: number;
    throughPassTry: number;
    throughPassSuccess: number;
    lobbedThroughPassTry: number;
    lobbedThroughPassSuccess: number;
  };
  defence: {
    blockTry: number;
    blockSuccess: number;
    tackleTry: number;
    tackleSuccess: number;
  };
  player: Player[];
}
export interface Status {
  shoot: number;
  effectiveShoot: number;
  assist: number;
  goal: number;
  dribble: number;
  intercept: number;
  defending: number;
  passTry: number;
  passSuccess: number;
  dribbleTry: number;
  dribbleSuccess: number;
  ballPossesionTry: number;
  ballPossesionSuc: number;
  aerialTry: number;
  aerialSuccess: number;
  blockTry: number;
  block: number;
  tackleTry: number;
  tackle: number;
  yellowCards: number;
  redCards: number;
  spRating: number;
}
export interface IMaxdivision {
  matchType: number;
  division: number;
  achievementDate: string;
}
export interface Player {
  spId: number;
  spPosition: number;
  spGrade: number;
  status: Status;
}

export interface Match {
  matchId: string;
  matchDate: string;
  matchType: string;
  matchInfo: MatchInfo[];
  homeTeam: MatchInfo;
  awayTeam: MatchInfo;
}
export interface TeamMatchInfo {
  matchId: string;
  matchDate: string;
  matchType: string;
  matchDetails: MatchInfo[];
  homeTeam: MatchInfo;
  awayTeam: MatchInfo;
}
export const matchDetailsConvert = (match: Match, index: number): MatchInfo => {
  if (
    !match.matchInfo ||
    !Array.isArray(match.matchInfo) ||
    index >= match.matchInfo.length ||
    index < 0
  ) {
    console.error("Invalid index or matchInfo data");
    throw new Error(
      "Invalid index or matchInfo data; please check the input data."
    );
  }
  const { nickname, matchDetail, shoot, pass, defence, player } =
    match.matchInfo[index];
  return {
    player,
    nickname,
    matchDetail,
    shoot,
    pass,
    defence,
  };
};
export interface PlayerMeta {
  id: number;
  name: string;
}

export interface SeasonMeta {
  seasonId: number;
  className: string;
  seasonImg: string;
}
