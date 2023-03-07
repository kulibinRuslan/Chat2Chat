import { readFileSync } from 'fs';
import { parse } from 'ini';

const configFile = parse(readFileSync('backend/data/config.ini', 'utf-8'));
const mailSettingsFile = parse(readFileSync('backend/data/mailSettings.ini', 'utf-8'));

export abstract class ConfigStorage {
    public codeSavePath: string = configFile.whatsapp.codeSavePath;
    public saveSessionPath: string = configFile.whatsapp.saveSessionPath;

    public static BOT_TOKEN: string = configFile.telegram.BOT_TOKEN;
    public static adminID = configFile.telegram.adminID;

    public static isRegister = false;

    public static sessionUpdate;
}
