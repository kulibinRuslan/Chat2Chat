import { WhatsappSessionManager } from '../WhatsappSessionManager';
import { DisconnectReason } from '@adiwajshing/baileys';
import { BaseHandler } from '../../BaseHandler';
import { Boom } from '@hapi/boom';

export class WhatsappErrorHandler extends BaseHandler {
    handleErrors(lastDisconnect) {
        let sessionManager = new WhatsappSessionManager();
        console.log(`Соединение закрыто из за ${lastDisconnect?.error?.name}: ${lastDisconnect?.error?.message}`);

        let shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

        const code = (lastDisconnect?.error as Boom)?.output?.statusCode;

        if (code == 403 || code == 401) {
            shouldReconnect = false;
            console.log('Сессия не валидна');

            sessionManager.removeSession();
            sessionManager.reconnect();
        }

        if (shouldReconnect) {
            sessionManager.reconnect();
        }
    }
}
