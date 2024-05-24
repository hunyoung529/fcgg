import React from "react";
import { useRecoilValue } from "recoil";
import { getMatchTeams } from "@/utils/matchHomeAway";
import { Match } from "../utils/matchDetailsConvert";
import {
  homePlayersExtendedState,
  awayPlayersExtendedState,
} from "../store/appState";

interface SquadProps {
  data: Match;
  matchId: string;
}

interface PositionCoordinates {
  [key: number]: {
    bottom: string;
    left?: string;
    right?: string;
  };
}

// 홈팀 포지션 좌표 설정
const homeTeamCoordinates: PositionCoordinates = {
  0: { bottom: "49%", left: "22%" }, // GK
  1: { bottom: "49%", left: "35%" }, // SW
  2: { bottom: "20%", left: "49%" }, // RWB
  3: { bottom: "20%", left: "45%" }, // RB
  4: { bottom: "35%", left: "40%" }, // RCB
  5: { bottom: "49%", left: "40%" }, // CB
  6: { bottom: "60%", left: "40%" }, // LCB
  7: { bottom: "75%", left: "45%" }, // LB
  8: { bottom: "75%", left: "49%" }, // LWB
  9: { bottom: "35%", left: "55%" }, // RDM
  10: { bottom: "49%", left: "55%" }, // CDM
  11: { bottom: "60%", left: "55%" }, // LDM
  12: { bottom: "20%", left: "70%" }, // RM
  13: { bottom: "35%", left: "65%" }, // RCM
  14: { bottom: "49%", left: "65%" }, // CM
  15: { bottom: "60%", left: "65%" }, // LCM
  16: { bottom: "75%", left: "70%" }, // LM
  17: { bottom: "35%", left: "75%" }, // RAM
  18: { bottom: "49%", left: "75%" }, // CAM
  19: { bottom: "60%", left: "75%" }, // LAM
  20: { bottom: "35%", left: "83%" }, // RF
  21: { bottom: "49%", left: "83%" }, // CF
  22: { bottom: "60%", left: "83%" }, // LF
  23: { bottom: "20%", left: "75%" }, // RW
  24: { bottom: "35%", left: "92%" }, // RS
  25: { bottom: "49%", left: "92%" }, // ST
  26: { bottom: "60%", left: "92%" }, // LS
  27: { bottom: "75%", left: "75%" }, // LW
  28: { bottom: "0%", left: "70%" }, // SUB
};

// 어웨이팀 포지션 좌표 설정
const awayTeamCoordinates: PositionCoordinates = {
  0: { bottom: "49%", right: "22%" }, // GK
  1: { bottom: "49%", right: "35%" }, // SW
  2: { bottom: "75%", right: "50%" }, // RWB
  3: { bottom: "75%", right: "45%" }, // RB
  4: { bottom: "60%", right: "40%" }, // RCB
  5: { bottom: "49%", right: "40%" }, // CB
  6: { bottom: "35%", right: "40%" }, // LCB
  7: { bottom: "20%", right: "45%" }, // LB
  8: { bottom: "20%", right: "50%" }, // LWB
  9: { bottom: "60%", right: "55%" }, // RDM
  10: { bottom: "49%", right: "55%" }, // CDM
  11: { bottom: "35%", right: "55%" }, // LDM
  12: { bottom: "75%", right: "70%" }, // RM
  13: { bottom: "60%", right: "65%" }, // RCM
  14: { bottom: "49%", right: "60%" }, // CM
  15: { bottom: "35%", right: "65%" }, // LCM
  16: { bottom: "20%", right: "70%" }, // LM
  17: { bottom: "60%", right: "75%" }, // RAM
  18: { bottom: "49%", right: "75%" }, // CAM
  19: { bottom: "35%", right: "75%" }, // LAM
  20: { bottom: "60%", right: "83%" }, // RF
  21: { bottom: "49%", right: "83%" }, // CF
  22: { bottom: "35%", right: "83%" }, // LF
  23: { bottom: "75%", right: "75%" }, // RW
  24: { bottom: "60%", right: "90%" }, // RS
  25: { bottom: "49%", right: "92%" }, // ST
  26: { bottom: "35%", right: "90%" }, // LS
  27: { bottom: "20%", right: "75%" }, // LW
  28: { bottom: "0%", right: "70%" }, // SUB
};

const defaultImageUrl = "/default_silhouette_player.png";

const shortenName = (name?: string) => {
  if (!name) return "Unknown";
  const parts = name.split(" ");
  return parts.length > 1 ? parts[parts.length - 1] : name;
};

export default function Squad({ data, matchId }: SquadProps) {
  const homePlayersExtended = useRecoilValue(homePlayersExtendedState(matchId));
  const awayPlayersExtended = useRecoilValue(awayPlayersExtendedState(matchId));

  return (
    <section className="relative flex bg-[url('/bgField.png')] bg-cover bg-[center_right_-9px] w-full h-[600px] my-5">
      <ul className="relative w-1/2 h-full list-none p-0 m-0">
        {homePlayersExtended.map((player, index) => {
          const { bottom, left } = homeTeamCoordinates[player.spPosition];
          const playerImageUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`;
          return (
            <li
              key={index}
              className="absolute text-center"
              style={{ bottom, left }}
            >
              <img
                src={playerImageUrl}
                alt={`Player ${player.spId}`}
                className="w-10 h-10 rounded-full"
                onError={(event) => {
                  const target = event.target as HTMLImageElement;
                  target.src = defaultImageUrl;
                }}
              />
              <p className="mt-1">{shortenName(player.playerName)}</p>
            </li>
          );
        })}
      </ul>
      <ul className="relative w-1/2 h-full list-none p-0 m-0">
        {awayPlayersExtended.map((player, index) => {
          const { bottom, right } = awayTeamCoordinates[player.spPosition];
          const playerImageUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`;

          return (
            <li
              key={index}
              className="absolute text-center"
              style={{ bottom, right }}
            >
              <img
                src={playerImageUrl}
                alt={`Player ${player.spId}`}
                className="w-10 h-10 rounded-full"
                onError={(event) => {
                  const target = event.target as HTMLImageElement;
                  target.src = defaultImageUrl;
                }}
              />
              <p className="mt-1">{shortenName(player.playerName)}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
