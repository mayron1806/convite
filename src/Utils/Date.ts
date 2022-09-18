export const dateFormated = (date: Date) => {
  const day = ('00' + date.getDate()).slice(-2);
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}