import { readFileSync } from 'fs';
import { parse } from 'ini';

const iniFile = parse(readFileSync('src/data/settings.ini', 'utf-8'));

export abstract class ConfigStorage {
    protected codeSavePath: string = iniFile.codeSavePath;
    protected saveSessionPath: string = iniFile.saveSessionPath;

    protected isRegister = false;
}
