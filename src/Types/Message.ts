export enum Stats {'ERROR' ,'SUCCESS' , 'LOADING', 'NONE'};
type Message = {
  message: string,
  stats: Stats
}
export default Message;