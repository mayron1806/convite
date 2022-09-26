import styled, { css, keyframes } from "styled-components";
import { Stats } from "../../Types/Message";


const dotAnim = keyframes`
  0%{
    content: '';
  }
  33%{
    content: '.';
  }
  66%{
    content: '..';
  }
  100%{
    content: '...';
  }
`;
const messageFormat = (stats: Stats) => {
  switch(stats){
    case Stats.ERROR:
      return css`
        color: var(--red);
      `;
    case Stats.SUCCESS:
      return css`
        color: var(--green);
      `;
    case Stats.LOADING:
      return css`
        color: var(--purple);
        &::after{
          content: '';
          animation: ${dotAnim} 1s infinite;
        }
      `;
  }
}
export const Container = styled.p<{stats: Stats}>`
  font-size: 1.6rem;
  ${props => messageFormat(props.stats)}
`;
