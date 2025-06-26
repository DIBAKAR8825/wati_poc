// Domain object: structure of the message to be sent via WhatsApp
export interface Message {
  name: string;
  orderNumber: string;
  phoneNumber: string;
  productUrl: string;
  status: string;
  template_name: string;
  parameters: { name: string; value: string }[];
}
