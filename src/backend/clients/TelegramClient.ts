import { MessageHandler as TelegramMessageHandler } from '../utils/telegram/MessageHandler';
import TelegramBot from 'node-telegram-bot-api';
import { BaseClient } from './BaseClient';

export class TelegramClient extends BaseClient {
    bot;

    constructor() {
        super()
        this.bot = new TelegramBot(this.BOT_TOKEN, { polling: true });  

        this.handler = new TelegramMessageHandler(this.bot);
        this.handler.handleTelegramMessage();
    }
}