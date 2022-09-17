import Party from "../../../../Types/Party"
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
            <PartyItem key={party.name}  date={party.date} name={party.name}/>
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