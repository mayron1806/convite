import styled from "styled-components";
import bg from '../../../../assets/imgs/party.png';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  img{
    width: 100%;
  }
  ::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%);
    background: linear-gradient(180deg,transparent 10%,var(--black) 90%);
  }
`;
const Background = () => {
  return(
    <Container>
      <img src={bg} alt="" />
    </Container>
  )
}
export default Background;