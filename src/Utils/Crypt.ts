import cryptoJS from "crypto-js";

const secret = "awagasgdfjkl";
export const encrypt = (value: Object) => {
  // converte valor recebido para string
  const stringValue = JSON.stringify(value);
  // criptografa o valor e retorna
  return cryptoJS.AES.encrypt(stringValue, secret).toString();
};

export const decrypt = (encryptedValue : string) => {
  const bytes = cryptoJS.AES.decrypt(encryptedValue, secret);
  const stringValue = bytes //bytes.toString(Utf8);
  return stringValue //JSON.parse(stringValue);
};
/*
const objectsIsEquals = (obj1, obj2) => {
  let isEquals = true;
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      isEquals = false;
      break;
    }
  }
  return isEquals;
};
console.log(objectsIsEquals(participant, decryptedParticipant));
*/