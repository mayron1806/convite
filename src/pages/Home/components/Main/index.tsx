import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import { getPartiesByUser } from "../../../../services/Party";
import Party from "../../../../Types/Party"
import Loading from "../../../../UI/Loading";
import { dateFormated } from "../../../../Utils/Date";
import * as C from './style';
const Main = () => {
  const { user } = useAuth();

  // parties
  const [parties, setParties] = useState<Party[]>([]);
  const [loadingParties, setLoadingParties] = useState<boolean>(false);

  useEffect(()=> {
    if(user){
      setLoadingParties(true);
      getPartiesByUser(user.uid)
      .then(res=> setParties(res))
      .catch(e=> console.log(e))
      .finally(()=> setLoadingParties(false))
    }
  }, [])
   
  return(
    <C.Container>
      <C.Table>
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Nome</th>
            <th>Dia da festa</th>
          </tr>
        </thead>
        <tbody>
          {/*
            !loadingParties &&
            parties.map(party=> (
              <PartyItem key={party.name} date={party.date} name={party.name}/>
            ))*/
          }
          <td colSpan={2}>
            <Loading />
          </td>
        </tbody>
      </C.Table>
      
    </C.Container>
  )
}
export default Main;

type PartyItemProps = {
  name: string,
  date: Date
}
const PartyItem = ({name, date}: PartyItemProps) => {
  const navigate = useNavigate();
  return (
    <C.TableItem onClick={()=> navigate(`/party/${name}`)}>
      <td>{name}</td>
      <td style={{textAlign: 'center'}}>{dateFormated(date)}</td>
    </C.TableItem>
  )
}