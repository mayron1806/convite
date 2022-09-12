import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import Party from "../Types/Party";
import User from "../Types/User";
import {firestore as db} from "./firebase";
export const getPartiesByUser = async (user: User) => {
  try{
    const q = query(collection(db, 'parties'), where('ownerID', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const parties: Party[] = [];
    querySnapshot.forEach(doc => {
      const party = doc.data() as Party;
      const timestamp = doc.data().date as Timestamp;

      party.date = new Date(timestamp.toDate());
      
      parties.push(party);
    })
    return parties; 
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const getPartyByID = async (partyID: string) => {
  try{
    const party = await getDoc(doc(db, 'parties', partyID));
    if(!party.exists()){
      throw new Error('Festa não encontrada');
    }
    return party.data() as Party;
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const createParty = async (party: Party) => {
  try{
    await addDoc(collection(db, 'parties'), party);
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}