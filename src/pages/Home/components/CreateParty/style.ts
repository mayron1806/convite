import styled, { css, keyframes } from "styled-components";
import { messageTypes } from ".";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const inputStyle = css`
  padding: 1rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  color: var(--white);

`;
export const Input = styled.input`
  ${inputStyle}
  background-color: var(--black);
  box-shadow:inset var(--shadow);
`;
export const Submit = styled.input.attrs({type: 'submit'})`
  ${inputStyle}
  background-color: var(--purple);
  font-weight: 600;
  &:hover{
    filter: brightness(1.5);
  }
`;
const dotAnim = keyframes`
  0%{
    content: '';
  }
  33%{
    content: '.';
  }
  66%{
    content: '..';
  }
  100%{
    content: '...';
  }
`;
const messageFormat = (stats: messageTypes) => {
  switch(stats){
    case 'ERROR':
      return css`
        color: var(--red);
      `;
    case 'SUCCESS':
      return css`
        color: var(--green);
      `;
    case 'LOADING':
      return css`
        color: var(--purple);
        &::after{
          content: '';
          animation: ${dotAnim} 1s infinite;
        }
      `;
  }
}
export const Message = styled.p<{stats: messageTypes}>`
  font-size: 1.6rem;
  ${props => messageFormat(props.stats)}
`;
