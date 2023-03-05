// ==============ТЕСТ РЕГИСТРАЦИИ АККАУНТА ВАТСАПА=================УСПЕШНО

// import { AccountRegistration } from './backend/utils/whatsapp/AccountRegistation';
// new AccountRegistration().regNumber();

// ===============ТЕСТЫ ХАНДЛА СООБЩЕНИЙ ВАТСАПА===================УСПЕШНО

// import { ClientManager as Client, Messenger } from './backend/clients/ClientManager';
// import { MessageHandler as WhastAppMessageHandler } from './backend/utils/whatsapp/MessageHandler';

// async function start1(){
//     let client = await Client.connectToMessanger(Messenger.WHATSAPP);
//     WhastAppMessageHandler.handleWhatsAppMessage(client);
// }

// start1();

// ==============ТЕСТЫ ХАНДЛА СООБЩЕНИЙ ТЕЛЕГРАА===================ВСЕ СЛОМАЛОСЬ НАХУЙ

import { ClientManager as Client, Messenger } from './backend/clients/ClientManager';

async function start() {
    let client = await Client.connectToMessanger(Messenger.TELEGRAM);
    client?.on('message', (msg) => {
        console.log(msg)
    });
}

start();

// =======================================================================
