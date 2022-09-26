import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import { createParty, partyValidation } from "../../../../services/Party";
import Message, { Stats } from "../../../../Types/Message";
import Feedback from "../../../../UI/Feedback";
import Modal from "../../../../UI/Modal";
import * as C from "./style";
type props = {
  closeModal: ()=> void
}
const CreateParty = ({ closeModal }: props) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [message, setMessage] = useState<Message>({message: '', stats: Stats.NONE});
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(!user) return navigate('/login');

    const data = new FormData(e.target as HTMLFormElement);
    const name = data.get("name") as string;
    const date = new Date(data.get('date') as string);
    date.setHours(date.getHours() + (date.getTimezoneOffset() / 60));

    setMessage({stats: Stats.LOADING, message: 'Validando'});
    partyValidation(name, date, user.uid)
    .then(() => {
      setMessage({stats: Stats.LOADING, message: 'Criando festa'});
      // cria festa
      createParty(name, date, user.uid, [])
      .then(()=> {
        setMessage({stats: Stats.SUCCESS, message: 'Festa criada com sucesso!'});
      })
      .catch(e => {
        setMessage({message: (e as Error).message, stats: Stats.ERROR});
      })
    })
    .catch(e => {
      setMessage({message: (e as Error).message, stats: Stats.ERROR});
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
        <Feedback message={message}/>
        <C.Submit value="Criar" />
      </C.Form>
    </Modal>
  )
}
export default CreateParty;