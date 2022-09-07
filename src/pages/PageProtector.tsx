import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PageProtector = ({children}: {children: JSX.Element}) => {
  const auth = useAuth();
  
  if(auth?.isLogged){
    return <>{children}</>
  }
  else{
    return <Navigate to='/login'/>
  }
}
export default PageProtector;