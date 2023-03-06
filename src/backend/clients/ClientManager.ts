import { WhatsAppClient } from './WhastappClient';
import { TelegramClient } from './TelegramClient';
import { BaseClient } from './BaseClient';

export class ClientManager {
    static connectToMessanger(messengerName): BaseClient | null {
        switch (messengerName) {
            case Messenger.TELEGRAM:
                return new TelegramClient();

            case Messenger.WHATSAPP:
                return new WhatsAppClient();

            default:
                return null;
        }
    }
}

export enum Messenger {
    TELEGRAM,
    WHATSAPP,
}
