import { useEffect, useState } from "react";
import { Match, PlayerMeta, SeasonMeta } from "@/utils/matchDetailsConvert";
import { getPlayerMeta, getSeasonMeta } from "@/utils/api";

interface PlayerStat {
  playerName: string;
  totalGoals: number;
  totalAssists: number;
  totalRating: number;
  totalDribbleSuccess: number;
  appearances: number;
  seasonImg?: string;
  seasonClassName?: string;
}

interface SortedPlayerStats {
  sortedByGoals: PlayerStat[];
  sortedByAssists: PlayerStat[];
  sortedByRating: PlayerStat[];
  sortedByDribbles: PlayerStat[];
}

export const usePlayerStats = (
  matches: Match[],
  ouid: string | null
): SortedPlayerStats | null => {
  const [playerStats, setPlayerStats] = useState<SortedPlayerStats | null>(
    null
  );
  const [playerMetaData, setPlayerMetaData] = useState<PlayerMeta[]>([]);
  const [seasonMetaData, setSeasonMetaData] = useState<SeasonMeta[]>([]);

  useEffect(() => {
    // 클라이언트 환경에서만 메타데이터를 가져오도록
    if (typeof window !== "undefined") {
      const fetchMetaData = async () => {
        try {
          const [playerData, seasonData] = await Promise.all([
            getPlayerMeta(),
            getSeasonMeta(),
          ]);
          setPlayerMetaData(playerData);
          setSeasonMetaData(seasonData);
        } catch (error) {
          console.error("Failed to fetch metadata:", error);
        }
      };

      fetchMetaData();
    }
  }, []);

  useEffect(() => {
    if (
      !matches ||
      matches.length === 0 ||
      !ouid ||
      playerMetaData.length === 0 ||
      seasonMetaData.length === 0
    )
      return;

    const getUserTeam = (match: Match) =>
      match.matchInfo.find((team) => team.ouid === ouid);

    const playerStatsMap: { [spId: number]: PlayerStat } = {};

    matches.forEach((match) => {
      const userTeam = getUserTeam(match);

      if (userTeam) {
        userTeam.player.forEach((player) => {
          const playerMeta = playerMetaData.find(
            (meta) => meta.id === player.spId
          );
          const playerName = playerMeta ? playerMeta.name : "Unknown Player";

          // 시즌 정보를 spId에서 추출
          const seasonId = parseInt(player.spId.toString().slice(0, 3), 10);
          const seasonMeta = seasonMetaData.find(
            (season) => season.seasonId === seasonId
          );
          const seasonImg = seasonMeta ? seasonMeta.seasonImg : undefined;
          const seasonClassName = seasonMeta ? seasonMeta.className : undefined;

          if (!playerStatsMap[player.spId]) {
            playerStatsMap[player.spId] = {
              playerName,
              totalGoals: 0,
              totalAssists: 0,
              totalRating: 0,
              totalDribbleSuccess: 0,
              appearances: 0,
              seasonImg,
              seasonClassName,
            };
          }

          playerStatsMap[player.spId].totalGoals += player.status.goal || 0;
          playerStatsMap[player.spId].totalAssists += player.status.assist || 0;
          playerStatsMap[player.spId].totalRating +=
            player.status.spRating || 0;
          playerStatsMap[player.spId].totalDribbleSuccess +=
            player.status.dribbleSuccess || 0;
          playerStatsMap[player.spId].appearances += 1;
        });
      }
    });

    const statsArray = Object.values(playerStatsMap);

    const sortedByGoals = [...statsArray].sort(
      (a, b) => b.totalGoals - a.totalGoals
    );
    const sortedByAssists = [...statsArray].sort(
      (a, b) => b.totalAssists - a.totalAssists
    );
    const sortedByRating = [...statsArray].sort(
      (a, b) => b.totalRating / b.appearances - a.totalRating / a.appearances
    );
    const sortedByDribbles = [...statsArray].sort(
      (a, b) => b.totalDribbleSuccess - a.totalDribbleSuccess
    );

    setPlayerStats({
      sortedByGoals,
      sortedByAssists,
      sortedByRating,
      sortedByDribbles,
    });
  }, [matches, ouid, playerMetaData, seasonMetaData]);

  return playerStats;
};
