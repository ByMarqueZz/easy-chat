import { io } from 'socket.io-client';
import store from '../../redux/store';

export const socket = io(store.getState().url);