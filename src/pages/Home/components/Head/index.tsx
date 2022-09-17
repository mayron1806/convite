import Button from "../../../../UI/Button"
import Header from "../../../../UI/Header"
import { GrAddCircle } from 'react-icons/gr';

import styled from "styled-components";
export const SubTitle = styled.h2`
  color: var(--white);
  font-weight: 500;
  font-size: 2rem;
`;

const Head = ({ openModal }: {openModal: ()=> void}) => {
  return(
    <Header>
      <SubTitle>Suas festas</SubTitle>
      <div>
        <Button 
          backgroundColor="purple" 
          style={{color: 'var(--white)', fontSize: '1.6rem'}}
          action={openModal}
        ><>Criar festa <GrAddCircle fontSize='2rem'/></>
        </Button>
      </div>
    </Header>
  )
}
export default Head;