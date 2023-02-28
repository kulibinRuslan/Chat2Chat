import { WhatsApp } from '../../clients/WhastApp';
import { ConfigStorage } from '../ConfigStorage';

export class Registration extends ConfigStorage {
    regNumber() {
        console.log(ConfigStorage.isRegister);
        ConfigStorage.isRegister = true;
        console.log(ConfigStorage.isRegister);
        console.log('Запушен процесс регистрации');
        new WhatsApp().connectToWhatsApp();
    }
}
