import styled from "styled-components";

const Container = styled.button<{color?: 'white' | 'black'}>`
  padding: 1rem;
  background-color: var(--${props => props.color ? props.color : 'white'});
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  width: 100%;
`;
type props = {
  children: JSX.Element[],
  action?: () => void,
  color?: 'white' | 'black'
}
const Button = ({children, action, color}: props) => {
  return(
    <Container onClick={action} color={color}>
      {children.map(child => child)}
    </Container>
  )
}
export default Button;