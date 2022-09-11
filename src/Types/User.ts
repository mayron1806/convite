type User = {
  uid: string,
  displayName: string | null,
  photoURL: string | null,
  parties?: string[]
}
export default User;