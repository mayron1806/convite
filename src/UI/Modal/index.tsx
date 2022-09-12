import styled from "styled-components"
import Button from "../Button";
import {AiOutlineClose} from 'react-icons/ai';
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--black);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: var(--shadow);
`;
const Head = styled.div`  
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  color: var(--white);
`;
type props = {
  children: JSX.Element,
  title?: string,
  closeModal: ()=> void
}
const Modal = ({children, title, closeModal}: props) => {
  return(
    <Container>
      <Head>
        <Title>{title}</Title>
        <Button 
          action={closeModal}
          backgroundColor="black"
          style={{width: 'fit-content'}}
        >
          <AiOutlineClose fontSize='2rem'/>
        </Button>
      </Head>
      {children}
    </Container>
  )
}
export default Modal;