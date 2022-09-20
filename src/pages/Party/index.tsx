import Head from "./components/Head";
import * as C from "./style";
import Content from "./components/Content";
import { useEffect, useState } from 'react';
import { getPartyID } from "../../services/Party";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
const Party = () => {
  const {user} = useAuth();
  const {name} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [partyID, setPartyID] = useState<string>();

  useEffect(()=> {
    if(!name || !user) return;

    setLoading(true);
    getPartyID(name, user.uid)
    .then(res=> setPartyID(res))
    .catch(e => console.log(e))
    .finally(()=> setLoading(false))
  }, []);

  return(
    <C.Container>
      <Head />
      {
        loading && 
          <p>Carregando festa</p>
        || !loading && partyID &&
          <Content partyID={partyID}/>
        || !loading && !partyID &&
          <p>Festa não encontrada</p>
      }
    </C.Container>
  )
}
export default Party;