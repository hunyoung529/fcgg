import React, { useEffect } from "react";
import {
  Match,
  Player,
  PlayerMeta,
  SeasonMeta,
} from "@/utils/matchDetailsConvert";
import { getPlayerMeta, getSeasonMeta } from "@/utils/api";
import { useRecoilState } from "recoil";
import {
  homePlayersExtendedState,
  awayPlayersExtendedState,
} from "../store/appState";
import { getMatchTeams } from "@/utils/matchHomeAway";

interface RatingsProps {
  data: Match;
  matchId: string;
}

export default function Ratings({ data, matchId }: RatingsProps) {
  const { homeTeam, awayTeam } = getMatchTeams(data);

  const [homePlayersExtended, setHomePlayersExtended] = useRecoilState(
    homePlayersExtendedState(matchId)
  );
  const [awayPlayersExtended, setAwayPlayersExtended] = useRecoilState(
    awayPlayersExtendedState(matchId)
  );

  useEffect(() => {
    const fetchPlayerAndSeasonData = async () => {
      const [spidsResponse, seasonsResponse] = await Promise.all([
        getPlayerMeta(),
        getSeasonMeta(),
      ]);

      const seasons: SeasonMeta[] = seasonsResponse;

      const extendPlayerInfo = (players: Player[]) => {
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

    if (homePlayersExtended.length === 0 && awayPlayersExtended.length === 0) {
      fetchPlayerAndSeasonData();
    }
  }, [
    homePlayersExtended,
    awayPlayersExtended,
    homeTeam.player,
    awayTeam.player,
    setHomePlayersExtended,
    setAwayPlayersExtended,
  ]);

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
