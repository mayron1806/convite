import * as C from './style';
type props = {
  text?: string
}
const Loading = ({text}: props) => {
  return(
    <C.Container>
      <C.Circle />
      {
        text?.trim() &&
        <C.Text>{text}</C.Text>
      }
    </C.Container>
  )
}
export default Loading;