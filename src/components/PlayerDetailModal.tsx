import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { Player } from "@/utils/matchDetailsConvert";
import Image from "next/image";

interface PlayerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
}

function PlayerDetailModal({
  isOpen,
  onClose,
  player,
}: PlayerDetailModalProps) {
  if (!player) return null;

  const pId = player.spId.toString().slice(3);
  const trimmedPId = Number(pId);
  const playerImageUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${trimmedPId}.png`;

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">{player?.playerName}</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col md:flex-row gap-4">
                <Card className="flex-shrink-0">
                  <CardBody className="p-0">
                    <Image
                      src={playerImageUrl || "/default_silhouette_player.png"}
                      alt={player?.playerName || "Unknown Player"}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </CardBody>
                </Card>
                <Card className="flex-grow">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">선수 기록</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold">평점</p>
                        <p>{player?.status.spRating}</p>
                      </div>
                      <div>
                        <p className="font-semibold">골</p>
                        <p>{player?.status.goal}</p>
                      </div>
                      <div>
                        <p className="font-semibold">어시스트</p>
                        <p>{player?.status.assist}</p>
                      </div>
                      <div>
                        <p className="font-semibold">유효 슈팅</p>
                        <p>{player?.status.effectiveShoot}</p>
                      </div>
                      <div>
                        <p className="font-semibold">토탈 슛</p>
                        <p>{player?.status.shoot}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default PlayerDetailModal;
