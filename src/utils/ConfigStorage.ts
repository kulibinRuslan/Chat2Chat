import { readFileSync } from 'fs';
import { parse } from 'ini';

const iniFile = parse(readFileSync('src/data/settings.ini', 'utf-8'));

export abstract class ConfigStorage {
    public static codeSavePath: string = iniFile.codeSavePath;
    public static saveSessionPath: string = iniFile.saveSessionPath;
}
