import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--black);
  height: 100%;
  gap: 5rem;
  padding: 2rem;
  display: flex;
`;
export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  padding: 2rem;
  z-index: 10;
`;
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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