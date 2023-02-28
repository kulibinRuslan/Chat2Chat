import { readFileSync } from 'fs';
import { parse } from 'ini';

const iniFile = parse(readFileSync('backend/data/settings.ini', 'utf-8'));

export abstract class ConfigStorage {
    constructor() {

    }

    protected codeSavePath: string = iniFile.codeSavePath;
    protected saveSessionPath: string = iniFile.saveSessionPath;

    static isRegister = false;
}
