import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Player } from "@/utils/matchDetailsConvert";
import Image from "next/image";

interface PlayerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
}

interface StatItemProps {
  label: string;
  value: number | string;
}
//스탯 label과 value
const StatItem = ({ label, value }: StatItemProps): JSX.Element => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
  </div>
);

//평점별 백그라운드 색상
const getBackgroundColor = (rating: number): string => {
  if (rating === 0) return "bg-black";
  if (rating <= 5.5) return "bg-amber-700";
  if (rating <= 8) return "bg-green-500";
  return "bg-blue-500";
};
//강화별 백그라운드 글자색
const getGradeColor = (grade: number): string => {
  if (grade === 1) return "bg-gray-700 text-white";
  if (grade >= 2 && grade <= 4) return "bg-orange-600 text-white";
  if (grade >= 5 && grade <= 7) return "bg-gray-400 text-black";
  if (grade >= 8 && grade <= 10) return "bg-yellow-400 text-black";
  return "bg-gray-500 text-white"; // 기본값
};
const PlayerDetailModal = ({
  isOpen,
  onClose,
  player,
}: PlayerDetailModalProps): JSX.Element | null => {
  if (!player) return null;
  const pId = player.spId.toString().slice(3);
  const trimmedPId = Number(pId);
  // spId가 289049072인 경우에는 특별한 URL을 사용
  const playerImageUrl =
    player.spId === 289049072
      ? `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p289049072.png`
      : `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${trimmedPId}.png`;

  const backgroundColorClass = getBackgroundColor(player.status.spRating);

  //드리블 야드 미터로 변환
  const yardToMeter = (yard: number): number => {
    return Math.round(yard * 0.9144 * 10) / 10; // 소수점 첫째 자리까지 반올림
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      size="2xl"
      hideCloseButton
      classNames={{
        body: "p-0",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-4">
              <div className="flex flex-col md:flex-row">
                {/* Left: Player Image and Basic Info */}
                <div
                  className={`md:w-1/3 ${backgroundColorClass} py-6 px-2 rounded-l-lg relative`}
                >
                  {player.seasonImg && (
                    <Image
                      src={player.seasonImg}
                      alt={player.seasonClassName ?? "Season Image"}
                      className="absolute top-[5%] left-[5%]"
                      width={32}
                      height={32}
                    />
                  )}
                  <span
                    className={`top-[5%] right-[5%] absolute font-bold px-2 py-1 rounded-md ${getGradeColor(
                      player.spGrade
                    )}`}
                  >
                    {player.spGrade}
                  </span>
                  <div className="text-center ">
                    <img
                      src={playerImageUrl}
                      alt={player.playerName || "Unknown Player"}
                      onError={(event) => {
                        const target = event.target as HTMLImageElement;
                        target.src = "/default_silhouette_player.png";
                      }}
                      className="object-cover rounded-full mx-auto mb-4 border-4 border-white"
                    />

                    <div className="flex items-center justify-center">
                      <h3 className="text-xl font-bold text-white">
                        {player.playerName}
                      </h3>
                    </div>

                    <p className="text-xl text-white mb-4">
                      평점: {player.status.spRating}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-white">
                      <div>
                        <p className="font-semibold">골</p>
                        <p className="text-2xl">{player.status.goal}</p>
                      </div>
                      <div>
                        <p className="font-semibold">어시스트</p>
                        <p className="text-2xl">{player.status.assist}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Player Stats */}
                <div className="md:w-2/3 bg-gradient-to-b from-gray-100 to-gray-200 p-6 rounded-r-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                    상세 기록
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      {player.spPosition === 0 && (
                        <StatItem
                          label="선방"
                          value={player.status.defending}
                        />
                      )}
                      <StatItem
                        label="슛"
                        value={`${player.status.effectiveShoot} / ${player.status.shoot}`}
                      />
                      <StatItem
                        label="드리블"
                        value={`${player.status.dribbleSuccess} / ${player.status.dribbleTry}`}
                      />
                      <StatItem
                        label="드리블 거리"
                        value={`${yardToMeter(player.status.dribble)} m`}
                      />
                      <StatItem
                        label="패스"
                        value={`${player.status.passSuccess} / ${player.status.passTry}`}
                      />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <StatItem
                        label="공중볼 경합"
                        value={`${player.status.aerialSuccess} / ${player.status.aerialTry}`}
                      />
                      <StatItem
                        label="볼소유"
                        value={`${player.status.ballPossesionSuccess} / ${player.status.ballPossesionTry}`}
                      />
                      <StatItem label="태클" value={player.status.tackle} />
                      <StatItem
                        label="인터셉트"
                        value={player.status.intercept}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                aria-label="닫기"
              >
                닫기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PlayerDetailModal;
