import Message, { Stats } from "../../../../Types/Message";
import { BiBlock, BiSmile, BiSearch } from 'react-icons/bi';
import * as C from './style';
import Button from "../../../../UI/Button";

type props = {
  message: Message,
  resetScanner: () => void
};
const Result = ({ message: {message, stats}, resetScanner } : props)=> {
  const icon = ()=> {
    switch(stats){
      case Stats.ERROR:
        return <BiBlock />
      case Stats.LOADING:
        return <BiSearch />
      case Stats.SUCCESS:
        return <BiSmile />
    }
  }
  return (
    <C.Container stats={stats}>
      <div className="message">
        <C.Icon>
          {icon()}
        </C.Icon>
        <C.Text>{message}</C.Text>
      </div>
      <div className="button">
      {
        stats !== Stats.NONE && stats !== Stats.LOADING &&
        <Button backgroundColor="white" action={resetScanner}>
          <C.ButtonContent>
            {stats === Stats.ERROR && 'Escanear novamente.'}
            {stats === Stats.SUCCESS && 'Escanear proximo.'}
          </C.ButtonContent>
        </Button>
      }
      </div>
    </C.Container>
  )
}
export default Result;