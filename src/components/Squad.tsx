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
  player: {
    spId: number;
    spPosition: number;
    playerName?: string;
    spRating?: number;
  },
  index: number,
  team: "home" | "away",
  highestRating: number
) => {
  const playerImageUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`;

  // 조건에 따른 클래스 추가
  const ratingClass =
    player.spRating === 0
      ? "rating-black"
      : player.spRating && player.spRating < 5
      ? "rating-red"
      : player.spRating && player.spRating < 7
      ? "rating-orange"
      : player.spRating && player.spRating >= 7
      ? "rating-green"
      : "";

  const isHighestRating = player.spRating === highestRating;

  return (
    <div key={index} className="player">
      <figure>
        <img
          src={playerImageUrl}
          alt={`Player ${player.spId}`}
          onError={(event) => {
            const target = event.target as HTMLImageElement;
            target.src = "/default_silhouette_player.png";
          }}
        />
        <span
          className={`playerRating ${ratingClass} ${
            isHighestRating ? "rating-blue" : ""
          }`}
        >
          {player.spRating}
        </span>
      </figure>

      <p>{shortenName(player.playerName)}</p>
    </div>
  );
};

export default function Squad({ data }: SquadProps) {
  const { homeTeam, awayTeam } = data;

  const [homePlayersExtended, setHomePlayersExtended] = useState<Player[]>([]);
  const [awayPlayersExtended, setAwayPlayersExtended] = useState<Player[]>([]);
  const [highestRating, setHighestRating] = useState<number>(0);

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
              spRating: player.status.spRating,
            };
          })
          .sort((a, b) => a.spPosition - b.spPosition);
      };

      const homePlayers = extendPlayerInfo(homeTeam.player);
      const awayPlayers = extendPlayerInfo(awayTeam.player);

      setHomePlayersExtended(homePlayers);
      setAwayPlayersExtended(awayPlayers);

      const highestHomeRating = Math.max(
        ...homePlayers.map((player) => player.status.spRating || 0)
      );
      const highestAwayRating = Math.max(
        ...awayPlayers.map((player) => player.status.spRating || 0)
      );

      setHighestRating(Math.max(highestHomeRating, highestAwayRating));
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
                    homePlayersExtended.includes(player) ? "home" : "away",
                    highestRating
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
        {renderPlayer(player, index, team, highestRating)}
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
