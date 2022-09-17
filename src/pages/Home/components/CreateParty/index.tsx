import { useRef, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useParty from "../../../../Hooks/useParty";
import { partyValidation } from "../../../../services/Party";
import Party from "../../../../Types/Party";
import Modal from "../../../../UI/Modal";

type messageTypes = 'ERROR' | 'SUCCESS' | 'LOADING';
type message = {
  message: string,
  stats: messageTypes
}
type props = {
  closeModal: ()=> void
}
const CreateParty = ({ closeModal }: props) => {
  const navigate = useNavigate();
  const { createParty } = useParty();
  const { user } = useAuth();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<message>({message: '', stats: "ERROR"});
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(!user) return navigate('/login');
    
    // valida formulario
    if(!nameRef || !nameRef.current || !dateRef || !dateRef.current){
      setStatus({
        message: 'Erro no formulário, tente recarregar a pagina.',
        stats: "ERROR"
      })
      return;
    }
    if(!dateRef.current.valueAsDate){
      setStatus({
        message: 'Data invalida.',
        stats: "ERROR"
      })
      return;
    }
    const partyModel: Party = {
      date: dateRef.current.valueAsDate,
      name: nameRef.current.value,
      ownerID: user.uid
    }
    setLoading(true);
    partyValidation(partyModel)
    .then(() => createParty(partyModel))
    .catch(e => {
      setStatus({
        message: (e as Error).message,
        stats: "ERROR"
      })
    })
    .finally(()=> setLoading(false));
  }
  return(
    <Modal title="Criar festa" closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          ref={nameRef}
        />
        <input 
          type="date" 
          placeholder="Data da festa" 
          ref={dateRef}
        />
        {
          loading &&
          <p>carregando...  </p>
        }
        {
          status.message.length > 0 &&
          <p>{status.message}</p>
        }
        <input type="submit" value="Criar" />
      </form>
    </Modal>
  )
}
export default CreateParty;