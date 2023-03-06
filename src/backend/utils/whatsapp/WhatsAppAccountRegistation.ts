import { ClientManager as Client, ClientManager, Messenger } from '../../clients/ClientManager';
import { ConfigStorage } from '../ConfigStorage';


export class WhatsappAccountRegistration extends ConfigStorage {
    regNumber() {
        ConfigStorage.isRegister = true;
        console.log('Запушен процесс регистрации');
        ClientManager.connectToMessanger(Messenger.WHATSAPP);   
    }
}
