import styled from "styled-components";
import useAuth from "../../Hooks/useAuth";
import Button from "../Button";
import {ImExit} from 'react-icons/im';
import { useNavigate } from "react-router-dom";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: var(--black);
  box-shadow: var(--shadow);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserInfo = styled.div`
  max-width: 85%;
  display: flex; 
  gap: 1rem;
  align-items: center;
`;
const UserImage = styled.img`
  height: 30px;
  border-radius: 50%;
`;
const UserName = styled.h2`
  color: var(--white);
  font-weight: 500;
  font-size: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Footer = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const exit = () => {
    logout();
    navigate('/login');
  }
  return(
    <Container>
      <UserInfo>
        <UserImage src={user?.photoURL || undefined} alt='user image'/>
        <UserName>
          {user?.displayName} 
        </UserName>
      </UserInfo>
        <Button backgroundColor="black" action={exit} style={{width:'fit-content'}}>
          <ImExit fontSize='2rem'/>
        </Button>
    </Container>
  )
}
export default Footer;