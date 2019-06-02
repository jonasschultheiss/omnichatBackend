import { API } from './servers/API';
import { Socket } from './servers/Socket';

const socket = new Socket();
const api = new API(socket.getApp());
