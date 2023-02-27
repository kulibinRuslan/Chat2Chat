import { ConfigStorage } from '../ConfigStorage';
export declare class UpdateHandler extends ConfigStorage {
    saveCreds: any;
    client: any;
    constructor(_client: any, _saveCreds: any);
    saveQr(qr: any): Promise<void>;
    remove(): Promise<void>;
    reconnect(): Promise<void>;
    startHandler(): Promise<void>;
}
