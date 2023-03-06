import { readFileSync } from 'fs';
import { parse } from 'ini';

const configFile = parse(readFileSync('backend/data/config.ini', 'utf-8'));
const mailSettingsFile = parse(readFileSync('backend/data/mailSettings.ini', 'utf-8'));

export abstract class ConfigStorage {
    protected codeSavePath: string = configFile.whatsapp.codeSavePath;
    protected saveSessionPath: string = configFile.whatsapp.saveSessionPath;

    protected BOT_TOKEN: string = configFile.telegram.BOT_TOKEN;

    public static isRegister = false;

    public static sessionUpdate;
}
