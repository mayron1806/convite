import { query, collection, deleteDoc, doc, updateDoc, onSnapshot, addDoc, CollectionReference, DocumentData, getDoc } from "firebase/firestore";
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
    listenner(participants);
  });
}
export const createParticipant = async (partyID: string, name: string) => {
  try{
    const p = {
      name: name
    }
    await addDoc(collection(db,'parties', partyID, 'participants'), p);
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const createParticipants = async (partyID: string, names: string[]) => {
  try{
    names.forEach(async name => {
      await addDoc(collection(db,'parties', partyID, 'participants'), {name: name})
    });
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
export const getParticipantCode = (partyID: string, participantID: string) => {
  return (`${partyID}.${participantID}`);
}
export const validateParticipantCode = async (code:string, refPartyID: string) => {
  try{
    const [partyID, participantID] = code.split('.');
    // verifica se o ID da festa está correto
    if(refPartyID === partyID) throw new Error('Ops... Parece que você está na festa errada :(');
    // valida se a sala existe
    const party = await getDoc(doc(db,'parties', partyID));
    if(!party.exists()) throw new Error('Participante invalido.');
    console.log('Festa existe: ', party.exists());
    
    // valida se o participante existe
    const participantDoc = await getDoc(doc(db,'parties', partyID, 'participants', participantID));
    if(!participantDoc.exists()) throw new Error('Participante não encontrado.');
    console.log('Participante existe: ', participantDoc.data());
    
    // valida se o participante já está presente
    if(participantDoc.data().present) throw new Error('O participante ja está presente.');
    console.log('Participante presente: ', participantDoc.data().present);

    // atualiza estado do participante
    await UpdateState(partyID, participantID, true);
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}