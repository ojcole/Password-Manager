export const combinePasswords = (...passwords: string[]) => {
  return passwords.join('');
};

export const generatePassword = (
  website: string,
  master: string,
  symbols: string
): PromiseLike<string> => {
  const stringToHash = master + website.toUpperCase() + master;

  return crypto.subtle
    .digest('SHA-512', new TextEncoder().encode(stringToHash))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
        .join('');
    })
    .then((hashed) => hexToPassword(hashed, symbols));
};

export const hexToPassword = (hexString: string, symbols: string): string => {
  const values = hexString
    .match(/.{4}/g)
    ?.map((hex) => Number.parseInt(hex, 16) % symbols.length);

  if (values === undefined) {
    return '';
  }

  return values.map((val) => symbols[val]).join('');
};
