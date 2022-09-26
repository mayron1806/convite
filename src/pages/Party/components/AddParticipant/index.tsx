import { FormEvent, useState } from 'react';
import useParty from '../../../../Hooks/useParty';
import { createParticipants } from '../../../../services/Participants';
import Message, { Stats } from '../../../../Types/Message';
import Feedback from '../../../../UI/Feedback';
import Modal from '../../../../UI/Modal';
import * as C from './style';
type props = {
  closeModal: () => void
}
const AddParticipant = ({closeModal}: props) => {
  const { partyID, loading: partyLoading } = useParty();

  const [message, setMessage] = useState<Message>({message: '', stats : Stats.NONE});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if(!partyID) return;

    setMessage({ message: 'Validando', stats: Stats.LOADING });
    const data = new FormData(e.target as HTMLFormElement);
    const participantsString = data.get('participants') as string;
    const participantsArray = participantsString.trim().split(',').map(p => p.trim());

    setMessage({message: `Adicionando participantes`, stats: Stats.LOADING});
    createParticipants(partyID, participantsArray)
    .then(() => {
      setMessage({message: `Participantes adicionados com sucesso.`, stats: Stats.SUCCESS});
    })
    .catch(e => {
      setMessage({message: (e as Error).message, stats: Stats.ERROR})
    })
  }
  return (
    <Modal title='Adicionar participante' closeModal={closeModal}>
      <C.Form onSubmit={handleSubmit}>
        <C.Textarea name='participants' cols={25} rows={5} placeholder='Ex: Jõao da Silva, Maria das Graças...'/>
        <Feedback message={message}/>
        <C.Submit value='Adicionar' disabled={partyLoading}/>
      </C.Form>
    </Modal>
  );
}
export default AddParticipant;