import { TelegramMessageHandler } from '../utils/telegram/TelegramMessageHandler';
import TelegramBot from 'node-telegram-bot-api';
import { BaseClient } from './BaseClient';

export class TelegramClient extends BaseClient {
    client;

    constructor() {
        super();
        this.client = new TelegramBot(this.BOT_TOKEN, { polling: true });  

        this.handler = new TelegramMessageHandler(this.client);
        this.handler.handleTelegramMessage();
    }
}