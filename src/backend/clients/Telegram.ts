import { ConfigStorage } from '../utils/ConfigStorage';
import { MessageHandler } from '../utils/telegram/MessageHandler';
import TelegramBot from 'node-telegram-bot-api';

export class Telegram extends ConfigStorage {
    async connectToTelegram() {
        const client = new TelegramBot(this.BOT_TOKEN, { polling: true });
        await MessageHandler.handleTelegramMessage(client);
    }
}
