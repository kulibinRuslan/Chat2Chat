import { DisconnectReason } from '@adiwajshing/baileys';
import { MessageHandler } from './MessageHandler';
import { WhatsApp } from '../../clients/WhastApp';
import { ConfigStorage } from '../ConfigStorage';
import { Boom } from '@hapi/boom';
import { toFile } from 'qrcode';
import * as fs from 'fs';

export class UpdateHandler extends ConfigStorage {
    async saveQr(qr) {
        toFile(this.codeSavePath, [{ data: qr, mode: 'string' }]);
        console.log('QR код помещен в папку')
    }

    async remove() {
        try {
            fs.rm(this.saveSessionPath, { recursive: true }, (_) => _);
        } catch (e) {
            const err = e as Error;
            console.log(`${err.name}: ${err.message}`);
        }
    }

    async reconnect() {
        setTimeout(async () => {
            await new WhatsApp().connectToWhatsApp();
        }, 3000);
    }

    async startHandler(client, saveCreds) {
        client.ev.on('creds.update', () => {
            saveCreds();
        });

        client.ev.on('connection.update', async (update) => {
            const { qr, connection, lastDisconnect } = update;

            if (qr) {
                this.saveQr(qr);
            }

            if (connection === 'close') {
                console.log(`Соединение закрыто из за ${lastDisconnect?.error?.name}: ${lastDisconnect?.error?.message}`);

                let shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

                const code = (lastDisconnect?.error as Boom)?.output?.statusCode;

                if (code == 403 || code == 401) {
                    shouldReconnect = false;
                    console.log('Сессия не валидна');
                    this.remove();
                    this.reconnect();
                }

                if (shouldReconnect) {
                    this.reconnect();
                }
            }

            if (connection == 'open') {
                if (ConfigStorage.isRegister) {
                    setTimeout(() => process.exit(), 3000);
                    console.log('Регистрация завершена')
                    
                } else {
                    setTimeout(async () => {
                        await MessageHandler.handleWhatsAppMessage(client);
                    }, 5000);
                }
            }
        });
    }
}
