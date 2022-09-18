import { MdOutlineQrCode2 } from "react-icons/md";
import styled from "styled-components";
import Participant from "../../../../Types/Participant";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--white);
  font-size: 1.6rem;
  padding: .5rem;
  padding-left: 0;
  color: var(--white);
  svg{
    font-size: 2rem;
  }
`;
const ParticipantItem = ({participant}: {participant: Participant}) => {
  return(
    <Container>
      {participant.name}
      <MdOutlineQrCode2 />
    </Container>
  );
}
export default ParticipantItem;