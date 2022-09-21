import Head from "./components/Head";
import * as C from "./style";
import Content from "./components/Content";
import { PartyProvider } from "../../context/PartyContext";
const Party = () => {
  return(
    <PartyProvider>
      <C.Container>
        <Head />
        <Content />
      </C.Container>
    </PartyProvider>

  )
}
export default Party;