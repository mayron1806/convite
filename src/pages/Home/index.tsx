import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import * as C from "./style";
const Home = () => {
  const {logout, user} = useAuth();
  const navigate = useNavigate();
  const exit = ()=> {
    logout();
    navigate('/login');
  }
  return(
    <div>
      <p>{user?.displayName}</p>
      <button onClick={exit}>Sair</button>
    </div>
  )
}
export default Home;