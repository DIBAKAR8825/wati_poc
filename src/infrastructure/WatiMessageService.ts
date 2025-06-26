// WatiMessageService.ts
import axios from 'axios';
import { IMessageService } from '../interfaces/IMessageService';
import { Message } from '../domain/Message';
import { config } from '../config/config';
import { HEADERS } from '../constants/constants';

// Service that sends WhatsApp messages using WATI API
export class WatiMessageService implements IMessageService {
  async send(message: Message): Promise<boolean> {
    try {
      const response = await axios.post(
        `${config.WATI_API_URL}/api/v2/sendTemplateMessage?whatsappNumber=${message.phoneNumber}`,
        {
          template_name: config.WATI_TEMPLATE_1,
          broadcast_name: config.WATI_TEMPLATE_1,
          parameters: [
            { name: 'name', value: message.name },
            { name: 'order_number', value: `Your Order Number ${message.orderNumber}` },
            { name: 'order_status_url_partial_variable', value: message.productUrl }
          ]
        },
        {
          headers: {
            [HEADERS.AUTHORIZATION]: `Bearer ${config.WATI_ENV_KEY}`,
            [HEADERS.CONTENT_TYPE]: HEADERS.APPLICATION_JSON,
          }
        }
      );

      console.log('WhatsApp message sent successfully:', response.data);
      return true;
    } catch (error: any) {
      console.error('Error sending message:', error.response?.data || error.message);
      return false;
    }
  }
}
