import { Directive } from 'ask-sdk-model';
import { HandlerInput } from 'ask-sdk';
import { Template } from '../Template';
export declare class SkillTemplate implements Template {
    input: HandlerInput;
    hasApl: boolean;
    readonly hasDisplay: boolean;
    readonly hasRoundScreen: boolean;
    constructor(input: HandlerInput);
    private addBackground;
    askNotification(): void;
    playAudio(url: string, title: string, subtitle: string, img: string, backgroundImg: string, token: string, offset: number): void;
    playLater(url: string, title: string, subtitle: string, img: string, backgroundImg: string, token: string, offset: number): void;
    stopAudio(close: boolean): void;
    suggestions(suggestions: Array<string>): void;
    card(title: string, message: string, image: string): void;
    simpleMessage(message: string, reprompt: string, close: boolean): void;
    /**
     * Add list only if hasAPL or hasDisplay
     * First, try APL, then display which is deprecated
     * @param title
     * @param tokenTouch
     * @param items
     */
    list(title: string, tokenTouch: string, items: Array<{
        key: string;
        value: string;
        value2?: string;
        icon?: string;
    }>, backgroundImage?: {
        url: string;
        desc: string;
    }, backgroundColor?: string): void;
    addApl: (directive: Directive) => void;
    error(): void;
    private mapItems;
    private mapAplItems;
}
