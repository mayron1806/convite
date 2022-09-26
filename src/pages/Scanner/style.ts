import styled, { css } from "styled-components";
import { Stats } from "../../Types/Message";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--black);
`;
export const Title = styled.h1`
  color: var(--white);
  font-weight: 500;
`;
export const Fetching = styled.div<{stats: Stats}>`
  width: 100%;
  height: 100%;
  background-color: var(--white);

`;