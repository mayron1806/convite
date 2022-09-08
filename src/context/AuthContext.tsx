import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import * as AuthServices from "../services/Auth";
import User from "../Types/User";

export enum firebaseAuthProviders {
  GOOGLE,
  FACEBOOK
}

type AuthContextProps = {
  user: User | null,
  isLogged: boolean,
  fetchingUser: boolean
  signIn: (provider: firebaseAuthProviders) => void,
  logout: () => void
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User | null>(AuthServices.getCurrentUser());
  const [fetchingUser, setFetchingUser] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(true);
  
  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user)=> {
      let currentUser : User | null= null;
      if(user){
        currentUser = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid
        }
      }
      setUser(currentUser);
      setIsLogged(user !== null);
      setFetchingUser(false);
    });

    return () => unsubscribe();
  }, []);
  
  const signIn = async (provider: firebaseAuthProviders) => {
    try{
      let signInFunction: () => Promise<void>;
      switch(provider){
        case firebaseAuthProviders.FACEBOOK:
          signInFunction = AuthServices.FacebookSignIn;
        break;
        case firebaseAuthProviders.GOOGLE:
          signInFunction = AuthServices.GoogleSignIn;
        break;
      }
      await signInFunction();
    }
    catch(e){
      throw new Error((e as Error).message);
    }
  }
  const logout = async () => {
    try{
      await AuthServices.signOut()
    }
    catch(e){
      throw new Error((e as Error).message);
    }
  }
  return (
    <AuthContext.Provider value={{user, isLogged, signIn, logout, fetchingUser}}>
      {children}
    </AuthContext.Provider>
  );

}