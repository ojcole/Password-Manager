import { sendClearClipboard } from "../messages/senders";

export const copyToClipBoard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

export const clearClipboard = () => {
  sendClearClipboard();
}