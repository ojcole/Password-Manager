import { md } from 'node-forge';

const hasher = md.sha512.create();
const symbolStart = 32;
const symbolEnd = 126;
const symbolInterval = symbolEnd - symbolStart;

export const generatePassword = (website: string, master: string): string => {
  hasher.update(master + website.toUpperCase() + master);

  return hexToPassword(hasher.digest().toHex());
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
