import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = ()=>{
  const auth = useContext(AuthContext);
  return auth;
}
export default useAuth;