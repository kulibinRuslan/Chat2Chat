import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from '@adiwajshing/baileys';
import MAIN_LOGGER from '@adiwajshing/baileys/lib/Utils/logger';
import { UpdateHandler } from '../utils/whatsapp/UpdateHandler';
import { ConfigStorage } from '../utils/ConfigStorage';

export class WhatsApp extends ConfigStorage {
    async connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState(this.saveSessionPath);
        const { version } = await fetchLatestBaileysVersion();

        const logger = MAIN_LOGGER.child({});
        logger.level = 'silent';

        const client = makeWASocket({
            markOnlineOnConnect: true,
            syncFullHistory: false,
            version: version,
            logger: logger,
            auth: state,
        });

        new UpdateHandler(client, saveCreds).startHandler();
    }
}