import React, { useEffect, useState } from "react";
import { Match, Player } from "../utils/matchDetailsConvert";

interface RatingsProps {
  data: Match;
}

interface PlayerMeta {
  id: number;
  name: string;
}

interface SeasonMeta {
  seasonId: number;
  className: string;
  seasonImg: string;
}

const Static_URL = "https://open.api.nexon.com/static/fconline/meta";

export default function Ratings({ data }: RatingsProps) {
  // 홈팀과 어웨이팀 정보를 분리하여 저장합니다.
  const [homePlayersExtended, setHomePlayersExtended] = useState<
    Array<
      Player & {
        playerName?: string;
        seasonImg?: string;
        seasonClassName?: string;
      }
    >
  >([]);

  const [awayPlayersExtended, setAwayPlayersExtended] = useState<
    Array<
      Player & {
        playerName?: string;
        seasonImg?: string;
        seasonClassName?: string;
      }
    >
  >([]);

  useEffect(() => {
    const fetchPlayerAndSeasonData = async () => {
      const [spidsResponse, seasonsResponse] = await Promise.all([
        fetch(`${Static_URL}/spid.json`).then((res) => res.json()),
        fetch(`${Static_URL}/seasonid.json`).then((res) => res.json()),
      ]);

      const seasons: SeasonMeta[] = seasonsResponse;

      const extendPlayerInfo = (players: Player[]) => {
        return players
          .sort((a, b) => a.spPosition - b.spPosition)
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
          });
      };

      setHomePlayersExtended(extendPlayerInfo(data.homeTeam.player));
      setAwayPlayersExtended(extendPlayerInfo(data.awayTeam.player));
    };

    fetchPlayerAndSeasonData();
  }, [data]);

  return (
    <div className="flex mx-auto justify-between my-5 items-center w-[70%] h-auto">
      <ul className="w-[40%]">
        {homePlayersExtended.map((player, index) => (
          <li key={index} className="flex mb-1 items-center justify-between">
            <img
              src={player.seasonImg}
              alt={player.seasonClassName}
              className=" mr-2 size-6"
            />
            <p className="text-left flex-grow-2">{player.playerName}</p>
            <span className="text-left w-[8%]">{player.status.spRating}</span>
          </li>
        ))}
      </ul>
      <ul className="w-[40%]">
        {awayPlayersExtended.map((player, index) => (
          <li key={index} className="flex mb-1 items-center justify-between">
            <img
              src={player.seasonImg}
              alt={player.seasonClassName}
              className="mr-2 size-6"
            />
            <p className="text-left flex-grow-2">{player.playerName}</p>
            <span className="text-left w-[8%]">{player.status.spRating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
