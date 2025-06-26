# WATI WhatsApp Integration – Node.js (DDD + TypeScript)

This project integrates the **WATI WhatsApp API** into a TypeScript-based Node.js app following **Domain-Driven Design (DDD)** principles. WhatsApp messages are sent automatically when the order status is `"SUCCESS"` using an approved WATI template.

---

## Features

- Integration with [WATI](https://wati.io/) for WhatsApp messaging
- Clean architecture using DDD (Domain, Application, Infrastructure, Interface)
- Validates order status before sending
- Easy configuration via `.env` file
- Secure API token usage

---

## Folder Structure

```
src/
├── api/                  # Route handlers
│   └── routes.ts
├── application/          # Use cases
│   └── SendMessageUseCase.ts
├── config/               # Environment setup
│   └── config.ts
├── constants/            # Shared constants & env keys
│   └── constants.ts
├── domain/               # Domain model
│   └── Message.ts
├── infrastructure/       # WATI implementation
│   └── WatiMessageService.ts
├── interfaces/           # Interface contracts
│   └── IMessageService.ts
└── main.ts               # App entry point
```

---

## Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/your-username/wati-whatsapp-integration.git
cd wati-whatsapp-integration
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup `.env`

Create a `.env` file in the root and add the following values:

```env
# WATI API configuration
WATI_API_URL=<your_wati_url>
WATI_ENV_KEY=<your_wati_bearer_token>

# Template names (must match your approved templates)
WATI_TEMPLATE_1 = created and approved templated at wait
WATI_TEMPLATE_2 = created and approved templated at wait

# Business rule
ORDER_STATUS=SUCCESS

# Server port
PORT=3333
```

>Replace `<your_wati_bearer_token>` with your actual WATI API token.

---

## Running the Server

```bash
npx ts-node src/main.ts
```

You should see:

```
Server running at http://localhost:3333
```

---

## API Usage

### Endpoint

`POST /api/send-message`

### Request Body (JSON)

```json
{
  "name": "Dibakar Chakraborty",
  "orderNumber": "5123455",
  "phoneNumber": "919656565650",
  "productUrl": "https://dev.theluxuryhut.com/shop/product/rolex",
  "status": "SUCCESS"
}
```

> The message will only be sent if `"status"` is `"SUCCESS"`.

---

### Sample CURL

```bash
curl -X POST http://localhost:3333/api/send-message -H "Content-Type: application/json" -d '{
  "name": "Dibakar Chakraborty",
  "orderNumber": "5123455",
  "phoneNumber": "919656565650",
  "productUrl": "https://dev.theluxuryhut.com/shop/product/rolex",
  "status": "SUCCESS"
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

## 📜 License

MIT © 2025 – Developed for [The Luxury Hut](https://www.theluxuryhut.com/)

---

## 🤝 Support or Contributions

If you need enhancements or want to contribute:

- Fork the repo
- Raise an issue or PR

---