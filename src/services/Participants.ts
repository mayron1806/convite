import { async } from "@firebase/util";
import { query, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Participant from "../Types/Participant";
import { firestore as db } from "./firebase";

export const GetParticipants = async (partyID: string) => {
  try{
    const q = query(collection(db, 'parties', partyID, 'participants'));
    const participants = await getDocs(q);
    return participants.docs.map(doc => {
      const participant: Participant = {
        name: doc.data().name,
        present: doc.data().present,
        id: doc.id
      };
      return participant;
    })
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const UpdateState = async (partyID: string, participantID: string, present?: boolean) => {
  try{
    await updateDoc(doc(db, 'parties', partyID, 'participants', participantID), {present : present});
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const DeleteParticipant = async (partyID: string, participantID: string) => {
  try{
    await deleteDoc(doc(db, 'parties', partyID, 'participants', participantID));
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}