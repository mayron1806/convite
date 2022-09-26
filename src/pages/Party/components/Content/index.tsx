import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import useParty from '../../../../Hooks/useParty';
import { GetParticipants } from '../../../../services/Participants';
import Participant from '../../../../Types/Participant';
import Button from '../../../../UI/Button';
import ParticipantItem from '../ParticipantItem';
import QRCodeParticipant from '../QRCodeParticipant';
import * as C from './style';
type props = {
  openModal: () => void
  enableScan: () => void
}
const Content = ({ openModal, enableScan }:props) => {
  const { partyID, loading: partyLoading } = useParty();
  const [participantLoading, setParticipantLoading] = useState<boolean>(false);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const presentParticipants = participants.filter(p => p.present);
  const absentParticipants = participants.filter(p => !p.present);

  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [QRCodeModalOpen, setQRCodeModalOpen] = useState<boolean>(false);
  const openQRCodeModal = (participant: Participant) => {
    setCurrentParticipant(participant);
    setQRCodeModalOpen(true);
  }
  const closeQRCodeModal = () => {
    setCurrentParticipant(null);
    setQRCodeModalOpen(false);
  }
  
  // pega participantes da sala
  useEffect(()=> {
    let unsubscribe : Unsubscribe = () => {};
    if(!partyLoading && partyID){
      setParticipantLoading(true);
      unsubscribe = GetParticipants(partyID, (participants) => setParticipants(participants));
      setParticipantLoading(false);
    }
    return () => unsubscribe();
  }, [partyID, partyLoading]);

  // renderiza os participantes
  const renderParticipants = () => {
    const renderParticipant = (p: Participant) => (
      <ParticipantItem participant={p} key={p.id} openQRCode={openQRCodeModal}/>
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
      <ContentHead openModal={openModal}/>
      {
        participantLoading || partyLoading &&
        <p>Aguarde estamos buscando seus convidados</p>
        ||
        renderParticipants()
      }
      {
        QRCodeModalOpen && currentParticipant && partyID &&
        <QRCodeParticipant closeModal={closeQRCodeModal} participant={currentParticipant} partyID={partyID}/>
      }
      <Button backgroundColor='purple' action={enableScan}>
        Scanear QR Code
      </Button>
    </C.Container>
  )
}

const ContentHead = ({ openModal }:{openModal : () => void}) =>{
  return(
      <C.ContentHead>
        <h2 className="title">Convidados</h2>
        <div>
          <Button backgroundColor="purple" action={openModal}>
            <C.ButtonContent>
              Adicionar <IoIosAddCircleOutline />
            </C.ButtonContent>
          </Button>
        </div>
      </C.ContentHead>
  );
}
export default Content;