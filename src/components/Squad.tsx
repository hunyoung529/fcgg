import React, { useEffect, useState } from "react";
import {
  Player,
  PlayerMeta,
  SeasonMeta,
  TeamMatchInfo,
} from "@/utils/matchDetailsConvert";
import { getPlayerMeta, getSeasonMeta } from "@/utils/api";
import playerCoordinates from "@/utils/squadPosition";
import "../styles/squad.css";

interface SquadProps {
  data: TeamMatchInfo;
}

const shortenName = (name?: string) => {
  if (!name) return "Unknown";
  const parts = name.split(" ");
  return parts.length > 1 ? parts[parts.length - 1] : name;
};

const renderPlayer = (
  player: { spId: number; spPosition: number; playerName?: string },
  index: number,
  team: "home" | "away"
) => {
  const playerImageUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`;

  return (
    <div key={index} className="player">
      <img
        src={playerImageUrl}
        alt={`Player ${player.spId}`}
        onError={(event) => {
          const target = event.target as HTMLImageElement;
          target.src = "/default_silhouette_player.png";
        }}
      />
      <p>{shortenName(player.playerName)}</p>
    </div>
  );
};

export default function Squad({ data }: SquadProps) {
  const { homeTeam, awayTeam } = data;
  console.log(data.homeTeam.player);

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

  const renderCells = () => {
    const cells = [];

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 14; col++) {
        const cellIndex = row * 14 + col;
        cells.push(
          <div className="cell" key={`cell-${cellIndex}`}>
            {homePlayersExtended
              .concat(awayPlayersExtended)
              .map((player, playerIndex) => {
                const position =
                  playerCoordinates[
                    homePlayersExtended.includes(player) ? "home" : "away"
                  ][player.spPosition];
                if (position.order === cellIndex) {
                  return renderPlayer(
                    player,
                    playerIndex,
                    homePlayersExtended.includes(player) ? "home" : "away"
                  );
                }
                return null;
              })}
          </div>
        );
      }
    }

    return cells;
  };

  const renderSubstitutes = (team: "home" | "away") => {
    const players =
      team === "home"
        ? homePlayersExtended.slice(11)
        : awayPlayersExtended.slice(11);
    return players.map((player, index) => (
      <div className="sub-cell" key={index}>
        {renderPlayer(player, index, team)}
      </div>
    ));
  };

  return (
    <section className="squad-container">
      <div className="substitutes-left">{renderSubstitutes("home")}</div>
      <div className="pitch">{renderCells()}</div>
      <div className="substitutes-right">{renderSubstitutes("away")}</div>
    </section>
  );
}
