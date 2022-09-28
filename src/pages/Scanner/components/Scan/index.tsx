import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Message, { Stats } from "../../../../Types/Message";
import Button from "../../../../UI/Button";
import * as C  from './style';
type props = {
  setScanComplete: React.Dispatch<React.SetStateAction<boolean>>,
  validateCode: (code: string) => void,
  disableScan: ()=> void
}
const Scan = ({ setScanComplete, validateCode, disableScan }: props) => {
  const [message, setMessage] = useState<Message>({message: '', stats: Stats.NONE});

  return (
    <C.Container>
      <C.Title>Posicione o QR Code</C.Title>
      <div className="scanner">
        <QrReader 
          onResult={(result, error)=> {
            if (result) {
              setScanComplete(true);
              validateCode(result.getText());
            }
            if (error) {
              setMessage({message: (error as Error).message, stats: Stats.ERROR});
            }
          }}
          constraints={{facingMode: 'environment'}}
        />
      </div>
      <p>{message.message}</p>
      <div className="button">
        <Button action={disableScan}>
          <C.ButtonContent>Voltar</C.ButtonContent>
        </Button>
      </div>
      
    </C.Container>
  )
}
export default Scan;