"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTemplate = void 0;
const actions_on_google_1 = require("actions-on-google");
const actionssdk_1 = require("actions-on-google/dist/service/actionssdk");
const template_utils_1 = require("../template.utils");
const UrlUtils_1 = require("../UrlUtils");
class ActionTemplate {
    constructor(input) {
        this.hasRoundScreen = false;
        this.input = input;
        this.hasDisplay = this.input.screen;
    }
    askNotification(intentName) {
        this.input.ask(new actionssdk_1.UpdatePermission({
            intent: intentName,
        }));
    }
    playAudio(url, title, subtitle, img, backgroundImg, token, offset) {
        this.input.ask(new actions_on_google_1.MediaObject({
            name: title,
            url: UrlUtils_1.formatUrlHttps(url),
            description: subtitle,
            icon: new actions_on_google_1.Image({
                url: img,
                alt: title,
            }),
        }));
    }
    playLater(url, title, subtitle, img, backgroundImg, token, offset) {
        //TODO
    }
    stopAudio(close) {
        //TODO
        this.input.close();
    }
    card(title, message, image) {
        this.input.ask(this.basicCard(title, message, image));
    }
    suggestions(suggestions) {
        if (suggestions && suggestions.length > 0) {
            this.input.ask(new actionssdk_1.Suggestions(suggestions));
        }
        else {
            console.log('No suggestions supplied');
        }
    }
    simpleMessage(message, reprompt, close) {
        // simple check if have to add speak balise
        message = message.trim();
        if (template_utils_1.isAudio(message) && !message.startsWith('<speak')) {
            message = template_utils_1.addSpeakBalise(message);
        }
        if (close) {
            this.input
                .close(message);
        }
        else {
            console.log('Add message to response ' + message);
            this.input
                .ask(message);
        }
        if (reprompt) {
            this.input.data['reprompt'] = reprompt;
        }
    }
    error(msg) {
        this.input
            .close(msg);
    }
    help(msg, actionsList) {
        this.input
            .ask(msg);
        if (this.hasDisplay && actionsList && actionsList.length > 0) {
            this.input.ask(new actionssdk_1.Suggestions(actionsList));
        }
    }
    list(title, touchToken, items) {
        const list = new actions_on_google_1.List({
            title: title,
            items: this.getItems(items)
        });
        this.input.ask(list);
    }
    interactiveCanvas(url, closeMic = false, data) {
        this.input.ask(new actionssdk_1.HtmlResponse({ url: url, suppress: closeMic, data: data }));
    }
    getItems(items) {
        const it = {};
        items.forEach(i => {
            const syn = (i.synonyms && i.synonyms.length > 0) ? i.synonyms : [i.key, i.value];
            it[i.key] = {
                synonyms: Array.from(new Set(syn)),
                title: i.value,
                description: i.value2,
                image: new actions_on_google_1.Image({
                    url: i.icon,
                    alt: 'icon'
                })
            };
        });
        return it;
    }
    basicCard(title, text, imgUrl) {
        const card = new actionssdk_1.BasicCard({
            text: text,
            title: title,
            display: 'CROPPED',
        });
        if (imgUrl) {
            card.image = new actions_on_google_1.Image({
                url: imgUrl,
                alt: title,
            });
        }
        return card;
    }
}
exports.ActionTemplate = ActionTemplate;
//# sourceMappingURL=ActionTemplate.js.map