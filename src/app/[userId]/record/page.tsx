"use client";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MatchList from "@/components/MatchList";
import divisionTypes from "@/data/divisionType.json";
import {
  basicInfoState,
  maxDivisionState,
  matchIdsState,
  matchDetailsState,
  matchTypeState,
  initialDataSelector,
  userIdState,
} from "@/store/appState";
import { IMaxdivision } from "@/utils/matchDetailsConvert";

interface RecordPageProps {
  params: { userId: string };
  searchParams: { matchtype: string };
}

export default function RecordPage({
  params: { userId },
  searchParams: { matchtype },
}: RecordPageProps) {
  const setUserId = useSetRecoilState(userIdState);
  const setMatchType = useSetRecoilState(matchTypeState);
  const setBasicInfo = useSetRecoilState(basicInfoState);
  const setMaxDivision = useSetRecoilState(maxDivisionState);
  const setMatchIds = useSetRecoilState(matchIdsState);
  const setMatchDetails = useSetRecoilState(matchDetailsState);
  const [isLoading, setIsLoading] = useState(true);
  const initialData = useRecoilValue(initialDataSelector);

  useEffect(() => {
    setUserId(userId);
    setMatchType(matchtype);
  }, [userId, matchtype]);

  useEffect(() => {
    if (initialData) {
      setBasicInfo(initialData.basicInfo || {});
      setMaxDivision(initialData.maxDivision || []);
      setMatchIds(initialData.matchIds || []);
      setMatchDetails(initialData.matchDetails || []);
    }
    setIsLoading(false);
  }, [initialData]);
  if (isLoading) {
    return <h2 className="flex justify-center text-2xl mt-4">Loading...</h2>;
  }

  if (!initialData.ouid) {
    return (
      <h2 className="flex justify-center text-2xl mt-4">
        유저 정보를 찾을 수 없습니다. 다시 검색해주세요
      </h2>
    );
  }

  const { basicInfo, maxDivision } = initialData;

  const findItem = maxDivision.find(
    (item: IMaxdivision) => item.matchType === parseInt(matchtype)
  );

  const divisionInfo = divisionTypes.find(
    (dt) => dt.divisionId === findItem?.division
  );
  const divisionName = divisionInfo?.divisionName || "알 수 없는 랭크 타입";
  const divisionIcon = divisionInfo?.icon;
  const achievedDate = findItem?.achievementDate;
  const isValidDate = Date.parse(achievedDate);
  const date = isValidDate ? new Date(achievedDate) : new Date();
  const formattedDate = isValidDate
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    : "날짜 정보 없음";

  return (
    <>
      <section className="bg-[#34495e] rounded max-w-7xl flex items-center justify-between mx-auto p-2">
        <div className="w-30 ml-5">
          <h2 className="text-2xl mb-1">구단주명: {basicInfo.nickname}</h2>
          <p>레벨: {basicInfo.level}</p>
        </div>
        <div className="w-100 flex items-center">
          <div>
            <p className="mb-1">탑 레이팅 - {divisionName}</p>
            <p className="">
              달성일 - {isValidDate ? formattedDate : "날짜 정보 없음"}
            </p>
          </div>
          {divisionIcon && (
            <img src={divisionIcon} className="w-15 h-15 mx-5" />
          )}
        </div>
      </section>
      <MatchList />
    </>
  );
}
