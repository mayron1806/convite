import styled from "styled-components"
import Button from "../Button";
import {IoIosCloseCircleOutline} from 'react-icons/io';
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
  gap: 1rem;
  padding-bottom: 2rem;
  color: var(--white);
`;
const Title = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  color: var(--white);
  white-space: nowrap;
`;
const ButtonContent = styled.div`
  color: var(--white);
  font-size: 2.5rem;
`;
type props = {
  children: JSX.Element,
  title?: string,
  closeModal: ()=> void,
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
          <ButtonContent><IoIosCloseCircleOutline /></ButtonContent>
        </Button>
      </Head>
      {children}
    </Container>
  )
}
export default Modal;