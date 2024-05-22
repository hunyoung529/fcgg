import spPositionData from "@/data/sppositionData.json";

interface Position {
  spposition: number;
  desc: string;
}

const positionMapping = (spPositionData as Position[]).reduce(
  (acc, position) => {
    acc[position.spposition] = position.desc;
    return acc;
  },
  {} as Record<number, string>
);

export const getPositionDescription = (spPositionData: number): string => {
  return positionMapping[spPositionData] || "Unknown Position";
};
