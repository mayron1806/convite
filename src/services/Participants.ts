import { query, collection, where, getDocs, limit } from "firebase/firestore";
import Participant from "../Types/Participant";
import { firestore as db } from "./firebase";

const getPartyID = async (partyName: string, userID: string)=>{
  const q = query(
    collection(db, 'parties'), 
    where('ownerID', '==', userID), 
    where('name', '==', partyName), 
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].id;
}
export const GetParticipants = async (partyName: string, userID: string) => {
  try{
    const partyID = await getPartyID(partyName, userID);
    const q = query(collection(db, 'parties', partyID, 'participants'));
    const participants = await getDocs(q);
    return participants.docs.map(participant => {
      return participant.data() as Participant;
    })
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}