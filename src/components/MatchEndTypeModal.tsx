import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MatchEndTypeModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      placement="center"
      size="md"
      className="text-black"
    >
      <ModalContent>
        <ModalHeader>
          <h2>알림</h2>
        </ModalHeader>
        <ModalBody>
          <p>몰수 경기는 세부 기록을 볼 수 없습니다.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
