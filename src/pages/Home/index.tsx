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
import { validatePartyDate, validatePartyName } from "../../Utils/Validation";
import { MAX_PARTY_NAME_SIZE } from "../../config/Party";
import { partyValidation } from "../../services/Party";
import CreateParty from "./components/CreateParty";
import Head from "./components/Head";
import Main from "./components/Main";

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
        <CreateParty closeModal={closeModal}/>
      }
    </C.Container>
  )
}

export default Home;