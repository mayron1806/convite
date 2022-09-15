import styled from "styled-components";

export const Container = styled.footer`
position: fixed;
bottom: 0;
width: 100%;
height: 50px;
background-color: var(--black);
box-shadow: var(--shadow);
padding: 1rem;
display: flex;
justify-content: space-between;
align-items: center;
`;
export const UserInfo = styled.div`
max-width: 85%;
display: flex; 
gap: 1rem;
align-items: center;
`;
export const UserImage = styled.img`
height: 30px;
border-radius: 50%;
`;
export const UserName = styled.h2`
color: var(--white);
font-weight: 500;
font-size: 2rem;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;