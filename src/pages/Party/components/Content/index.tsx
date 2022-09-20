import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import { GetParticipants } from '../../../../services/Participants';
import Participant from '../../../../Types/Participant';
import Button from '../../../../UI/Button';
import ParticipantItem from '../ParticipantItem';
import * as C from './style';

const Content = ({ partyID }: {partyID: string}) => {
  const {user} = useAuth();
  const { name } = useParams();

  const [loading, setLoading] = useState<boolean>(false);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const presentParticipants = participants.filter(p => p.present);
  const absentParticipants = participants.filter(p => !p.present);

  // pega participantes da sala
  useEffect(()=> {
    if(!user || !name){
      return;
    }
    setLoading(true);
    GetParticipants(partyID)
    .then(res => {
      setParticipants(res);
      console.log(res);
    })
    .catch(e=>console.log(e))
    .finally(()=> setLoading(false));
  }, []);

  // renderiza os participantes
  const content = () => {
    const renderParticipant = (p: Participant) => (
      <ParticipantItem participant={p} key={p.id}/>
    )
    if(presentParticipants.length == 0){
      return absentParticipants.map(renderParticipant);
    }
    return (
      <>
        <C.SubTitle>A chegar</C.SubTitle>
        { absentParticipants.map(renderParticipant) }
        <C.SubTitle>Presentes</C.SubTitle>
        { presentParticipants.map(renderParticipant) }
      </>
    )
  }
  return(
    <C.Container>
      <ContentHead />
      {
        loading &&
        <p>Aguarde estamos buscando seus convidados</p>
        ||
        content()
      }
    </C.Container>
  )
}
const ContentHead = ()=>{
  return(
      <C.ContentHead>
        <h2 className="title">Convidados</h2>
        <div>
          <Button backgroundColor="purple">
            <C.ButtonContent>
              Adicionar <IoIosAddCircleOutline />
            </C.ButtonContent>
          </Button>
        </div>
      </C.ContentHead>
  );
}
export default Content;