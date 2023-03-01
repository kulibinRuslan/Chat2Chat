import { Telegram } from "../../clients/Telegram";


export class MessageHandler {
    static async handleTelegramMessage(client) {
        const groupName = /^Тесты для ботов$/i;

        client.on('message', (msg) => {
            if ((msg.chat.type === 'group' || msg.chat.type === 'supergroup') && groupName.test(msg.chat.title)) {
                console.log(`Новое сообщение в группе ${msg.chat.title}: ${msg.text}`);
            }
        });
    }
}


