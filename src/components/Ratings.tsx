import React, { useEffect, useState } from "react";
import {
  Player,
  PlayerMeta,
  SeasonMeta,
  TeamMatchInfo,
} from "@/utils/matchDetailsConvert";
import { getPlayerMeta, getSeasonMeta } from "@/utils/api";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { matchDataState } from "@/store/matchDetailsState";

export default function Ratings({ matchId }: { matchId: string }) {
  const matchData = useRecoilValue(matchDataState(matchId)); // matchId로 매치 데이터를 가져옴

  // State 초기화
  const [homePlayersExtended, setHomePlayersExtended] = useState<Player[]>([]);
  const [awayPlayersExtended, setAwayPlayersExtended] = useState<Player[]>([]);

  useEffect(() => {
    // 데이터가 없으면 바로 return
    if (!matchData || !matchData.homeTeam || !matchData.awayTeam) return;

    const fetchPlayerAndSeasonData = async () => {
      const [spidsResponse, seasonsResponse] = await Promise.all([
        getPlayerMeta(),
        getSeasonMeta(),
      ]);

      const seasons: SeasonMeta[] = seasonsResponse;

      const extendPlayerInfo = (players: Player[]): Player[] => {
        return players
          .map((player: Player) => {
            const playerMeta = spidsResponse.find(
              (meta: PlayerMeta) => meta.id === player.spId
            );
            const seasonPrefix = player.spId.toString().substring(0, 3);
            const seasonMeta = seasons.find(
              (season) => season.seasonId.toString() === seasonPrefix
            );
            return {
              ...player,
              playerName: playerMeta ? playerMeta.name : undefined,
              seasonImg: seasonMeta ? seasonMeta.seasonImg : undefined,
              seasonClassName: seasonMeta ? seasonMeta.className : undefined,
            };
          })
          .sort((a, b) => a.spPosition - b.spPosition);
      };

      // homeTeam과 awayTeam의 player 정보를 처리
      setHomePlayersExtended(extendPlayerInfo(matchData.homeTeam.player));
      setAwayPlayersExtended(extendPlayerInfo(matchData.awayTeam.player));
    };

    fetchPlayerAndSeasonData();
  }, [matchData]); // data 변경 시에만 effect 실행

  // 선택된 매치가 없을 경우 처리
  if (!matchData) {
    return <div>선택된 매치가 없습니다.</div>;
  }

  return (
    <div className="flex mx-auto justify-between my-5 items-center w-[70%] h-auto">
      <ul className="w-[40%]">
        {homePlayersExtended.map((player, index) => (
          <li key={index} className="flex mb-1 items-center justify-between">
            {player.seasonImg && (
              <Image
                src={player.seasonImg}
                alt={player.seasonClassName ?? "Season Image"}
                className="mr-2 size-6"
                width={24}
                height={24}
              />
            )}
            <p className="text-left flex-grow-2">{player.playerName}</p>
            <span className="text-left w-[8%]">{player.status?.spRating}</span>
          </li>
        ))}
      </ul>
      <ul className="w-[40%]">
        {awayPlayersExtended.map((player, index) => (
          <li key={index} className="flex mb-1 items-center justify-between">
            {player.seasonImg && (
              <Image
                src={player.seasonImg}
                alt={player.seasonClassName ?? "Season Image"}
                className="mr-2 size-6"
                width={24}
                height={24}
              />
            )}
            <p className="text-left flex-grow-2">{player.playerName}</p>
            <span className="text-left w-[8%]">{player.status?.spRating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
