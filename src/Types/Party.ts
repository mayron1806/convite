import User from "./User";

type Participant = {
  name: string,
  present?: boolean
}
type Party = {
  name: string,
  ownerID: string,
  participants?: Participant[],
  date: Date
}
export default Party