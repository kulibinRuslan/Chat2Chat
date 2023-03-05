import { ConfigStorage } from '../ConfigStorage';
import { ClientManager } from '../../clients/ClientManager';

export class WhatsAppAccountRegistration extends ConfigStorage {
    regNumber() {
        ConfigStorage.isRegister = true;
        console.log('Запушен процесс регистрации');
        new ClientManager('WhatsApp').connectToMessanger();
    }
}
