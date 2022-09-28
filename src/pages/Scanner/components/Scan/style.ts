import styled from "styled-components";

export const Container = styled.div`  
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .scanner {
    width: 100%;
    height: 100%;
  }
  .button{
    position: absolute;
    bottom: 0;
    margin-bottom: 2rem;
  }
`;
export const Title = styled.h2`
  font-size: 2rem;
  color: var(--white);
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
`;
export const ButtonContent = styled.div`
  font-size: 1.6rem;
  color: var(--black);  
  font-weight: 500;
`;
