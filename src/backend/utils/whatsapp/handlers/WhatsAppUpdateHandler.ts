import { WhatsappSessionManager } from '../WhatsappSessionManager';
import { ConfigStorage } from '../../ConfigStorage';
import { BaseHandler } from '../../BaseHandler';


export class WhatsappUpdateHandler extends BaseHandler {
    async startHandler() {
        this.client.ev.on('creds.update', () => {
            ConfigStorage.sessionUpdate();
        });

        this.client.ev.on('connection.update', async (update) => {
            const { qr, connection, lastDisconnect } = update;

            if (qr) {
                new WhatsappSessionManager().saveQrImage(qr);
                this.handle('saveqr', undefined)
            }

            if (connection === 'close') {
                this.handle('close', lastDisconnect);
            }

            if (connection === 'open') {
                if (ConfigStorage.isRegister) {
                    setTimeout(() => process.exit(), 3000);
                    this.handle('endreg', undefined)
                } else {
                    this.handle('open', undefined);
                }
            }
        });
    }
}
