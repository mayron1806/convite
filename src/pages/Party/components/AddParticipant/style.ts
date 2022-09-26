import styled, { css, keyframes } from "styled-components";

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
export const Textarea = styled.textarea`
  ${inputStyle}
  background-color: var(--black);
  box-shadow:inset var(--shadow);
  font-size: 1.6rem;
`;
export const Submit = styled.input.attrs({type: 'submit'})`
  ${inputStyle}
  background-color: var(--purple);
  font-weight: 600;
  &:hover{
    filter: brightness(1.5);
  }
`;