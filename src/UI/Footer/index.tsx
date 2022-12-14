import useAuth from "../../Hooks/useAuth";
import Button from "../Button";
import {IoExitOutline} from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import * as C from "./style";
const Footer = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const exit = () => {
    logout();
    navigate('/login');
  }
  return(
    <C.Container>
      <C.UserInfo>
        <C.UserImage src={user?.photoURL || undefined} alt='user image'/>
        <C.UserName>
          {user?.displayName} 
        </C.UserName>
      </C.UserInfo>
        <Button backgroundColor="black" action={exit} style={{width:'fit-content', color: 'var(--white)'}}>
          <IoExitOutline fontSize='2.5rem'/>
        </Button>
    </C.Container>
  )
}
export default Footer;