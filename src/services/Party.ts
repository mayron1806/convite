import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import Party from "../Types/Party";
import User from "../Types/User";
import {firestore as db} from "./firebase";
export const getParties = async (user: User) => {
  try{

  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const getParty = async (partyID:string) => {
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
export const createParty = async (user: User, party: Party) => {
  try{
    // CRIA PARTY
    const partyRef = await addDoc(collection(db, 'parties'), party);
    
    // ADICIONA USUARIO
    const partyID = partyRef.id;

    // pega a lista de festa do usuario no banco de dados
    const user_db = await getDoc(doc(db, 'users', user.uid));

    // adiciona festa a lista de festas do usuario
    let user_parties: string[] = [];
    if(user_db.exists()){
      user_parties = user_db.data().parties;
    }
    user_parties.push(partyID);

    // salva usuario
    await setDoc(doc(db, 'users', user.uid), {parties: user_parties});
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}