import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import * as global from '../global';

@Injectable()
export class SocketService {
  socket: any;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(global.url);
  }
}
