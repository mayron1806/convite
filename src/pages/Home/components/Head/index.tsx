import Button from "../../../../UI/Button"
import Header from "../../../../UI/Header"
import { IoIosAddCircleOutline } from 'react-icons/io';


import styled from "styled-components";
const SubTitle = styled.h2`
  color: var(--white);
  font-weight: 500;
  font-size: 2rem;
`;
const ButtonContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.6rem;
  color: var(--white);
  svg{
    font-size: 2.5rem;
  }
`;
const Head = ({ openModal }: {openModal: ()=> void}) => {
  return(
    <Header>
      <SubTitle>Suas festas</SubTitle>
      <div>
        <Button 
          backgroundColor="purple" 
          action={openModal}
        >
          <ButtonContent>Criar festa <IoIosAddCircleOutline /></ButtonContent>
        </Button>
      </div>
    </Header>
  )
}
export default Head;