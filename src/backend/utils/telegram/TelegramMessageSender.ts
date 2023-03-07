import { BaseHandler } from "../BaseHandler";

export class TelegramMessageSender {

    static sendMessage(client, msg) {
        
    }

    static sendId(client, msg) {
        let message = `ID текущего чата: \`${msg.chat.id}\``
        client.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
    }

    static updateMessage(client, chatId, text) {}

    static sendImage(client, chatId, pathToImage) {
        client.sendPhoto(chatId, pathToImage);
    }

    static updateImage(pathToImage, chatId) {}

    static deleteImage(pathToImage, chatId) {}
}
