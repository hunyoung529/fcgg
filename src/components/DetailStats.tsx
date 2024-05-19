interface ShootingStats {
  shootTotal: number;
  effectiveShootTotal: number;
  goalTotal: number;
  goalTotalDisplay: number;
  ownGoal: number;
  shootHeading: number;
  goalHeading: number;
  shootFreekick: number;
  goalFreekick: number;
  shootInPenalty: number;
  goalInPenalty: number;
  shootOutPenalty: number;
  goalOutPenalty: number;
  shootPenaltyKick: number;
  goalPenaltyKick: number;
}

interface ShootStatisticsProps {
  homeStats: ShootingStats;
  awayStats: ShootingStats;
}

interface PassingStats {
  passTry: number;
  passSuccess: number;
  shortPassTry: number;
  shortPassSuccess: number;
  longPassTry: number;
  longPassSuccess: number;
  bouncingLobPassTry: number;
  bouncingLobPassSuccess: number;
  drivenGroundPassTry: number;
  drivenGroundPassSuccess: number;
  throughPassTry: number;
  throughPassSuccess: number;
  lobbedThroughPassTry: number;
  lobbedThroughPassSuccess: number;
}

interface PassStatisticsProps {
  homeStats: PassingStats;
  awayStats: PassingStats;
}

interface OtherStats {
  blockTry: number;
  blockSuccess: number;
  tackleTry: number;
  tackleSuccess: number;
  seasonId: number;
  matchResult: string;
  matchEndType: number;
  systemPause: number;
  foul: number;
  injury: number;
  redCards: number;
  yellowCards: number;
  dribble: number;
  cornerKick: number;
  possession: number;
  offsideCount: number;
  averageRating: number;
  controller: string;
}

interface OtherStatisticsProps {
  homeStats: OtherStats;
  awayStats: OtherStats;
}

function ShootStatistics({ homeStats, awayStats }: ShootStatisticsProps) {
  const shootDetails = [
    {
      label: "전체 슛",
      home: homeStats.shootTotal,
      away: awayStats.shootTotal,
    },
    {
      label: "유효 슛",
      home: homeStats.effectiveShootTotal,
      away: awayStats.effectiveShootTotal,
    },
    { label: "골", home: homeStats.goalTotal, away: awayStats.goalTotal },
    {
      label: "골 표시",
      home: homeStats.goalTotalDisplay,
      away: awayStats.goalTotalDisplay,
    },
    { label: "자책골", home: homeStats.ownGoal, away: awayStats.ownGoal },
    {
      label: "헤딩 골",
      home: homeStats.goalHeading,
      away: awayStats.goalHeading,
    },
    {
      label: "프리킥 골",
      home: homeStats.goalFreekick,
      away: awayStats.goalFreekick,
    },
    {
      label: "페널티킥 골",
      home: homeStats.goalPenaltyKick,
      away: awayStats.goalPenaltyKick,
    },
  ];

  return (
    <div className="mt-5 w-full">
      <ul className="">
        {shootDetails.map((detail, index) => (
          <li key={index} className="flex justify-between items-center p-1">
            <div className="w-[10%] text-center ">{detail.home}</div>
            <span>{detail.label}</span>
            <div className="w-[10%] text-center">{detail.away}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PassStatistics({ homeStats, awayStats }: PassStatisticsProps) {
  const passDetails = [
    { label: "패스 시도", home: homeStats.passTry, away: awayStats.passTry },
    {
      label: "성공한 패스",
      home: homeStats.passSuccess,
      away: awayStats.passSuccess,
    },
    {
      label: "롱 패스 시도",
      home: homeStats.longPassTry,
      away: awayStats.longPassTry,
    },
    {
      label: "성공한 롱 패스",
      home: homeStats.longPassSuccess,
      away: awayStats.longPassSuccess,
    },
    {
      label: "스루 패스 시도",
      home: homeStats.throughPassTry,
      away: awayStats.throughPassTry,
    },
    {
      label: "성공한 스루 패스",
      home: homeStats.throughPassSuccess,
      away: awayStats.throughPassSuccess,
    },
  ];

  return (
    <div className="mt-5 w-full">
      <ul>
        {passDetails.map(({ label, home, away }) => (
          <li key={label} className="flex justify-between items-center p-1">
            <div className="w-[10%] text-center ">{home}</div>
            <span>{label}</span>
            <div className="w-[10%] text-center">{away}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OtherStatistics({ homeStats, awayStats }: OtherStatisticsProps) {
  const otherDetails = [
    {
      label: "태클 시도",
      home: homeStats.tackleTry,
      away: awayStats.tackleTry,
    },
    {
      label: "성공한 태클",
      home: homeStats.tackleSuccess,
      away: awayStats.tackleSuccess,
    },
    { label: "블록 시도", home: homeStats.blockTry, away: awayStats.blockTry },
    {
      label: "성공한 블록",
      home: homeStats.blockSuccess,
      away: awayStats.blockSuccess,
    },
    { label: "드리블", home: homeStats.dribble, away: awayStats.dribble },
    {
      label: "오프사이드",
      home: homeStats.offsideCount,
      away: awayStats.offsideCount,
    },
    { label: "부상", home: homeStats.injury, away: awayStats.injury },
  ];

  return (
    <div className="mt-5 w-full">
      <ul>
        {otherDetails.map(({ label, home, away }) => (
          <li key={label} className="flex justify-between items-center p-1">
            <div className="w-[10%] text-center ">{home}</div>
            <span>{label}</span>
            <div className="w-[10%] text-center">{away}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ShootStatistics, PassStatistics, OtherStatistics };
