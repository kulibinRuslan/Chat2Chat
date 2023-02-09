import { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys';
import { MessageHandler } from './MessageHandler';
import { WhatsApp } from '../../clients/WhastApp';
import { ConfigStorage } from '../ConfigStorage';
import { Boom } from '@hapi/boom';
import { toFile } from 'qrcode';
import * as fs from 'fs';

export class UpdateHandler {
    saveCodePath: string = ConfigStorage.codeSavePath;
    saveSessionPath: string = ConfigStorage.saveSessionPath;

    isRegister: boolean = false;

    saveCreds;
    client;


    constructor(_client, _saveCreds, _isRegister: boolean) {
        this.isRegister = _isRegister;
        this.client = _client;
        this.saveCreds = _saveCreds;
    }

    async saveQr(qr) {
        toFile(this.saveCodePath, [
            {
                data: qr,
                mode: 'string',
            },
        ]);
    }

    async remove() {
        try {
            fs.rm(
                this.saveSessionPath,
                { recursive: true },
                (_) => _
            );
        } catch (e) {
            const err = e as Error;
            console.log(`${err.name}: ${err.message}`);
        }
    }

    async startHandler() {
        this.client.ev.on('creds.update', () => {
            this.saveCreds();
        });

        this.client.ev.on('connection.update', async (update) => {
            const { qr, connection, lastDisconnect } = update;

            if (qr) {

                this.saveQr(qr);
            }

            if (connection === 'close') {
                console.log(
                    `Соединение закрыто из за ${lastDisconnect?.error?.name}: ${lastDisconnect?.error?.message}`
                );

                let shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
                
                const code = (lastDisconnect?.error as Boom)?.output?.statusCode;
                
                if (code == 403 || code == 401) {
                    this.remove();
                    shouldReconnect = false;
                }

                if (shouldReconnect) {
                    await new WhatsApp(this.isRegister).connectToWhatsApp();
                }
            }

            if (connection == 'open') {                
                if (this.isRegister){
                    setTimeout(() => process.exit(), 3000);
                } else {
                    setTimeout(async () => {
                        await new MessageHandler(this.client).handleWhatsAppMessage();
                    }, 5000);
                }
            }
        });
    }
}