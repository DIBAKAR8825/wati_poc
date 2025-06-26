import express, { Request, Response, NextFunction } from 'express';
import { SendMessageUseCase } from '../application/SendMessageUseCase';
import { WatiMessageService } from '../infrastructure/WatiMessageService';
import { Message } from '../domain/Message';

const router = express.Router();

const handleSendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, orderNumber, phoneNumber, productUrl, status, template_name, parameters } = req.body;

    if (!name || !orderNumber || !phoneNumber || !productUrl || !status || !template_name || !parameters) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const message: Message = {
      name,
      orderNumber,
      phoneNumber,
      productUrl,
      status,
      template_name,
      parameters
    };

    const useCase = new SendMessageUseCase(new WatiMessageService());
    const wasSent = await useCase.execute(message);

    if (wasSent) {
      res.status(200).json({ message: 'WhatsApp message sent successfully.' });
    } else {
      res.status(200).json({ message: `Message not sent. Order status is '${status}'.` });
    }
  } catch (err: any) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

router.post('/send-message', handleSendMessage);
export default router;
