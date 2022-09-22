type messageTypes = 'ERROR' | 'SUCCESS' | 'LOADING' | 'NONE';
type Message = {
  message: string,
  stats: messageTypes
}
export default Message;