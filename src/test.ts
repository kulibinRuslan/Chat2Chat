// import { Registration } from "./backend/utils/whatsapp/Registation";
// new Registration().regNumber();

// ================================================================

// import { WhatsApp } from "./backend/clients/WhastApp";
// new WhatsApp().connectToWhatsApp();

// ================================================================

import { Telegram } from './backend/clients/Telegram';
new Telegram().connectToTelegram();

// ================================================================

// server.ts (Node.js (Express) backend)
// import express, { Request, Response } from 'express';
// import path from 'path';

// const app = express();
// // const __dirname = path.resolve();

// app.get('/', (req: Request, res: Response) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
// });

// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });
