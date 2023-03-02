import { WhatsApp } from './WhastApp';
import { Telegram } from './Telegram';

export class ClientManager {
    messengerName: string;

    constructor(_messangerName: string) {
        this.messengerName = _messangerName;
    }

    connectToMessanger() {
        let client;

        switch (this.messengerName) {
            case 'Telegram':
                client = new Telegram().connectToTelegram();

            case 'WhatsApp':
                client = new WhatsApp().connectToWhatsApp();
        }

        return client;
    }
}
