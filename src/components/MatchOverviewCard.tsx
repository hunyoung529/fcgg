"use client";
import { matchListState, ouidState } from "@/store/matchDetailsState";
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import ReactApexChart from "react-apexcharts";
import { useTeamStats } from "@/hooks/useTeamStats";
import { usePlayerStats } from "@/hooks/usePlayerStats";
import { Player } from "@/utils/matchDetailsConvert";
import Image from "next/image";

interface Team {
  ouid: string;
  matchDetail: {
    possession: number;
    matchResult: string;
    seasonId: number;
    matchEndType: number;
    foul: number;
    cornerKick: number;
  };
  shoot: {
    goalTotal: number;
    effectiveShootTotal: number;
  };
  player: Player[];
}
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
interface PlayerStatItemProps {
  label: string;
  player?: PlayerStat;
  value: string;
}
interface Match {
  matchInfo: Team[];
}

export default function MatchOverviewCard() {
  const matchList = useRecoilValue(matchListState);
  const ouid = useRecoilValue(ouidState);

  const [winRate, setWinRate] = useState<number>(0);
  const [resultCount, setResultCount] = useState<{
    wins: number;
    draws: number;
    losses: number;
  }>({ wins: 0, draws: 0, losses: 0 });

  // 최근 20경기 추출
  const recentMatches = useMemo(() => matchList.slice(0, 20), [matchList]);

  // 팀, 선수 기록 커스텀 훅 사용
  const teamStats = useTeamStats(recentMatches, ouid);
  const playerStats = usePlayerStats(recentMatches, ouid);

  useEffect(() => {
    if (!ouid || recentMatches.length === 0) return;

    const getUserTeam = (match: Match) =>
      match.matchInfo.find((team: Team) => team.ouid === ouid);

    // 승, 무, 패 카운트
    const results = recentMatches.reduce(
      (count, match) => {
        const userTeam = getUserTeam(match);
        if (userTeam) {
          switch (userTeam.matchDetail.matchResult) {
            case "승":
              count.wins += 1;
              break;
            case "무":
              count.draws += 1;
              break;
            case "패":
              count.losses += 1;
              break;
          }
        }
        return count;
      },
      { wins: 0, draws: 0, losses: 0 }
    );

    setResultCount(results);

    const calculatedWinRate =
      recentMatches.length > 0
        ? (results.wins / recentMatches.length) * 100
        : 0;

    setWinRate(calculatedWinRate);
  }, [recentMatches, ouid]);

  const winRateValue = isNaN(winRate) ? 0 : winRate;
  // 승률 도넛차트 옵션
  const chartOptions = {
    chart: {
      type: "donut" as const,
    },
    labels: ["승리", "무승부", "패배"],
    colors: ["#3B82F6", "#FACC15", "#EF4444"],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            value: {
              color: "#FFFFFF",
            },
            total: {
              show: true,
              label: "평균 승률",
              color: "#FFFFFF",
              formatter: () => `${winRateValue}%`,
            },
          },
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["#FFFFFF"],
      },
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
    tooltip: {
      theme: "dark",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const chartSeries = [
    isNaN(resultCount.wins) ? 0 : resultCount.wins,
    isNaN(resultCount.draws) ? 0 : resultCount.draws,
    isNaN(resultCount.losses) ? 0 : resultCount.losses,
  ];

  const PlayerStatItem = ({ label, player, value }: PlayerStatItemProps) => (
    <div>
      <p className="font-semibold flex items-center">
        {label}:
        {player?.seasonImg && (
          <Image
            src={player.seasonImg}
            alt={player.seasonClassName ?? "Season Image"}
            width={24}
            height={24}
            className="ml-2 mr-1"
          />
        )}
        <span>
          {player?.playerName ?? "없음"} {value}
        </span>
      </p>
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full  p-4">
      <Card className="bg-[#1F1F1F] text-white">
        <CardBody>
          <h2 className="text-xl font-bold mb-4">최근 20경기 승률</h2>
          {winRate > 0 ? (
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={250}
            />
          ) : (
            <p>데이터가 없습니다.</p>
          )}
        </CardBody>
      </Card>

      <Card className="bg-[#1F1F1F] text-white">
        <CardBody>
          <h2 className="text-xl font-bold mb-4">최근 20경기 팀 기록</h2>
          {teamStats ? (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">
                  평균 볼 점유율:{" "}
                  <span>{teamStats.averagePossession.toFixed(1)}%</span>
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  경기당 평균 득점:
                  <span>{teamStats.averageGoals.toFixed(2)}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  경기당 평균 실점:{" "}
                  <span>{teamStats.averageConceded.toFixed(2)}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  경기당 유효 슈팅:{" "}
                  <span>{teamStats.averageShotsOnTarget.toFixed(2)}</span>
                </p>
              </div>
            </div>
          ) : (
            <p>팀 기록을 불러오는 중입니다...</p>
          )}
        </CardBody>
      </Card>

      <Card className="bg-[#1F1F1F] text-white">
        <CardBody>
          <h2 className="text-xl font-bold mb-4">최근 20경기 선수 기록</h2>
          {playerStats ? (
            <div className="space-y-4">
              <PlayerStatItem
                label="최다 득점"
                player={playerStats.sortedByGoals[0]}
                value={`${playerStats.sortedByGoals[0]?.totalGoals ?? 0} 골`}
              />
              <PlayerStatItem
                label="최다 어시스트"
                player={playerStats.sortedByAssists[0]}
                value={`${
                  playerStats.sortedByAssists[0]?.totalAssists ?? 0
                } 어시스트`}
              />
              <PlayerStatItem
                label="최고 평점"
                player={playerStats.sortedByRating[0]}
                value={`${(
                  (playerStats.sortedByRating[0]?.totalRating ?? 0) /
                  (playerStats.sortedByRating[0]?.appearances ?? 1)
                ).toFixed(2)}점`}
              />
              <PlayerStatItem
                label="최다 드리블 성공"
                player={playerStats.sortedByDribbles[0]}
                value={`${
                  playerStats.sortedByDribbles[0]?.totalDribbleSuccess ?? 0
                }회`}
              />
            </div>
          ) : (
            <p>선수 기록을 불러오는 중입니다...</p>
          )}
        </CardBody>
      </Card>
    </section>
  );
}
