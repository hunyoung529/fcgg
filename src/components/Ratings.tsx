import React, { useEffect, useState } from "react";
import {
  Player,
  PlayerMeta,
  SeasonMeta,
  TeamMatchInfo,
} from "@/utils/matchDetailsConvert";
import { getPlayerMeta, getSeasonMeta } from "@/utils/api";
import Image from "next/image";

interface RatingsProps {
  data: TeamMatchInfo;
}

export default function Ratings({ data }: RatingsProps) {
  const { homeTeam, awayTeam } = data;

  const [homePlayersExtended, setHomePlayersExtended] = useState<Player[]>([]);
  const [awayPlayersExtended, setAwayPlayersExtended] = useState<Player[]>([]);

  useEffect(() => {
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

      setHomePlayersExtended(extendPlayerInfo(homeTeam.player));
      setAwayPlayersExtended(extendPlayerInfo(awayTeam.player));
    };

    fetchPlayerAndSeasonData();
  }, [homeTeam.player, awayTeam.player]);

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
            <span className="text-left w-[8%]">{player.status.spRating}</span>
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
            <span className="text-left w-[8%]">{player.status.spRating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
