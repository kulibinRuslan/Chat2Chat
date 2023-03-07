import { BaseHandler } from '../BaseHandler';

export class TelegramMessageHandler extends BaseHandler {
    handleTelegramMessage() {
        this.client.onText(/\/get/, (msg) => {
            this.handle('getId', msg)
        });

        this.client.onText(/\/reg/, (msg) => {
            this.handle('regWaNumber', msg)
        });

        this.client.on('message', (msg) => {
            this.handle('message', msg);
        });
    }
}


            // if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
            //    this.handle('getid', msg)
            // }
