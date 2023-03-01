import { readFileSync } from 'fs';
import { parse } from 'ini';

const iniFile = parse(readFileSync('backend/data/config.ini', 'utf-8'));

export abstract class ConfigStorage {
    protected codeSavePath: string = iniFile.whatsapp.codeSavePath;
    protected saveSessionPath: string = iniFile.whatsapp.saveSessionPath;

    protected BOT_TOKEN: string = iniFile.telegram.BOT_TOKEN;

    protected static isRegister = false;
}
