import useAuth from "../../Hooks/useAuth";
import * as C from "./style";
import Footer from "../../UI/Footer";
import { useEffect, useState } from "react";
import Party from "../../Types/Party";
import CreateParty from "./components/CreateParty";
import Head from "./components/Head";
import Main from "./components/Main";
import { getPartiesByUser } from "../../services/Party";

const Home = () => {
  const { user } = useAuth();

  // parties
  const [parties, setParties] = useState<Party[]>([]);
  const [loadingParties, setLoadingParties] = useState<boolean>(false);
  
  // modal
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  // initial requests
  useEffect(()=> {
    if(user){
      setLoadingParties(true);
      getPartiesByUser(user.uid)
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