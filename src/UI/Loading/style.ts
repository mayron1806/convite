import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  width: 100%;
  svg{
    font-size: 4rem;
  }
`;
const rotateAnim = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;
export const Circle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotateAnim} 1s infinite linear;
`;
export const Text = styled.p`
  font-size: 1.6rem;
  text-align: center;
`;