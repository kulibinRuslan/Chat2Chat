import { ConfigStorage } from '../utils/ConfigStorage';
import TelegramBot from 'node-telegram-bot-api';

export class Telegram extends ConfigStorage {
    async connectToTelegram() {
        const client = new TelegramBot(this.BOT_TOKEN, { polling: true });
        return client;
    }
}
