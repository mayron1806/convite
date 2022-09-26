import Message, { Stats } from '../../Types/Message';
import * as C from './style';

const Feedback = ({ message }: {message: Message}) => {
  if(message.stats === Stats.NONE){
    return null;
  }
  return (
    <C.Container stats={message.stats}> 
      {message.message}
    </C.Container>
  )
}
export default Feedback;