import Head from "./components/Head";
import * as C from "./style";
import Content from "./components/Content";
import { PartyProvider } from "../../context/PartyContext";
import { useState } from "react";
import AddParticipant from "./components/AddParticipant";
const Party = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () =>  setModalIsOpen(false);
  return(
    <PartyProvider>
      <C.Container>
        <Head />
        <Content openModal={openModal}/>
        {
          modalIsOpen &&
          <AddParticipant closeModal={closeModal}/>
        }
      </C.Container>
    </PartyProvider>

  )
}
export default Party;