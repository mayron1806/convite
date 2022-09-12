import React, { createContext, useState } from "react";
import Party from "../Types/Party";


type PartyContextProps = {
  party: Party| null,
  setParty: React.Dispatch<React.SetStateAction<Party | null>>,
  parties: Party[] | null,
  setParties: React.Dispatch<React.SetStateAction<Party[] | null>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}
export const PartyContext = createContext<PartyContextProps>({} as PartyContextProps);

export const PartyProvider = ({children}: {children: JSX.Element}) => {
  const [party, setParty] = useState<Party | null>(null);
  const [parties, setParties] = useState<Party[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <PartyContext.Provider value={{party, setParty, loading, setLoading, parties, setParties}}>
      {children}
    </PartyContext.Provider>
  )
}