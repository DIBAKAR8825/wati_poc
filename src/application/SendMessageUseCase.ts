// SendMessageUseCase.ts
import { Message } from '../domain/Message';
import { IMessageService } from '../interfaces/IMessageService';
import { config } from '../config/config';

// Use Case: Only send message if order status is SUCCESS
export class SendMessageUseCase {
  constructor(private readonly messageService: IMessageService) {}

  async execute(message: Message): Promise<boolean> {
    if (message.status === config.ORDER_STATUS) {
      return await this.messageService.send(message);
    } else {
      console.log(`Message not sent. Order status is '${message.status}', expected '${config.ORDER_STATUS}'`);
      return false;
    }
  }
}
