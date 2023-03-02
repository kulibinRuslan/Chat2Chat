import { WhatsApp } from './WhastApp';
import { Telegram } from './Telegram';

export class ClientManager {
    messengerName: string;

    constructor(_messangerName: string) {
        this.messengerName = _messangerName;
    }

    async connectToMessanger() {
        let client;

        switch (this.messengerName) {
            case 'Telegram':
                client = await new Telegram().connectToTelegram();

            case 'WhatsApp':
                client = await new WhatsApp().connectToWhatsApp();
        }

        return client;
    }
}
