import { useNavigate } from "react-router-dom";
import { firebaseAuthProviders } from "../../context/AuthContext";
import useAuth from "../../Hooks/useAuth";
import Button from "../../UI/Button";
import Paragraph from "../../UI/Paragraph";
import Logo from "../../UI/Logo";
import * as C from './style';
import bg from '../../assets/imgs/party.png';

import facebook from '../../assets/imgs/facebook.png';
import google from '../../assets/imgs/google-logo.png';
const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const signIn = (provider: firebaseAuthProviders) => {
    auth.signIn(provider);
    navigate('/');
  } 
  
  return(
    <C.Container>
      <C.Background>
        <img src={bg} alt="" />
      </C.Background>
      <C.Main>
        <Logo />
        <Paragraph color="white">
          Convide seus amigos para sua festa de uma forma digital.
        </Paragraph>
        <C.Buttons>
          <Button action={() => signIn(firebaseAuthProviders.GOOGLE)}>
            <img src={google} alt="" />
            <Paragraph>Continuar com Google</Paragraph>
          </Button>
          <Button action={() => signIn(firebaseAuthProviders.FACEBOOK)}>
            <img src={facebook} alt="" />
            <Paragraph>Continuar com Facebook</Paragraph>
          </Button>
        </C.Buttons>
      </C.Main>
    </C.Container>
  )
}
export default Login;