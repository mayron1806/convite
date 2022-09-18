import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import { GetParticipants } from '../../../../services/Participants';
import Participant from '../../../../Types/Participant';
import Button from '../../../../UI/Button';
import ParticipantItem from '../ParticipantItem';
import * as C from './style';
const Content = () => {
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
    GetParticipants(name, user.uid)
    .then(res => {
      setParticipants(res);
      console.log(res);
    })
    .catch(e=>console.log(e))
    .finally(()=> setLoading(false));
  }, []);

  // renderiza os participantes
  const render = () => {
    if(presentParticipants.length == 0){
      return (
        absentParticipants.map(p => (
          <ParticipantItem participant={p} key={p.name}/>
        ))
      );
    }
    return (
      <>
        <C.SubTitle>A chegar</C.SubTitle>
        {
          absentParticipants.map(p => (
            <ParticipantItem participant={p} key={p.name}/>
          ))
        }
        <C.SubTitle>Presentes</C.SubTitle>
        {
          presentParticipants.map(p=> (
            <ParticipantItem participant={p} key={p.name}/>
          ))
        }
      </>
    )
  }
  return(
    <C.Container>
      <ContentHead />
      {
        !loading &&
        render()
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