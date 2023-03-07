import { ClientManager as Client, Messenger } from '../../clients/ClientManager';
import { ConfigStorage } from '../ConfigStorage';

export class WhatsappAccountRegistration extends ConfigStorage {
    regNumber() {
        ConfigStorage.isRegister = true;
        Client.connectToMessanger(Messenger.WHATSAPP);
    }
}
