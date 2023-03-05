import { WhatsAppSessionManager } from './WhatsAppSessionManager';
import { WhatsAppErrorHandler } from './WhatsAppErrorHandler';
import { BaseClient } from '../../clients/BaseClient';
import { ConfigStorage } from '../ConfigStorage';


export class WhatsAppUpdateHandler extends BaseClient {
    async startHandler(client) {
        let sessionManager = new WhatsAppSessionManager();

        return new Promise(async (resolve, reject) => {
            client.ev.on('creds.update', () => {
                BaseClient.sessionUpdate();
            });

            client.ev.on('connection.update', async (update) => {
                const { qr, connection, lastDisconnect } = update;

                if (qr) {
                    sessionManager.saveQrImage(qr)
                }

                if (connection === 'close') {
                    new WhatsAppErrorHandler(client).handleErrors(lastDisconnect);

                    client.on('invalidSession', () => {
                        sessionManager.removeSession();
                        sessionManager.reconnect();
                    });

                    client.on('reconnect', () => {
                        sessionManager.reconnect();
                    });
                }

                if (connection == 'open') {
                    if (ConfigStorage.isRegister) {
                        setTimeout(() => process.exit(), 3000);
                        console.log('Регистрация завершена');
                    } else {
                        resolve(client);
                    }
                }
            });
        });
    }
}
