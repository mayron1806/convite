import { getPartiesByUser, getPartyByID } from "../services/Party";
import User from "../Types/User";

const useParty = ()=>{
  const getParty = async (partyID: string) => {
    return await getPartyByID(partyID);
  }
  const getAllParties = async (user: User) => {
    return await getPartiesByUser(user)
  }
  return {selectParty: getParty, getAllParties};
}
export default useParty;