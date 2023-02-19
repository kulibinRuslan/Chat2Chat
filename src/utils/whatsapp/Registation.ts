import { WhatsApp } from '../../clients/WhastApp';
import { ConfigStorage } from '../ConfigStorage';

export class Registration extends ConfigStorage {
    regNumber() {
        super.isRegister = true;
        console.log('Запушен процесс регистрации')
        new WhatsApp().connectToWhatsApp();
    }
}
