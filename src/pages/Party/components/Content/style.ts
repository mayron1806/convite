import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const ContentHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title{
    color: var(--purple);
    font-size: 2rem;
    font-weight: 500;
  } 
`;
export const SubTitle = styled.h3`
  font-size: 1.6rem;
  color: var(--purple);
  font-weight: 500;
`;
export const Participants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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