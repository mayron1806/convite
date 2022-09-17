import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import { MAX_PARTY_NAME_SIZE, MIN_PARTY_NAME_SIZE } from "../config/Party";
import Participant from "../Types/Participant";
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
export const createParty = async (party: Party, participants?: Participant[]) => {
  try{
    const partyRef = await addDoc(collection(db, 'parties'), party);
    // adiciona participantes
    if(participants){
      const partyID = partyRef.id;
      participants.forEach(async participant => {
        await addDoc(collection(db,'parties', partyID, 'participants'), participant);
      })
    }
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
const nameIsUsed = async (partyName: string, userID: string) => {
  try{
    const q = query(collection(db, 'parties'), where('ownerID', '==', userID), where('name', '==', partyName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length !== 0;
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const partyValidation = async (partyToValidate: Party) => {
  // valida data
  if(partyToValidate.date < new Date()){
    throw new Error("Você não pode fazer uma festa para uma data que já passou.");
  }
  // valida nome
  const name = partyToValidate.name.trim();
  const minSize = MIN_PARTY_NAME_SIZE;
  const maxSize = MAX_PARTY_NAME_SIZE;
  if(name.length > maxSize || name.length < minSize){
    throw new Error(`O nome da festa deve ter entre ${minSize} e ${maxSize} caracteres.`);
  }
  const isUsed = await nameIsUsed(name, partyToValidate.ownerID);
  if(isUsed){
    throw new Error("O nome já está em uso.");
  }
} 