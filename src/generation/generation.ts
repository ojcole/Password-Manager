const symbolStart = 32;
const symbolEnd = 126;
const symbolInterval = symbolEnd - symbolStart;

export const generatePassword = (
  website: string,
  master: string
): PromiseLike<string> => {
  const stringToHash = master + website.toUpperCase() + master;

  return crypto.subtle
    .digest('SHA-512', new TextEncoder().encode(stringToHash))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
        .join('');
    })
    .then((hashed) => hexToPassword(hashed));
};

export const hexToPassword = (hexString: string): string => {
  const values = hexString
    .match(/.{4}/g)
    ?.map((hex) => Number.parseInt(hex, 16) % symbolInterval);

  if (values === undefined) {
    return '';
  }

  return values.map((val) => String.fromCharCode(val + symbolStart)).join('');
};
