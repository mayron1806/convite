import styled from "styled-components";
import { Stats } from "../../../../Types/Message";

const backgroundColor = (stats: Stats) => {
  switch(stats){
    case Stats.ERROR:
      return 'red';
    case Stats.LOADING:
      return 'black';
    case Stats.SUCCESS:
      return 'green';
  }
}
export const Container = styled.div<{stats: Stats}>`
  padding: 2rem;
  background-color: var(--${props => backgroundColor(props.stats)});
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .button{
    position: absolute;
    bottom: 0;
    margin-bottom: 2rem;
  }
`;
export const Icon = styled.div`
  font-size: 6rem;
  display: flex;
  justify-content: center;
  color: var(--white);
`;
export const Text = styled.p`
  font-size: 1.6rem;
  color: var(--white);
  text-align: center;
`;
export const ButtonContent = styled.div`
  font-size: 1.6rem;
  color: var(--black);  
  font-weight: 500;
`;
