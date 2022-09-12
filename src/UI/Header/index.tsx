import React from "react";
import styled from "styled-components";
import Logo from "../Logo";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  padding: 1rem;
  box-shadow: var(--shadow);
  margin-bottom: 1.5rem;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
type props = { 
  children: JSX.Element | JSX.Element[],
  contentStyle?: React.CSSProperties
}
const Header = ({children, contentStyle}: props) => {
  return(
    <Container>
      <Logo />
      <Content style={contentStyle}>
        {children}
      </Content>
    </Container>
  )
}
export default Header;