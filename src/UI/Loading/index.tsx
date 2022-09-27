import { AiOutlineReload } from 'react-icons/ai';
import { CSSProperties } from 'styled-components';
import * as C from './style';
type props = {
  text?: string,
  style?: CSSProperties
}
const Loading = ({text, style}: props) => {
  return(
    <C.Container style={style}>
      <C.Circle>
        <AiOutlineReload />
      </C.Circle>
      {
        text?.trim() &&
        <C.Text>{text}</C.Text>
      }
    </C.Container>
  )
}
export default Loading;