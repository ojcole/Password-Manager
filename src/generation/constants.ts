// All ASCII characters between 32 and 126 (inclusive)

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
const limitedSpecialChars = '!$@?.#';

export const symbols = uppercase + lowercase + numbers + specialChars;
export const limitedSymbols =
  uppercase + lowercase + numbers + limitedSpecialChars;
