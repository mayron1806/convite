import { useNavigate } from "react-router-dom";
import { firebaseAuthProviders } from "../../context/AuthContext";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const signIn = (provider: firebaseAuthProviders) => {
    auth.signIn(provider);
    navigate('/');
  } 
  
  return(
    <div>
      <button 
        onClick={() => signIn(firebaseAuthProviders.GOOGLE)}
      >Google login</button>
      <br />
      <button
        onClick={() => signIn(firebaseAuthProviders.FACEBOOK)}
      >Facabook login</button>
    </div>
  )
}
export default Login;