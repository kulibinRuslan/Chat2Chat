import { WhatsAppSessionManager } from '../WhatsAppSessionManager';
import { ConfigStorage } from '../../ConfigStorage';
import { BaseHandler } from '../../BaseHandler';

export class WhatsAppUpdateHandler extends BaseHandler {
    async startHandler() {
        this.client.ev.on('creds.update', () => {
            ConfigStorage.sessionUpdate();
        });

        this.client.ev.on('connection.update', async (update) => {
            const { qr, connection, lastDisconnect } = update;

            if (qr) {
                new WhatsAppSessionManager().saveQrImage(qr);
            }

            if (connection === 'closed') {
                this.handle('closed', lastDisconnect);
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
