import { useContext } from "react";
import { PartyContext } from "../context/PartyContext";
const useParty = ()=>{
  const partyContext = useContext(PartyContext);
  return {...partyContext};
}
export default useParty;