import { FormEvent, useState } from 'react';
import { createParticipant } from '../../../../services/Participants';
import Modal from '../../../../UI/Modal';
import * as C from './style';
type props = {
  closeModal: () => void,
  partyID: string
}
const AddParticipant = ({closeModal, partyID}: props) => {
  const [createdParticipants, setCreatedParticipants] = useState<number>(0);
  const [maxParticipants, setMaxParticipants] = useState<number>(0);
  const [isCreatingParticipants, setIsCreatingParticipants] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const participantsString = data.get('participants') as string;
    const participantsArray = participantsString.trim().split(',').map(p => p.trim());

    setIsCreatingParticipants(true);
    setMaxParticipants(participantsArray.length);
    participantsArray.forEach(async (participant, index) => {
      //await createParticipant(partyID, participant);  
      setCreatedParticipants(index + 1);
    });

  }
  return (
    <Modal title='Adicionar participante' closeModal={closeModal}>
      <C.Form onSubmit={handleSubmit}>

        <C.Textarea name='participants' cols={25} rows={5} placeholder='Ex: Jõao da Silva, Maria das Graças...'/>
        {
          isCreatingParticipants &&
          <p>Adicionando participantes {`${createdParticipants}/${maxParticipants}.`}</p>
        }
        <C.Submit value='Adicionar'/>
      </C.Form>
    </Modal>
  );
}
export default AddParticipant;