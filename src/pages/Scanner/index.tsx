import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {QrReader} from 'react-qr-reader';
import { validateParticipantCode } from '../../services/Participants';
import Message, { Stats } from '../../Types/Message';
import Button from '../../UI/Button';
import Header from '../../UI/Header';
import Feedback from '../../UI/Feedback';
import * as C from './style';
type props = {
  disableScan: () => void
}
const Scanner = ({ disableScan }: props) => {
  const [code, setCode] = useState<string>('');
  const [scanComplete, setScanComplete] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({message: '', stats: Stats.NONE});

  const validate = () => {
    setMessage({message: 'Buscando participante', stats: Stats.LOADING});
    validateParticipantCode(code)
    .then(() => {
      setMessage({message: 'Tudo certo por aqui!', stats: Stats.SUCCESS});
    })
    .catch(e => {
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
          <AiOutlineClose fontSize='2rem'/>
        </Button>
      </Header>
      {
        scanComplete &&
        <QrReader 
          onResult={(result, error)=> {
            if (result) {
              setCode(result.getText());
              setScanComplete(true);
            }
            if (error) {
              console.log(error);  
            }
          }}
          constraints={{facingMode: 'environment'}}
        />
        || 
        <C.Fetching stats={message.stats}>
          <Feedback message={message}/>
        </C.Fetching>
      }
      <p>{code}</p> 
    </C.Container>
  )
}
export default Scanner;