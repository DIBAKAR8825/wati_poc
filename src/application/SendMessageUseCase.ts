import { Message } from '../domain/Message';
import { IMessageService } from '../interfaces/IMessageService';
import { config } from '../config/config';

export class SendMessageUseCase {
  constructor(private readonly messageService: IMessageService) {}

  async execute(message: Message): Promise<boolean> {
    if (message.status === config.ORDER_STATUS) {
      return await this.messageService.send(message);
    } else {
      console.log(`Skipped sending. Status: ${message.status}`);
      return false;
    }
  }
}
