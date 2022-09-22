import { query, collection, deleteDoc, doc, updateDoc, onSnapshot, addDoc } from "firebase/firestore";
import Participant from "../Types/Participant";
import { firestore as db } from "./firebase";

export const GetParticipants = (partyID: string, listenner: (Participants : Participant[]) => void) => {
  const q = query(collection(db, 'parties', partyID, 'participants'));
  return onSnapshot(q, (snapshot) => {
    const participants = snapshot.docs.map(doc => {
      const p: Participant = {
        name: doc.data().name,
        present: doc.data().present,
        id: doc.id
      };
      return p;
    })
    console.log(participants);
    
    listenner(participants);
  });
}
export const createParticipant = async (partyID: string, name: string) => {
  try{
    await addDoc(collection(db, 'parties', partyID, 'participants'), {name});
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