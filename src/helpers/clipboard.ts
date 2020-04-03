export const copyToClipBoard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};
