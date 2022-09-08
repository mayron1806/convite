import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
type props = {
  children: JSX.Element,
  require_auth?: boolean
}
const PageProtector = ({children, require_auth = true}: props) => {
  const auth = useAuth();
  
  if(auth?.isLogged && !require_auth){
    return <Navigate to='/'/>
  }
  if(!auth?.isLogged && require_auth){
    return <Navigate to='/login'/>
  }
  else{
    return <>{children}</>
  }
}
export default PageProtector;