import { WhatsAppClient } from './WhastAppClient';
import { TelegramClient } from './TelegramClient';
import { BaseClient } from './BaseClient';

export class ClientManager {
    static async connectToMessanger(messengerName): Promise<BaseClient | null | undefined> {
        switch (messengerName) {
            case Messenger.TELEGRAM:
                return new TelegramClient()

            case Messenger.WHATSAPP:
                // return await new WhatsAppClient().connectToWhatsApp();
                break;
        }
    }
}

export enum Messenger {
    TELEGRAM,
    WHATSAPP
}
