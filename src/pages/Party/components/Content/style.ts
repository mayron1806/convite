import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
`;
export const ContentHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  .title{
    color: var(--purple);
    font-size: 2rem;
    font-weight: 500;
  } 
`;
export const SubTitle = styled.h3`
  margin-top: 2rem;
  font-size: 1.6rem;
  color: var(--purple);
  font-weight: 500;
`;
export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: var(--white);
  gap: 1rem;
  svg{
    font-size: 2.5rem;
  }
`;