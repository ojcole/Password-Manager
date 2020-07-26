import handler from './messages/handler';
import { render } from 'react-dom';
import React from 'react';
import Entry from './components/Entry';

handler();

const root = document.getElementById('root');

render(<Entry />, root);
