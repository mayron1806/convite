import { query, collection, getDocs } from "firebase/firestore";
import Participant from "../Types/Participant";
import { firestore as db } from "./firebase";

export const GetParticipants = async (partyID: string) => {
  try{
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