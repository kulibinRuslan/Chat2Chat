import { WhatsApp } from '../../clients/WhastApp';
import { delay } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';

export class MessageHandler {
    client;

    constructor (_client) {
        this.client = _client;
    }

    async handleWhastAppMessage() {
        this.client.ev.process(async (events) => {
            if (events['messages.upsert']) {
                const upsert = events['messages.upsert'];
                if (upsert.type === 'notify') {
                    for (const msg of upsert.messages) {
                        if (!msg.key.fromMe) {
                            await this.client.readMessages([msg.key]);
                        }
                    }
                }
            }
        });
    }
}