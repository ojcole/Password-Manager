import { STORAGE_MSG_SEND } from '../messages/types';
import handler from './messages/handler';

const { ipcRenderer } = window.require('electron');

handler();

ipcRenderer.send(STORAGE_MSG_SEND, 'test');
