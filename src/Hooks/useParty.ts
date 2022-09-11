import { useContext } from "react";
import { PartyContext } from "../context/PartyContext";
import { getParty } from "../services/Party";

const useParty = ()=>{
  const party = useContext(PartyContext);
  const selectParty = (partyID: string) => {
    getParty(partyID)
    .then(res=> {
      party.setParty(res);
    })
    .catch(e=>{
      console.log(e);
    })
  }
  return {getParty: party.party, selectParty};
}
export default useParty;