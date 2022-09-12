import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Button from "../../UI/Button";
import Header from "../../UI/Header";
import * as C from "./style";
import {ImExit} from 'react-icons/im';
import {GrAddCircle} from 'react-icons/gr';
import Footer from "../../UI/Footer";
import useParty from "../../Hooks/useParty";
import { useEffect, useState } from "react";
import Party from "../../Types/Party";

const Home = () => {
  const { logout, user } = useAuth();
  const { getAllParties } = useParty();
  const navigate = useNavigate();
  const [parties, setParties] = useState<Party[]>([]);
  const [loadingParties, setLoadingParties] = useState<boolean>(false);
  
  useEffect(()=> {
    if(user){
      setLoadingParties(true);
      getAllParties(user)
      .then(res=> setParties(res))
      .catch(e=> console.log(e))
      .finally(()=> setLoadingParties(false))
    }
  }, [])

  const exit = () => {
    logout();
    navigate('/login');
  }

  return(
    <C.Container>
      <Header>
        <C.SubTitle>Suas festas</C.SubTitle>
        <div>
          <Button 
            backgroundColor="purple" 
            style={{color: 'var(--white)', fontSize: '1.6rem'}}
          >
            <>
              Criar festa
              <GrAddCircle fontSize='2rem'/>
            </>
          </Button>
        </div>
      </Header>
      <C.Main>
        <C.Table>
          <thead>
            <tr>
              <th style={{textAlign: 'left'}}>Nome</th>
              <th>Dia da festa</th>
            </tr>
          </thead>
          <tbody>
            {parties.map(party=> (
              <PartyItem key={party.name}  date={party.date} name={party.name}/>
            ))}
          </tbody>
        </C.Table>
      </C.Main>
      <Footer>
        <C.SubTitle>
          {user?.displayName}
        </C.SubTitle>
        <div>
          <Button backgroundColor="black" action={exit}>
            <ImExit fontSize='2rem'/>
          </Button>
        </div>
      </Footer>
    </C.Container>
  )
}
type PartyItemProps = {
  name: string,
  date: Date
}
const PartyItem = ({name, date}: PartyItemProps) => {
  const dateFormated = () => {
    const day = ('00' + date.getDate()).slice(-2);
    const month = ('00' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  return (
    <C.TableItem>
      <td>{name}</td>
      <td style={{textAlign: 'center'}}>{dateFormated()}</td>
    </C.TableItem>
  )
}
export default Home;