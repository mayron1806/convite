import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut as logOut } from "firebase/auth";
import User from "../Types/User";
import { auth } from "./firebase";

export const getCurrentUser = () => {
  try{
    const currentUser = auth.currentUser;
    if(currentUser){
      const user : User = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
      } 
      return user;
    }
    return auth.currentUser;
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const GoogleSignIn = async () => {
  try{
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const FacebookSignIn = async () => {
  try{
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}
export const signOut = async () => {
  try{
    await logOut(auth);
  }
  catch(e){
    throw new Error((e as Error).message);
  }
}