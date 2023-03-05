import { ClientManager } from '../../clients/ClientManager';
import { ConfigStorage } from '../ConfigStorage';
import { toFile } from 'qrcode'; 
import * as fs from 'fs';

export class WhatsAppSessionManager extends ConfigStorage {
    async saveQrImage(qr) {
        toFile(this.codeSavePath, [{ data: qr, mode: 'string' }]);
        console.log('QR код помещен в папку');
    }

    async removeSession() {
        fs.rm(this.saveSessionPath, { recursive: true }, (_) => _);
    }

    reconnect() {

        setTimeout('wefef', 2000);
    }
}