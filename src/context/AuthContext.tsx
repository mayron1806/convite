import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export enum firebaseAuthProviders {
  GOOGLE,
  FACEBOOK
}
type AuthContextProps = {
  user: User | null,
  isLogged: boolean,
  login: (provider: firebaseAuthProviders, redirectTo?: string) => void,
  logout: (provider: firebaseAuthProviders, redirectTo?: string) =>void 
}
export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  
  useEffect(()=> {
    onAuthStateChanged(auth, (user)=> {
      setUser(user);
      setIsLogged(user !== null);
    });
  }, []);
  
  const login = (provider: firebaseAuthProviders, redirectTo: string = '/') => {

  }
  const logout = (provider: firebaseAuthProviders, redirectTo: string = '/') => {

  }
  return (
    <AuthContext.Provider value={{user, isLogged, login, logout}}>
      {children}
    </AuthContext.Provider>
  );

}