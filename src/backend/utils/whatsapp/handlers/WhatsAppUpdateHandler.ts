WhatsappSessionManager
import { ConfigStorage } from '../../ConfigStorage';
import { BaseHandler } from '../../BaseHandler';
import { WhatsappSessionManager } from '../WhatsappSessionManager';

export class WhatsappUpdateHandler extends BaseHandler {
    async startHandler() {
        this.client.ev.on('creds.update', () => {
            ConfigStorage.sessionUpdate();
        });

        this.client.ev.on('connection.update', async (update) => {
            const { qr, connection, lastDisconnect } = update;

            if (qr) {
                new WhatsappSessionManager().saveQrImage(qr);
            }

            if (connection === 'close') {
                this.handle('close', lastDisconnect);
            }

            if (connection === 'open') {
                if (ConfigStorage.isRegister) {
                    setTimeout(() => process.exit(), 3000);
                    console.log('Регистрация завершена');
                } else {
                    this.handle('open', undefined);
                }
            }
        });
    }
}
