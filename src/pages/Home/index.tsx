import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Button from "../../UI/Button";
import Header from "../../UI/Header";
import * as C from "./style";
import {GrAddCircle} from 'react-icons/gr';
import Footer from "../../UI/Footer";
import useParty from "../../Hooks/useParty";
import { FormEvent, useEffect, useRef, useState } from "react";
import Party from "../../Types/Party";
import Modal from "../../UI/Modal";
import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { firestore } from "../../services/firebase";
import Participant from "../../Types/Participant";

const Home = () => {
  const { user } = useAuth();
  const { getAllParties } = useParty();

  // parties
  const [parties, setParties] = useState<Party[]>([]);
  const [loadingParties, setLoadingParties] = useState<boolean>(false);
  
  // modal
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = ()=> setModalIsOpen(true);
  const closeModal = ()=> setModalIsOpen(false);
  
  // initial requests
  useEffect(()=> {
    if(user){
      setLoadingParties(true);
      getAllParties(user)
      .then(res=> setParties(res))
      .catch(e=> console.log(e))
      .finally(()=> setLoadingParties(false))
    }
  }, [])

  return(
    <C.Container>
      <Head openModal={openModal}/>
      <Main parties={parties}/>
      <Footer />
      {
        modalIsOpen &&
        <Modal title="Criar festa" closeModal={closeModal}>
          <CreateParty />
        </Modal>
      }
    </C.Container>
  )
}

// HEADER ================================================================
const Head = ({ openModal }: {openModal: ()=> void}) => {
  return(
    <Header>
      <C.SubTitle>Suas festas</C.SubTitle>
      <div>
        <Button 
          backgroundColor="purple" 
          style={{color: 'var(--white)', fontSize: '1.6rem'}}
          action={openModal}
        ><>Criar festa <GrAddCircle fontSize='2rem'/></>
        </Button>
      </div>
    </Header>
  )
}

// MAIN ==================================================================
const Main = ({parties}: {parties: Party[]}) => {
  return(
    <C.Main>
      <C.Table>
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Nome</th>
            <th>Dia da festa</th>
          </tr>
        </thead>
        <tbody>
          {parties.map(party=> (
            <PartyItem key={party.name}  date={party.date} name={party.name}/>
          ))}
        </tbody>
      </C.Table>
    </C.Main>
  )
}

// PARTY ITEM ============================================================
type PartyItemProps = {
  name: string,
  date: Date
}
const PartyItem = ({name, date}: PartyItemProps) => {
  const dateFormated = () => {
    const day = ('00' + date.getDate()).slice(-2);
    const month = ('00' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  return (
    <C.TableItem>
      <td>{name}</td>
      <td style={{textAlign: 'center'}}>{dateFormated()}</td>
    </C.TableItem>
  )
}
const CreateParty = () => {
  const { createParty } = useParty();
  const { user } = useAuth();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(nameRef && nameRef.current){
      if(dateRef && dateRef.current){
        if(!user) return;
        const newParty: Party = {
          name: nameRef.current.value,
          date: dateRef.current.valueAsDate || new Date(),
          ownerID: user.uid
        }
        createParty(newParty);
      }
    }
  }
  return(
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
      <input type="submit" value="Criar" />
    </form>
  )
}
export default Home;