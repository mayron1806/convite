import styled from "styled-components";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: var(--black);
  box-shadow: var(--shadow);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
type props = {
  children: JSX.Element | JSX.Element[] | string
}
const Footer = ({children}: props) => {
  return(
    <Container>
      {children}
    </Container>
  )
}
export default Footer;