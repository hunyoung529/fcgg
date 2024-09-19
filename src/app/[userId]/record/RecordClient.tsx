"use client";
import React, { useEffect, useState } from "react";
import MatchList from "@/components/MatchList";
import { useSetRecoilState } from "recoil";
import {
  matchDetailsConvert,
  TeamMatchInfo,
} from "@/utils/matchDetailsConvert";
import { matchListState, ouidState } from "@/store/matchDetailsState";
import { getAllMatchDetails, getMatchList, getOuid } from "@/utils/api";
import Image from "next/image";
import { formatDate, getTimeDifference } from "@/utils/timeDefference";
import { Button } from "@nextui-org/react";
import { MatchInfo } from "./../../../utils/matchDetailsConvert";

interface RecordClientProps {
  basicInfo: any;
  matchDetails: TeamMatchInfo[]; // SSR에서 변환된 데이터를 전달받음
  matchtype: string;
  userId: string;
  divisionName: string;
  formattedDate: string;
  divisionIcon: string | undefined;
  lastUpdatedTime: Date;
}

export default function RecordClient({
  basicInfo,
  matchDetails,
  matchtype,
  userId,
  divisionName,
  formattedDate,
  divisionIcon,
  lastUpdatedTime, // SSR에서 받은 업데이트 시간
}: RecordClientProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedTime, setUpdatedTime] = useState(lastUpdatedTime); // SSR에서 받은 업데이트 시간으로 초기화
  const setMatchList = useSetRecoilState(matchListState);
  // 5분 동안 버튼을 비활성화하기 위한 상태
  const [refreshDisabled, setRefreshDisabled] = useState(false);
  const setOuid = useSetRecoilState(ouidState); // OUID 상태 설정

  // SSR에서 변환된 데이터를 Recoil 상태에 저장
  useEffect(() => {
    setOuid(basicInfo.ouid); // basicInfo.ouid를 Recoil 상태에 저장
    setMatchList(matchDetails); // SSR에서 받은 matchDetails 설정
  }, [basicInfo.ouid, matchDetails, setMatchList, setOuid]);

  // 전적 갱신 시 데이터를 변환하여 Recoil 상태에 저장
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshDisabled(true); // 버튼 비활성화
    setTimeout(() => setRefreshDisabled(false), 5 * 60 * 1000); // 5분 후 버튼 활성화

    try {
      const matchIds = await getMatchList(matchtype, basicInfo.ouid);
      const newMatchDetails = await getAllMatchDetails(matchIds);

      const transformedMatchDetails: TeamMatchInfo[] = newMatchDetails.reduce(
        (acc, match) => {
          const homeTeam = matchDetailsConvert(match, 0);
          const awayTeam = matchDetailsConvert(match, 1);
          if (homeTeam && awayTeam) {
            acc.push({
              matchId: match.matchId,
              matchDate: match.matchDate,
              matchType: match.matchType,
              matchInfo: match.matchInfo,
              homeTeam,
              awayTeam,
            });
          } else {
            console.error("Failed to convert match data:", match);
          }
          return acc;
        },
        [] as TeamMatchInfo[]
      );

      setMatchList(transformedMatchDetails); // 변환된 데이터를 Recoil 상태에 저장
      setUpdatedTime(new Date()); // 갱신 후 업데이트 시간 갱신
    } catch (error) {
      console.error("데이터 갱신 중 오류 발생:", error);
    } finally {
      setIsRefreshing(false); // 리프레시 완료 후 상태 업데이트
    }
  };

  const relativeTime = updatedTime
    ? getTimeDifference(updatedTime)
    : "업데이트 없음";

  const detailedDate = updatedTime ? formatDate(updatedTime) : "업데이트 없음";

  console.log("레코드 시간전", relativeTime);
  console.log("레코드 시간", detailedDate);
  return (
    <>
      <section className="bg-[#34495e] rounded max-w-7xl flex items-center justify-between mx-auto p-2">
        <div className="w-30 ml-5">
          <h2 className="text-2xl mb-1">구단주명: {basicInfo.nickname}</h2>
          <p>레벨: {basicInfo.level}</p>
          <Button
            color="primary"
            onClick={handleRefresh}
            disabled={isRefreshing || refreshDisabled}
            className={`p-2 rounded my-2 ${
              refreshDisabled ? "bg-gray-500" : "bg-blue-500 text-white"
            }`}
          >
            {isRefreshing ? "갱신 중..." : "전적 갱신"}
          </Button>
          <p className="" title={detailedDate}>
            최근 업데이트: {relativeTime}
          </p>
        </div>
        <div className="w-100 flex items-center">
          <div>
            <p className="mb-1">탑 레이팅 - {divisionName}</p>
            <p>달성일 - {formattedDate}</p>
          </div>
          {divisionIcon && (
            <Image
              src={divisionIcon}
              alt="division icon"
              width={80}
              height={80}
            />
          )}
        </div>
      </section>
      <MatchList selectedMatchType={matchtype} userId={userId} />
    </>
  );
}
