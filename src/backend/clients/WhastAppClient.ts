import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from '@adiwajshing/baileys';
import { WhatsAppUpdateHandler } from '../utils/whatsapp/WhatsAppUpdateHandler';
import MAIN_LOGGER from '@adiwajshing/baileys/lib/Utils/logger';
import { BaseClient } from './BaseClient';


export class WhatsAppClient extends BaseClient {
    client;

    constructor() {
        super();
        this.connectToWhatsApp();
    }

    async connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState(this.saveSessionPath);
        const { version } = await fetchLatestBaileysVersion();

        BaseClient.sessionUpdate = saveCreds;

        const logger = MAIN_LOGGER.child({});
        logger.level = 'silent';

        this.client = makeWASocket({
            markOnlineOnConnect: true,
            syncFullHistory: false,
            version: version,
            logger: logger,
            auth: state,
        });

        // this.client = await new UpdateHandler().startHandler(this.client, saveCreds);
        
    }
}
