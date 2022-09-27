import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useParty from "../../../../Hooks/useParty";
import { DeleteParticipant, UpdateState } from "../../../../services/Participants";
import Participant from "../../../../Types/Participant";
import Button from "../../../../UI/Button";
import * as C from './style';
type props = {
  participant: Participant,
  openQRCode: (participantID: Participant) => void
}
const ParticipantItem = ({participant, openQRCode}: props) => {
  const { partyID } = useParty();
  return(
    <C.Container>
      {participant.name}
      <More 
        participant={participant} 
        partyID={partyID || ''} 
        openQRCode={openQRCode} 
      />
    </C.Container>
  );
}
type moreProps = {
  participant: Participant,
  partyID: string,
  openQRCode: (participant: Participant) => void
}
const More = ({participant, partyID, openQRCode}: moreProps) => {
  const [active, setActive] = useState<boolean>(false);

  const deleteParticipant = () => {
    DeleteParticipant(partyID, participant.id)
    .catch(e => console.log(e))
    setActive(false);
  }
  const openQRCodeModal = () => {
    openQRCode(participant);
    setActive(false);
  }
  const changePresent = (present: boolean) => {
    UpdateState(partyID, participant.id, present)
    .catch(e => console.log(e))
    setActive(false);
  }
  return(
    <C.More>
      <BsThreeDotsVertical onClick={()=> setActive(a => !a)}/>
      <C.Options isActive={active}>
        <Button 
          backgroundColor="black"
          action={()=> changePresent(!participant.present)}
        >
          <C.ButtonContent>{participant.present ? 'Desmarcar presença' : 'Marcar presença'}</C.ButtonContent>
        </Button>
        <Button 
          backgroundColor="black"
          action={openQRCodeModal}
        >
          <C.ButtonContent>QR Code</C.ButtonContent>
        </Button>
        <Button 
          backgroundColor="red"
          action={deleteParticipant}
        >
          <C.ButtonContent>Excluir</C.ButtonContent>
        </Button>
      </C.Options>
    </C.More>

  )
}
export default ParticipantItem;