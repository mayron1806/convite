import { MAX_PARTY_NAME_SIZE } from "../config/Party";
import { nameIsUsed } from "../services/Party";

type SizeParams = {
  value: string | Array<any>,
  min?: number, 
  max: number
}
const Size = ({value, min = 0, max}: SizeParams)=>{
  if(value.length > max || value.length < min){
    return false;
  }
  return true;
}
const Empty = (value: string)=> {
  if(!value || value.trim().length === 0){
    return false;
  }
  return true;
}
export const validatePartyName = async (partyName: string, userID: string) => {
  if(Empty(partyName)){
    throw new Error('empty');
  }
  if(Size({value: partyName, max: MAX_PARTY_NAME_SIZE})){
    throw new Error('size');
  }
  const nameUsed = await nameIsUsed(partyName, userID);
  if(nameUsed){
    throw new Error('used');
  }
}
export const validatePartyDate = (date: Date) => {
  if(date > new Date()){
    return true;
  }
  return false;
}