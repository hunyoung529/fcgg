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

import { useRecoilValue } from "recoil";
import { matchDataState } from "@/store/matchDetailsState";
import PlayerDetailModal from "./PlayerDetailModal"; // PlayerDetailModal 컴포넌트 불러오기

const shortenName = (name?: string) => {
  if (!name) return "Unknown";
  const parts = name.split(" ");
  return parts.length > 1 ? parts[parts.length - 1] : name;
};

const Squad = ({ matchId }: { matchId: string }) => {
  const [homePlayersExtended, setHomePlayersExtended] = useState<Player[]>([]);
  const [awayPlayersExtended, setAwayPlayersExtended] = useState<Player[]>([]);
  const [highestRating, setHighestRating] = useState<number>(0);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null); // 선택된 선수 정보
  const [isModalOpen, setModalOpen] = useState<boolean>(false); // 모달 상태

  const matchData = useRecoilValue(matchDataState(matchId));

  useEffect(() => {
    if (!matchData) return;

    const { homeTeam, awayTeam } = matchData;

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
  }, [matchData]);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player); // 선택한 선수 정보를 저장
    setModalOpen(true); // 모달 열기
  };

  // 선택된 매치가 없을 경우 처리
  if (!matchData) {
    return <div>선택된 매치가 없습니다.</div>;
  }

  const renderPlayer = (
    player: Player,
    index: number,
    team: "home" | "away",
    highestRating: number
  ) => {
    const pId = player.spId.toString().slice(3);
    const trimmedPId = Number(pId);
    const playerImageUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${trimmedPId}.png`;

    const ratingClass =
      player.status.spRating === 0
        ? "rating-black"
        : player.status.spRating && player.status.spRating < 5
        ? "rating-red"
        : player.status.spRating && player.status.spRating < 7
        ? "rating-orange"
        : player.status.spRating && player.status.spRating >= 7
        ? "rating-green"
        : "";

    const isHighestRating = player.status.spRating === highestRating;

    return (
      <button
        key={index}
        className="player"
        onClick={() => {
          handlePlayerClick(player);
        }}
      >
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
            {player.status.spRating}
          </span>
        </figure>

        <p>{shortenName(player.playerName)}</p>
      </button>
    );
  };

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

      {/* PlayerDetailModal 컴포넌트 불러오기 */}
      {isModalOpen && selectedPlayer && (
        <PlayerDetailModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)} // 모달 닫기
          player={selectedPlayer} // 선택된 선수 데이터 전달
          
        />
      )}
    </section>
  );
};

export default Squad;
