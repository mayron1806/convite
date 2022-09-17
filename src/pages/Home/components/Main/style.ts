import styled from "styled-components";

export const Container = styled.main`
background-color: var(--black);
max-height: 75%;
overflow-y: auto;
`;
export const Table = styled.table`
width: 100%;
color: var(--white);
font-size: 1.6rem;
padding: 1rem;
border-collapse: separate;
border-spacing: 0 1rem;
th{
  font-weight: 500;
  color: var(--purple);
  padding: 0 1rem;
}
`;
export const TableItem = styled.tr`
box-shadow: inset var(--shadow);
border-radius: 5px;
margin: 1rem 0;
td{
  padding: 1rem;
}
`;