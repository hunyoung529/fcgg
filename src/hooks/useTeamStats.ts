// hooks/useTeamStats.ts
import { Match } from "@/utils/matchDetailsConvert";
import { useEffect, useState } from "react";

interface TeamStats {
  averagePossession: number;
  averageGoals: number;
  averageConceded: number;
  averageShotsOnTarget: number;
}

export const useTeamStats = (
  matches: Match[],
  ouid: string | null
): TeamStats | null => {
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);

  useEffect(() => {
    if (!matches || matches.length === 0 || !ouid) return;

    const getUserTeam = (match: Match) =>
      match.matchInfo.find((team) => team.ouid === ouid);

    const getOpponentTeam = (match: Match) =>
      match.matchInfo.find((team) => team.ouid !== ouid);

    let totalPossession = 0;
    let totalGoals = 0;
    let totalConceded = 0;
    let totalShotsOnTarget = 0;

    matches.forEach((match) => {
      const userTeam = getUserTeam(match);
      const opponentTeam = getOpponentTeam(match);

      if (userTeam && opponentTeam) {
        totalPossession += userTeam.matchDetail.possession || 0;
        totalGoals += userTeam.shoot?.goalTotal || 0;
        totalConceded += opponentTeam.shoot?.goalTotal || 0;
        totalShotsOnTarget += userTeam.shoot?.effectiveShootTotal || 0;
      }
    });

    const averagePossession = totalPossession / matches.length;
    const averageGoals = totalGoals / matches.length;
    const averageConceded = totalConceded / matches.length;
    const averageShotsOnTarget = totalShotsOnTarget / matches.length;

    setTeamStats({
      averagePossession,
      averageGoals,
      averageConceded,
      averageShotsOnTarget,
    });
  }, [matches, ouid]);

  return teamStats;
};
