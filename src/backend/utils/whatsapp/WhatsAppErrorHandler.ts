import { WhatsAppSessionManager } from './WhatsAppSessionManager';
import { DisconnectReason } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';
import { BaseHandler } from '../BaseHandler';

export class WhatsAppErrorHandler extends BaseHandler {
    handleErrors(lastDisconnect) {
        console.log(`Соединение закрыто из за ${lastDisconnect?.error?.name}: ${lastDisconnect?.error?.message}`);

        let shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

        const code = (lastDisconnect?.error as Boom)?.output?.statusCode;

        if (code == 403 || code == 401) {
            shouldReconnect = false;
            console.log('Сессия не валидна');
            this.handle('invalidSession', undefined);
        }

        if (shouldReconnect) {
            this.handle('reconnect', undefined);
        }
    }
}