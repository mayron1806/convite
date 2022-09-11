import React, { createContext, useState } from "react";
import Party from "../Types/Party";


type PartyContextProps = {
  party: Party| null,
  setParty: React.Dispatch<React.SetStateAction<Party | null>>
}
export const PartyContext = createContext<PartyContextProps>({} as PartyContextProps);

export const PartyProvider = ({children}: {children: JSX.Element}) => {
  const [party, setParty] = useState<Party | null>(null);
  
  return (
    <PartyContext.Provider value={{party, setParty}}>
      {children}
    </PartyContext.Provider>
  )
}