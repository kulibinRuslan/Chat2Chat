import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from '@adiwajshing/baileys';
import { WhatsAppMessageHandler } from '../utils/whatsapp/handlers/WhatsAppMessageHandler';
import { WhatsAppUpdateHandler } from '../utils/whatsapp/handlers/WhatsAppUpdateHandler';
import { WhatsAppErrorHandler } from '../utils/whatsapp/handlers/WhatsAppErrorHandler';
import MAIN_LOGGER from '@adiwajshing/baileys/lib/Utils/logger';
import { BaseClient } from './BaseClient';
import { ConfigStorage } from '../utils/ConfigStorage';

export class WhatsAppClient extends BaseClient {
    client;
    updateHandler;
    messageHandler;
    errorHandler;

    constructor() {
        super();
        this.initialize();       
    }

    async connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState(this.saveSessionPath);

        ConfigStorage.sessionUpdate = saveCreds;

        const logger = MAIN_LOGGER.child({});
        logger.level = 'silent';

        this.client = makeWASocket({
            markOnlineOnConnect: true,
            syncFullHistory: false,
            logger: logger,
            auth: state,
        });
    }

    async initialize() {
        await this.connectToWhatsApp();

        this.updateHandler = this.connectHandler(new WhatsAppUpdateHandler(this.client));
        this.messageHandler = this.connectHandler(new WhatsAppMessageHandler(this.client));
        this.errorHandler = this.connectHandler(new WhatsAppErrorHandler(this.client));

        this.updateHandler.startHandler();

        this.on('open', () => {
            this.messageHandler.handleWhatsAppMessage();
        });

        this.on('closed', (lastDisconnect) => {
            this.errorHandler.handleErrors(lastDisconnect);
        });
    }
}
