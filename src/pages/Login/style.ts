import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--black);
  height: 100%;
  gap: 5rem;
  padding: 2rem;
  display: flex;
`;
export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  img{
    width: 100%;
  }
  ::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%);
    background: linear-gradient(180deg,transparent 10%,var(--black) 90%);
  }
`;