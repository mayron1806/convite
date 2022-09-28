import styled, { css } from "styled-components";
import { Stats } from "../../Types/Message";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--black);
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h1`
  color: var(--white);
  font-weight: 500;
`;
export const Close = styled.div`
  font-size: 2.5rem;
  color: var(--white);
`;