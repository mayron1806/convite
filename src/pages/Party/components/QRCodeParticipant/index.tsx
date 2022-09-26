import QRCode from "react-qr-code";
import { getParticipantCode } from "../../../../services/Participants";
import Participant from "../../../../Types/Participant";
import Button from "../../../../UI/Button";
import Logo from "../../../../UI/Logo";
import Modal from "../../../../UI/Modal";
import * as C from './style';
import domtoimage from 'dom-to-image';
import { useRef } from "react";
type props = {
  closeModal: () => void,
  partyID: string,
  participant: Participant
}
const QRCodeParticipant = ({closeModal, partyID, participant}: props) => {
  const getCode = () => getParticipantCode(partyID, participant.id);
  const inviteRef = useRef<HTMLDivElement | null>(null);

  const downloadImage = () => {
    if(inviteRef && inviteRef.current){
      domtoimage.toPng(inviteRef.current)
      .then(dataURL => {
        const link = document.createElement('a');
        link.download = `${participant.name}.png`;
        link.href = dataURL;
        link.click();
      })
      .catch(e => console.log(e))
    }
  }
  return (
    <Modal closeModal={closeModal}>
      <C.Container>
        <C.Invite ref={inviteRef}>
          <Logo />
          <QRCode value={getCode()} width='100%' height='100%' />
          <C.Name>{participant.name}</C.Name>
        </C.Invite>
        <Button backgroundColor="purple" action={downloadImage}>
          <C.ButtonContainer>Baixar</C.ButtonContainer>
        </Button>
      </C.Container>
    </Modal>
  )
}
export default QRCodeParticipant;