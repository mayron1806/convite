import * as PartyServices from "../services/Party";
import Participant from "../Types/Participant";
import Party from "../Types/Party";
import User from "../Types/User";

const useParty = ()=>{
  const getParty = async (partyID: string) => {
    return await PartyServices.getPartyByID(partyID);
  }
  const getAllParties = async (user: User) => {
    return await PartyServices.getPartiesByUser(user)
  }
  const createParty = async (party: Party, participants?: Participant[]) => {
    return await PartyServices.createParty(party, participants);
  }
  
  return {selectParty: getParty, getAllParties, createParty};
}
export default useParty;