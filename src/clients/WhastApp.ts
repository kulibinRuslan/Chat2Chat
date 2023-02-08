import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion} from '@adiwajshing/baileys';
import MAIN_LOGGER from '@adiwajshing/baileys/lib/Utils/logger';
import { ConfigStorage } from '../utils/ConfigStorage';


export class WhatsApp {
    isRegister: boolean;

    constructor(_isRegister = false) {
        this.isRegister = _isRegister
    }

    async connectToWhatsApp() {
        const { state } = await useMultiFileAuthState(
           ConfigStorage.saveSessionPath
        );
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

        return client;
    }
}