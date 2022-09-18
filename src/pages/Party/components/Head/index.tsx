import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../UI/Header";
import {IoIosArrowBack} from 'react-icons/io';
import * as C from "./style";

const Head = () => {
  const navigate = useNavigate();
  const {name} = useParams();
  return (
    <Header>
      <C.Head>
        <IoIosArrowBack onClick={() => navigate('/')}/>
        <h2>{name}</h2>
      </C.Head>
    </Header>
  );
}
export default Head;