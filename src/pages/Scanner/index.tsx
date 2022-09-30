import { useState } from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import {QrReader} from 'react-qr-reader';
import { validateParticipantCode } from '../../services/Participants';
import Message, { Stats } from '../../Types/Message';
import Button from '../../UI/Button';
import Header from '../../UI/Header';
import Feedback from '../../UI/Feedback';
import * as C from './style';
import Scan from './components/Scan';
import Result from './components/Result';
import useParty from '../../Hooks/useParty';
type props = {
  disableScan: () => void
}
const Scanner = ({ disableScan }: props) => {
  const {partyID} = useParty();
  const [scanComplete, setScanComplete] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({message: '', stats: Stats.NONE});

  const validateCode = (code: string) => {
    if(!partyID){
      setScanComplete(false);
      return;
    }
    setMessage({message: 'Buscando participante', stats: Stats.LOADING});
    validateParticipantCode(code, partyID)
    .then(() => {
      setMessage({message: 'Tudo certo por aqui!', stats: Stats.SUCCESS});
    })
    .catch(e => {
      console.log(e);
      setMessage({message: (e as Error).message, stats: Stats.ERROR});
    })
  }
  return (
    <C.Container>
      <Header>
        <C.Title>Escanear</C.Title>
        <Button 
          action={disableScan}
          backgroundColor="black"
          style={{width: 'fit-content'}}
        >
          <C.Close><IoIosCloseCircleOutline /></C.Close>
        </Button>
      </Header>
      {
        !scanComplete &&
          <Scan setScanComplete={setScanComplete} validateCode={validateCode} disableScan={disableScan}/>
        || 
          <Result message={message} resetScanner={() => setScanComplete(false)} />
        }
    </C.Container>
  )
}
export default Scanner;