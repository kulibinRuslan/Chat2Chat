import { ConfigStorage } from '../ConfigStorage';
export declare class UpdateHandler extends ConfigStorage {
    saveQr(qr: any): Promise<void>;
    remove(): Promise<void>;
    reconnect(): Promise<void>;
    startHandler(client: any, saveCreds: any): Promise<void>;
}
