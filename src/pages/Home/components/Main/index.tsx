import { useNavigate } from "react-router-dom";
import Party from "../../../../Types/Party"
import { dateFormated } from "../../../../Utils/Date";
import * as C from './style';
const Main = ({parties}: {parties: Party[]}) => {
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
          {parties.map(party=> (
            <PartyItem key={party.name} date={party.date} name={party.name}/>
          ))}
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