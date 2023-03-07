import { WhatsappAccountRegistration } from './whatsapp/WhatsappAccountRegistation';
import { ClientManager as Client, Messenger } from '../clients/ClientManager';

export class ConnectionManager {
    static whatsappNumberRegistration() {
        new WhatsappAccountRegistration().regNumber();
    }

    static connectToMessanger(messengerType) {
        let client = Client.connectToMessanger(messengerType);

        client?.on('message', (msg) => {
            console.log(msg);
        });
    }
}
