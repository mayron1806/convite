import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useParty from "../../../../Hooks/useParty";
import { DeleteParticipant, UpdateState } from "../../../../services/Participants";
import Participant from "../../../../Types/Participant";
import Button from "../../../../UI/Button";
import * as C from './style';

const ParticipantItem = ({participant}: {participant: Participant}) => {
  const { partyID } = useParty();
  return(
    <C.Container>
      {participant.name}
      <More participant={participant} partyID={partyID || ''}/>
    </C.Container>
  );
}
type props = {
  participant: Participant,
  partyID: string
}
const More = ({participant, partyID}: props) => {
  const [active, setActive] = useState<boolean>(false);

  const deleteParticipant = () => {
    DeleteParticipant(partyID, participant.id)
    .catch(e => console.log(e))
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
          backgroundColor="black" style={{color: 'var(--white)'}}
          action={()=> changePresent(!participant.present)}
        >
          {participant.present ? 'Desmarcar presença' : 'Marcar presença'}
        </Button>
        <Button 
          backgroundColor="black" style={{color: 'var(--white)'}}
        >
          QR Code
        </Button>
        <Button 
          style={{color: 'var(--white)', backgroundColor: 'var(--red)'}}
          action={deleteParticipant}
        >
          Excluir
        </Button>
      </C.Options>
    </C.More>

  )
}
export default ParticipantItem;