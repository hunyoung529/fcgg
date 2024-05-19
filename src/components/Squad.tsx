import { Match } from "../utils/matchDetailsConvert";
import React from "react";
interface SquadProps {
  data: Match;
}

export default function Squad({ data }: SquadProps) {
  data.homeTeam.player[0].status;
  return (
    <div className="flex justify-center items-center mt-20 w-full h-[500px]">
      <div className="bg-[url('/bgField.png')] bg-cover bg-center w-full h-[100%]">
        {data.homeTeam.player[0].spPosition}
      </div>
    </div>
  );
}
