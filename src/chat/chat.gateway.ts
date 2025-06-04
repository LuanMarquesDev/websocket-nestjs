import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('mensagem')
  handleMessage(@MessageBody() msg: string): void {
    console.log('[Servidor] Mensagem recebida:', msg);
    this.server.emit('mensagem', `Servidor: ${msg}`);
  }
}