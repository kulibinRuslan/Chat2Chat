import { BaseHandler } from '../BaseHandler';

export class TelegramMessageHandler extends BaseHandler {
    async handleTelegramMessage() {
        // const groupName = /^Тесты для ботов$/i;

        this.client.on('message', (msg) => {
            if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
                this.handle('message', msg.text);
            }
        });
    }
}
