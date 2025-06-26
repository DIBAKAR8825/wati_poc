import { Message } from '../domain/Message';

export interface IMessageService {
  send(message: Message): Promise<boolean>;
}
