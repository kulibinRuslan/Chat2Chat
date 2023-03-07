import { BaseHandler } from '../../BaseHandler';

export class WhatsappMessageHandler extends BaseHandler {
    async handleWhatsAppMessage() {
        this.client.ev.process(async (events) => {
            if (events['messages.upsert']) {
                const upsert = events['messages.upsert'];
                if (upsert.type === 'notify') {
                    for (const msg of upsert.messages) {
                        if (!msg.key.fromMe) {
                            this.client.readMessages([msg.key]);
                            this.handle('message', msg.message.conversation);
                        }
                    }
                }
            }
        });
    }
}
