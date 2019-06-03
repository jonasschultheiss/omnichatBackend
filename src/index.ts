import { API } from './servers/API';
import { Socket } from './servers/Socket';

const socket = new Socket(8080);
const api = new API(3132);
