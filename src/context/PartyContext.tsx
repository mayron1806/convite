import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { getPartyID } from "../services/Party";


type PartyContextProps = {
  partyID: string | null,
  loading: boolean
}
export const PartyContext = createContext<PartyContextProps>({} as PartyContextProps);

export const PartyProvider = ({children}: {children: JSX.Element}) => {
  const [partyID, setPartyID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {user} = useAuth();
  const {name} = useParams();
  
  // pega o id da festa pelo nome e pelo usuario
  useEffect(()=> {
    if(!name || !user) return;

    setLoading(true);
    getPartyID(name, user.uid)
    .then(res=> setPartyID(res))
    .catch(e => console.log(e))
    .finally(()=> setLoading(false))
  }, [user, name]);

  return (
    <PartyContext.Provider value={{partyID, loading}}>
      {children}
    </PartyContext.Provider>
  )
}