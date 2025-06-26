# 📦 WATI WhatsApp Messaging Integration (Node.js + TypeScript + DDD)

This project is a clean, modular implementation for sending **WhatsApp template messages via WATI API** based on order status updates using **Domain-Driven Design (DDD)** in **Node.js** with **TypeScript**.

Messages are only sent when the order status is `SUCCESS`.

---

## ✅ Features

- 📐 Follows **Domain-Driven Design (DDD)** for clear separation of concerns.
- 🔐 Uses **environment variables** to store sensitive credentials securely.
- 🚀 Fully functional **REST API** endpoint to trigger WhatsApp messages.
- 🔄 Supports **multiple WATI templates** (`order_placed_successful`, `order_details`).
- 📄 Clean, readable, and maintainable code with comments and best practices.

---

## 📁 Project Structure

```
wati_project/
├── src/
│   ├── api/                 # Express route handlers
│   │   └── routes.ts
│   ├── application/         # Business use cases
│   │   └── SendMessageUseCase.ts
│   ├── config/              # Environment config loader
│   │   └── config.ts
│   ├── constants/           # Constants for headers, env keys
│   │   └── constants.ts
│   ├── domain/              # Domain entities
│   │   └── Message.ts
│   ├── infrastructure/      # External WATI integration
│   │   └── WatiMessageService.ts
│   ├── interfaces/          # Interface contracts
│   │   └── IMessageService.ts
│   └── main.ts              # Entry point (Express server)
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DIBAKAR8825/wati_poc.git
cd wati_project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root and add:

```env
WATI_API_URL=https://live-mt-server.wati.io/your-tenant-id
WATI_ENV_KEY=your-wati-auth-token
WATI_TEMPLATE_1=order_placed_successful
WATI_TEMPLATE_2=order_details
ORDER_STATUS=SUCCESS
PORT=3333
```

> 🔒 Keep your `.env` file secret and **do not commit** it to Git.

### 4. Run the Server

```bash
npx ts-node src/main.ts
```

> You should see:  
> `🚀 Server running at http://localhost:3333`

---

## 🔄 API Usage

### Endpoint

```
POST /api/send-message
Content-Type: application/json
```
---


### ✅ Payload (Template- order_placed_successful)

```json
{
  "name": "Dibakar Chakraborty",
  "orderNumber": "123455",
  "phoneNumber": "919293949596",
  "productUrl": "https://dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020",
  "status": "SUCCESS",
  "template_name": "order_placed_successful",
  "parameters": [
    { "name": "name", "value": "Dibakar Chakraborty" },
    { "name": "order_number", "value": "Your Order Number 123455" },
    {
      "name": "order_status_url_partial_variable",
      "value": "//dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020"
    }
  ]
}
```

- `status` must be `"SUCCESS"` to trigger the message.
- `template_name` must match your approved template on WATI (`WATI_TEMPLATE_1` or `WATI_TEMPLATE_2`).
- The request body dynamically adjusts to match the required parameters for the selected template.

---

## 🧪 Testing cURL Example (Template- order_placed_successful)

```bash
curl --location 'http://localhost:3333/api/send-message' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Dibakar Chakraborty",
  "orderNumber": "123455",
  "phoneNumber": "919293949596",
  "productUrl": "https://dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020",
  "status": "SUCCESS",
  "template_name": "order_placed_successful",
  "parameters": [
    { "name": "name", "value": "Dibakar Chakraborty" },
    { "name": "order_number", "value": "Your Order Number 123455" },
    {
      "name": "order_status_url_partial_variable",
      "value": "//dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020"
    }
  ]
}'
```

### ✅ Payload (Template- order_details)

```json
{
  "name": "Dibakar Chakraborty",
  "orderNumber": "123455",
  "phoneNumber": "919293949596",
  "productUrl": "https://dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020",
  "status": "SUCCESS",
  "template_name": "order_details",
  "parameters": [
    { "name": "name", "value": "Dibakar Chakraborty" },
    { "name": "order_number", "value": "Your Order Number 123455" },
    { "name": "wc_adv_shipment", "value": "hShipment-number-1234566890" },
    {
      "name": "order_status_url_partial_variable",
      "value": "//dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020"
    }
  ]
}
```

- `status` must be `"SUCCESS"` to trigger the message.
- `template_name` must match your approved template on WATI (`WATI_TEMPLATE_1` or `WATI_TEMPLATE_2`).
- The request body dynamically adjusts to match the required parameters for the selected template.

---

## 🧪 Testing cURL Example (Template- order_details)

```bash
curl --location 'http://localhost:3333/api/send-message' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Dibakar Chakraborty",
  "orderNumber": "123455",
  "phoneNumber": "919293949596",
  "productUrl": "https://dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020",
  "status": "SUCCESS",
  "template_name": "order_details",
  "parameters": [
    { "name": "name", "value": "Dibakar Chakraborty" },
    { "name": "order_number", "value": "Your Order Number 123455" },
    { "name": "wc_adv_shipment", "value": "hShipment-number-1234566890" },
    {
      "name": "order_status_url_partial_variable",
      "value": "//dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020"
    }
  ]
}'
```
---

## Response

### On Success

```json
{
  "message": "WhatsApp message sent successfully."
}
```

### On Status Not `SUCCESS`

```json
{
  "message": "Message not sent. Order status is 'FAIL'."
}
```

---
```bash
### Wati Curl

curl --location 'https://live-mt-server.wati.io/your-tenant-id/api/v2/sendTemplateMessage?whatsappNumber=+919623231123' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc.aWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkif.YgVBVmaa4' \
--data '{
    "template_name": "order_placed_successful",
    "broadcast_name": "order_placed_successful",
    "parameters": [
        {
            "name": "name",
            "value": "Dibakar Chakraborty"
        },
        {
            "name": "order_number",
            "value": "Your Order Number 123455"
        },
        {
            "name": "order_status_url_partial_variable",
            "value": "https://dev.theluxuryhut.com/shop/product/rolex-submariner-date-bluesy-40-blue-dial-116613lb-2020"
        }
    ]
}'
```
---

## 🧰 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **DDD (Domain-Driven Design)**
- **WATI WhatsApp Business API**
- **dotenv** for config management
- **Axios** for HTTP requests

---

## 👨‍🔧 Developer Notes

- If order status is not `SUCCESS`, no message will be sent.
- Easily extendable to support new WATI templates.
- Clean interface-driven structure makes it testable and modular.

---

## 📜 License

MIT © 2025 – Developed for [The Luxury Hut](https://www.theluxuryhut.com/)

---

## 🤝 Support or Contributions

If you need enhancements or want to contribute:

- Fork the repo
- Raise an issue or PR
