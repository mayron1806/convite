import * as C from "./style";
import Footer from "../../UI/Footer";
import { useState } from "react";
import CreateParty from "./components/CreateParty";
import Head from "./components/Head";
import Main from "./components/Main";

const Home = () => {
  // modal
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  return(
    <C.Container>
      <Head openModal={openModal}/>
      <Main />
      <Footer />
      {
        modalIsOpen &&
        <CreateParty closeModal={closeModal}/>
      }
    </C.Container>
  )
}

export default Home;