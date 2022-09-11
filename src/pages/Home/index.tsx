import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { createParty } from "../../services/Party";
import Party from "../../Types/Party";

const Home = () => {
  const {logout, user} = useAuth();
  const navigate = useNavigate();
  const partyName = useRef<HTMLInputElement>(null);
  const partyDate = useRef<HTMLInputElement>(null);
  const exit = ()=> {
    logout();
    navigate('/login');
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if(user && partyDate.current && partyName.current){
      const party: Party = {
        date: new Date(partyDate.current.value),
        name: partyName.current.value,
        ownerID: user.uid,
        participants: []
      }
      createParty(user, party);
    }
  }

  return(
    <div>
      <p>{user?.displayName}</p>
      <button onClick={exit}>Sair</button><br />
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome da festa" 
          ref={partyName}
        />
        <br />
        <input 
          type="date" 
          placeholder="Dia da festa"
          ref={partyDate}
        />
        <br />
        <input type="submit" value="Criar festa"/>
      </form>
    </div>
  )
}
export default Home;