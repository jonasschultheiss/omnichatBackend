import { API } from './servers/API';
import { Socket } from './servers/Socket';
import { Database } from './servers/Database';

const SOCKET_PORT: number = Number(process.env.SOCKET_PORT) || 3133;
const API_PORT: number = Number(process.env.API_PORT) || 3132;

const socket = new Socket(SOCKET_PORT);
// const api = new API(API_PORT);
// const db = new Database();
