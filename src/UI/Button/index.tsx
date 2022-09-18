import React from "react";
import styled from "styled-components";

const Container = styled.button<{backgroundColor?: 'white' | 'black' | 'purple'}>`
  padding: 0.5rem 1rem;
  background-color: var(--${props => props.backgroundColor ? props.backgroundColor : 'white'});
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  width: 100%;
`;
type props = {
  children: JSX.Element[] | JSX.Element | string,
  action?: () => void,
  backgroundColor?: 'white' | 'black' | 'purple',
  style?: React.CSSProperties
}
const Button = ({children, action, backgroundColor, style}: props) => {
  return(
    <Container 
      style={style}
      onClick={action}
      backgroundColor={backgroundColor}
    >
      {children}
    </Container>
  )
}
export default Button;