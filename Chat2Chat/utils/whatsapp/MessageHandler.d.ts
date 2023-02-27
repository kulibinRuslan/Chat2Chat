export declare class MessageHandler {
    client: any;
    constructor(_client: any);
    handleWhatsAppMessage(): Promise<void>;
}
