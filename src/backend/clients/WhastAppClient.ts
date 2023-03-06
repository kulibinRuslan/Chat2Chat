import { WhatsappMessageHandler } from '../utils/whatsapp/handlers/WhatsAppMessageHandler';
import { WhatsappUpdateHandler } from '../utils/whatsapp/handlers/WhatsAppUpdateHandler';
import { WhatsappErrorHandler } from '../utils/whatsapp/handlers/WhatsAppErrorHandler';
import makeWASocket, { useMultiFileAuthState } from '@adiwajshing/baileys';
import MAIN_LOGGER from '@adiwajshing/baileys/lib/Utils/logger';
import { ConfigStorage } from '../utils/ConfigStorage';
import { BaseClient } from './BaseClient';


export class WhatsappClient extends BaseClient {
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

        this.updateHandler = this.connectHandler(new WhatsappUpdateHandler(this.client));
        this.messageHandler = this.connectHandler(new WhatsappMessageHandler(this.client));
        this.errorHandler = this.connectHandler(new WhatsappErrorHandler(this.client));

        this.updateHandler.startHandler();

        this.on('open', () => {
            this.messageHandler.handleWhatsAppMessage();
        });

        this.on('close', (lastDisconnect) => {
            this.errorHandler.handleErrors(lastDisconnect);
        });
    }
}
