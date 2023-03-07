// ===============ТЕСТЫ ХАНДЛА СООБЩЕНИЙ ВАТСАПА===================УСПЕШНО

// import { ClientManager as Client, Messenger } from './backend/clients/ClientManager';

// function start1(){
//     let client = Client.connectToMessanger(Messenger.WHATSAPP);
//     client?.on('message', (msg) => {
//         console.log(msg);
//     });
// }

// start1();


import { WhatsappAccountRegistration } from "./backend/utils/whatsapp/WhatsappAccountRegistation";
import { TelegramMessageSender } from './backend/utils/telegram/TelegramMessageSender';
import { ClientManager as Client, Messenger } from './backend/clients/ClientManager';
import { TelegramClient } from './backend/clients/TelegramClient';
import { ConfigStorage } from "./backend/utils/ConfigStorage";

function start() {
    let client = Client.connectToMessanger(Messenger.TELEGRAM) as TelegramClient;
    client?.on('message', (msg) => {
        // console.log(msg);
    });

    client?.on('getId', (msg) => {
        TelegramMessageSender.sendId(client?.client, msg)
    })

    client?.on('saveqr', () => {
        TelegramMessageSender.sendImage(client?.client, ConfigStorage.adminID, codeSavePath)
    })

    client?.on('regWaNumber', () => {
        new WhatsappAccountRegistration().regNumber();
    })
}

start();
