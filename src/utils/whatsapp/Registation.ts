import { WhatsApp } from '../../clients/WhastApp';

export class Registration {   
    regNumber() {
        const sock = new WhatsApp(true);
        sock.connectToWhatsApp();
        setTimeout(() => process.exit(), 3000);
    }
}
