// ==============ТЕСТ РЕГИСТРАЦИИ АККАУНТА ВАТСАПА=================ВСЕ УСТАРЕЛО

// import { AccountRegistration } from './backend/utils/whatsapp/AccountRegistation';
// new AccountRegistration().regNumber();

// ===============ТЕСТЫ ХАНДЛА СООБЩЕНИЙ ВАТСАПА===================УСПЕШНО

import { ClientManager as Client, Messenger } from './backend/clients/ClientManager';

function start1(){
    let client = Client.connectToMessanger(Messenger.WHATSAPP);
    client?.on('message', (msg) => {
        console.log(msg);
    });
}

start1();

// ==============ТЕСТЫ ХАНДЛА СООБЩЕНИЙ ТЕЛЕГРАА===================УСПЕШНО

// import { ClientManager as Client, Messenger } from './backend/clients/ClientManager';

// async function start() {
//     let client = Client.connectToMessanger(Messenger.TELEGRAM);
//     client?.on('message', (msg) => {
//         console.log(msg);
//     });
// }

// start();

// =======================================================================
