import { Logger } from "../log/log";
import { App } from "./app";

interface Context {
    readonly app: App;
    readonly logger: Logger;
}

const name: string = "data-action";

export class ActionHandler {
    private readonly app: App;
    private readonly logger: Logger;

    [key: string]: any;

    constructor(ctx: Context) {
        this.app = ctx.app;
        this.logger = ctx.logger;
        document.body.addEventListener('submit', this);
        document.body.addEventListener('keyup', this);
    }

    handleEvent(event: Event): any {
        try {
            const ct = event.target as Element;
            if ('getAttribute' in ct) {
                const action = ct.getAttribute(name);
                if (action) {
                    this[action + 'On' + event.type](event);
                }
            }
        } catch(e) {
            this.logger.error(e);
        }
    }

    //
    // ContactForm Start
    //
    contactFormOnsubmit(e: Event): void {
        try {
            const form = e.target as HTMLFormElement;
            this.app.contactFormOnsubmit(e, form);
        } catch(e) {
            // TODO: show a global error notice.
            this.logger.error("ContactFormOnsubmit Error");
            this.logger.error(e);
        }
    }
    contactInputOnkeyup(e: Event): void {
        try {
            this.app.contactInputOnkeyup(e);
        } catch(e) {
            // error is ignored; nothing we can do about it...
            this.logger.error("ContactInputOnkeyup Error");
            this.logger.error(e);
        }
    }
    //
    // ContactForm End
    //

    cleanup() {
        document.body.removeEventListener('submit', this);
        document.body.removeEventListener('keyup', this);
    }
}
