import styled from "styled-components"

const Container = styled.p<{color: 'white' | 'black'}>`
  font-size: 1.6rem;
  text-align: center;
  color: var(--${props => props.color});
`;
type props = {
  children: string | JSX.Element,
  color?: 'white' | 'black'
}
const Paragraph = ({children, color = 'black'}: props) => {
  return(
    <Container color={color}>
      {children}
    </Container>
  )
}
export default Paragraph;