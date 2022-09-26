import Head from "./components/Head";
import * as C from "./style";
import Content from "./components/Content";
import { PartyProvider } from "../../context/PartyContext";
import { useState } from "react";
import AddParticipant from "./components/AddParticipant";
import Scanner from "../Scanner";
const Party = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () =>  setModalIsOpen(false);

  const [scan, setScan] = useState<boolean>(false);
  const enableScan = () => setScan(true);
  const disableScan = () => setScan(false);

  return(
    <PartyProvider>
      {
        !scan &&
          <C.Container>
            <Head />
            <Content openModal={openModal} enableScan={enableScan}/>
            {
              modalIsOpen &&
              <AddParticipant closeModal={closeModal}/>
            }
          </C.Container>
        ||
          <Scanner disableScan={disableScan}/>
      }
    </PartyProvider>
  )
}

export default Party;