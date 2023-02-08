import { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys';
import { MessageHandler } from './MessageHandler';
import { WhatsApp } from '../../clients/WhastApp';
import { ConfigStorage } from '../ConfigStorage';
import { Boom } from '@hapi/boom';
import { toFile } from 'qrcode';
import * as fs from 'fs';

export class Handler {
    sessionName: string;
    saveCodePath: string = ConfigStorage.codeSavePath;
    saveSessionPath: string = ConfigStorage.saveSessionPath

    async saveQr(qr) {
        toFile('src/data/code/mainSession.png', [
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
        const sock = new WhatsApp();
        let client = await sock.connectToWhatsApp();

        const { saveCreds } = await useMultiFileAuthState(
            this.saveSessionPath
        );

        client.ev.on('creds.update', () => {
            saveCreds();
        });

        client.ev.on('connection.update', async (update) => {
            const { qr, connection, lastDisconnect } = update;

            if (qr) {
                this.saveQr(qr);
            }

            if (connection === 'close') {
                let shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
                const code = (lastDisconnect?.error as Boom)?.output?.statusCode;
                    if (code == 403 || code == 401) {
                        this.remove();
                        shouldReconnect = false;
                    }

                if (shouldReconnect) {
                    await sock.connectToWhatsApp();
                }
            }

            if (connection == 'open') {
                fs.unlinkSync(this.saveCodePath);
                
                setTimeout(async () => {
                    await new MessageHandler(client).handleWhastAppMessage();
                }, 5000);
            }
        });
    }
}