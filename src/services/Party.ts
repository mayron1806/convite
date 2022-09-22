import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, where, limit, onSnapshot } from "firebase/firestore";
import { MAX_PARTY_NAME_SIZE, MIN_PARTY_NAME_SIZE } from "../config/Party";
import Participant from "../Types/Participant";
import Party from "../Types/Party";
import {firestore as db} from "./firebase";

export const getPartiesByUser = (userID: string, listenner: (parties: Party[]) => void) => {
  const q = query(collection(db, 'parties'), where('ownerID', '==', userID));

  return onSnapshot(q, (snapshot) => {
    const parties = snapshot.docs.map(doc => {
      const timestamp = doc.data().date as Timestamp;
      const date = new Date(timestamp.toDate());
      const party: Party = {
        name : doc.data().name,
        date,
        ownerID: doc.data().ownerID,
        id: doc.id
      };
      return party;
    })
    listenner(parties);
  })
}
export const getPartyID = async (partyName: string, userID: string)=>{
  const q = query(
    collection(db, 'parties'),
    where('ownerID', '==', userID), 
    where('name', '==', partyName), 
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].id;
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
export const createParty = async (name: string, date: Date, ownerID: string, participants?: Participant[]) => {
  try{
    const partyRef = await addDoc(collection(db, 'parties'), {name, date, ownerID});
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
export const partyValidation = async (name: string, date: Date, ownerID: string) => {
  // valida data
  if(!date){
    throw new Error("Data invalida.");
  }
  if(date < new Date()){
    throw new Error("Você não pode fazer uma festa para uma data que já passou.");
  }
  // valida nome
  name = name.trim();
  const minSize = MIN_PARTY_NAME_SIZE;
  const maxSize = MAX_PARTY_NAME_SIZE;
  if(name.length > maxSize || name.length < minSize){
    throw new Error(`O nome da festa deve ter entre ${minSize} e ${maxSize} caracteres.`);
  }
  const isUsed = await nameIsUsed(name, ownerID);
  if(isUsed){
    throw new Error("O nome já está em uso.");
  }
} 