import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  width: 6rem;
  height: 6rem;
  border: 5px solid var(--purple);
  border-radius: 50%;
  position: relative;
  animation: ${rotateAnim} 1s infinite linear;
  ::before{
    content: '';
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border-left: 5rem solid transparent;
    border-right: 5rem solid transparent;
    border-top: 4rem solid var(--black);
    overflow: hidden;
  }
`;
export const Text = styled.p`

`;