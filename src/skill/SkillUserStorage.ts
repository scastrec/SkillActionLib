/******
 * Some vars has been added to storage because session removed while 
 *
 * 1. SessionStorage.PodcastListOffset : Offset in list podcast intent.
 */
import { HandlerInput } from 'ask-sdk';

import { UserStorage } from '../UserStorage';

export class SkillUserStorage implements UserStorage {

    input: HandlerInput;

    constructor(input: HandlerInput) {
        this.input = input;
    }

    async getItem(key: string): Promise<any> {
        const storage = await this.getLongTimeStorage();
        console.log({storage});
        return storage[key];
    }

    async setItem(key: string, value: any): Promise<any> {
        const storage = await this.getLongTimeStorage()
        storage[key] = value;
    }

    private getLongTimeStorage = async (): Promise<{ [key: string]: any }> => {
        let attributes = await this.input.attributesManager.getPersistentAttributes();
        if (attributes === undefined || Object.keys(attributes).length === 0) {
            attributes = {
                tip: ''
            }
            this.input.attributesManager.setPersistentAttributes(attributes);
        }
        return attributes;
    }

    /** called automatically when using ResponseInterceptor PersistenceSavingResponseInterceptor */
    saveLongTimeStorage = async () => {
        await this.input.attributesManager.savePersistentAttributes();
    }

    
    clear = async () => {
        const storage = await this.getLongTimeStorage();
        storage.started = [];
        storage.lastPlayed = undefined;
    }
}
