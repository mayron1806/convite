import { useNavigate } from "react-router-dom";
import { firebaseAuthProviders } from "../../../../context/AuthContext";
import useAuth from "../../../../Hooks/useAuth";
import Button from "../../../../UI/Button";
import Logo from "../../../../UI/Logo";
import Paragraph from "../../../../UI/Paragraph";
import * as C from "./style";

import google from "../../../../assets/imgs/google-logo.png";
import facebook from '../../../../assets/imgs/facebook.png';

const Content = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const signIn = (provider: firebaseAuthProviders) => {
    auth.signIn(provider);
    navigate('/');
  } 
  return(
    <C.Main>
    <Logo />
    <Paragraph color="white">
      Convide seus amigos para sua festa de uma forma digital.
    </Paragraph>
    <C.Buttons>
      <ButtonLogin signIn={signIn} imgURL={google} title='Continuar com Google'/>
      <ButtonLogin signIn={signIn} imgURL={facebook} title='Continuar com Facebook'/>
    </C.Buttons>
  </C.Main>
  )
}
type ButtonLoginProps = {
  signIn: (provider: firebaseAuthProviders) => void,
  imgURL: string,
  title: string
}
const ButtonLogin = ({signIn, imgURL, title}: ButtonLoginProps) => {
  return(
    <Button action={() => signIn(firebaseAuthProviders.GOOGLE)}>
      <img src={imgURL} alt="Imagem botao" />
      <Paragraph>{title}</Paragraph>
    </Button>
  );
}
export default Content;