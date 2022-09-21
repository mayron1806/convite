import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--white);
  font-size: 1.6rem;
  padding: .5rem;
  padding-left: 0;
  color: var(--white);
  svg{
    font-size: 2rem;
  }
`;
export const More = styled.div`
  background-color: var(--black);
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 2px;
  color: var(--white);
  transition: 0.2s;
  position: relative;
  svg:active{
    filter: brightness(.7);
  }
`;
export const Options = styled.div<{isActive: boolean}>`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  background-color: var(--white);
  padding: 1rem;
  border-radius: 1rem;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  transition: 0.5s;
  pointer-events: ${props => props.isActive ? 'all' : 'none'};
  opacity:${props => props.isActive ? 1 : 0};
`;