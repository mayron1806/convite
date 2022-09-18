import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import { createParty, partyValidation } from "../../../../services/Party";
import Modal from "../../../../UI/Modal";
import * as C from "./style";
export type messageTypes = 'ERROR' | 'SUCCESS' | 'LOADING' | 'NONE';
type message = {
  message: string,
  stats: messageTypes
}
type props = {
  closeModal: ()=> void
}
const CreateParty = ({ closeModal }: props) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [status, setStatus] = useState<message>({message: '', stats: "NONE"});
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(!user) return navigate('/login');

    const data = new FormData(e.target as HTMLFormElement);
    const name = data.get("name") as string;
    const date = new Date(data.get('date') as string);
    date.setHours(date.getHours() + (date.getTimezoneOffset() / 60));

    setStatus({stats: 'LOADING', message: 'Validando'});
    partyValidation(name, date, user.uid)
    .then(() => {
      setStatus({stats: 'LOADING', message: 'Criando festa'});
      // cria festa
      createParty(name, date, user.uid, [])
      .then(()=> {
        setStatus({stats: 'SUCCESS', message: 'Festa criada com sucesso!'});
      })
      .catch(e => {
        setStatus({message: (e as Error).message, stats: "ERROR"});
      })
    })
    .catch(e => {
      setStatus({message: (e as Error).message, stats: "ERROR"});
    })
  }
  return(
    <Modal title="Criar festa" closeModal={closeModal}>
      <C.Form onSubmit={handleSubmit}>
        <C.Input  
          type="text" 
          placeholder="Nome" 
          name='name'
        />
        <C.Input 
          type="date" 
          placeholder="Data da festa" 
          name='date'
        />
        {
          status.message.length > 0 && status.stats !== 'NONE' &&
          <C.Message stats={status.stats}>{status.message}</C.Message>
        }
        <C.Submit value="Criar" />
      </C.Form>
    </Modal>
  )
}
export default CreateParty;