import { Match } from "@/utils/matchDetailsConvert";
import React from "react";
interface SquadProps {
  data: Match;
}

export default function Squad({ data }: SquadProps) {
  return (
    <div className="flex justify-center items-center mt-20">준비중입니다</div>
  );
}
