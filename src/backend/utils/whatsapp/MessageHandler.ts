export class MessageHandler {
    static async handleWhatsAppMessage(client) {
        // client.ev.process(async (events) => {
        //     if (events['messages.upsert']) {
        //         const upsert = events['messages.upsert'];
        //         if (upsert.type === 'notify') {
        //             for (const msg of upsert.messages) {
        //                 if (!msg.key.fromMe && msg.isGroup) {
        //                     // Получаем информацию о группе по jid
        //                     const chat = await client.getChatById(msg.key.remoteJid);

        //                     // Проверяем имя группы
        //                     if (chat.name === 'Имя группы') {
        //                         await client.readMessages([msg.key]);
        //                         console.log(msg.message.conversation);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });
        client.ev.process(async (events) => {
            if (events['messages.upsert']) {
                const upsert = events['messages.upsert'];
                if (upsert.type === 'notify') {
                    for (const msg of upsert.messages) {
                        if (!msg.key.fromMe) {
                            await client.readMessages([msg.key]);
                            console.log([msg.message.conversation]);
                        }
                    }
                }
            }
        });
    }
}
