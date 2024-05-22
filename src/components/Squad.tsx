import { getMatchTeams } from "@/utils/matchHomeAway";
import { Match } from "../utils/matchDetailsConvert";
import React from "react";
import { getPositionDescription } from "@/utils/positionMapping";
interface SquadProps {
  data: Match;
}

export default function Squad({ data }: SquadProps) {
  const { homeTeam, awayTeam } = getMatchTeams(data);

  const sortedHomeTeamPlayers = [...homeTeam.player].sort(
    (a, b) => a.spPosition - b.spPosition
  );
  const sortedAwayTeamPlayers = [...awayTeam.player].sort(
    (a, b) => a.spPosition - b.spPosition
  );

  return (
    <section className="bg-[url('/bgField.png')] bg-cover bg-center w-full h-[100%] flex my-5">
      <div className="w-2/4 flex flex-col items-start p-4">
        <div className="font-bold mb-2">홈팀</div>
        <ul className="list-disc pl-5">
          {sortedHomeTeamPlayers.map((player, index) => (
            <li key={index}>
              {getPositionDescription(player.spPosition)} ({player.spPosition})
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/4 flex flex-col items-start p-4">
        <div className="font-bold mb-2">어웨이팀</div>
        <ul className="list-disc pl-5">
          {sortedAwayTeamPlayers.map((player, index) => (
            <li key={index}>{getPositionDescription(player.spPosition)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
