import { Logger } from "../log/log";
import { Contact } from "./view/contact";
import { Domain } from "./domain/domain";
import { FormHelper } from "../form/form";

class View {
    readonly contact: Contact;

    constructor(log: Logger) {
        const contact = document.getElementById("contact-form");
        this.contact = new Contact(contact);
        if (!contact) {
            log.info("id='#contact-form' not found on page");
        }
    }

    render() {
        this.contact.render();
    }
}

interface Context {
    logger: Logger;
    domain: Domain;
}

export class App {
    private readonly logger: Logger;
    private readonly view: View;
    private readonly domain: Domain;
    private readonly formHelper: FormHelper;

    constructor(ctx: Context) {
        this.logger = ctx.logger;
        this.view = new View(ctx.logger);
        this.domain = ctx.domain;
        this.formHelper = new FormHelper(ctx.logger);
        this.render();
    }

    //
    // ContactForm Start
    //
    contactFormOnsubmit(e: Event, form: HTMLFormElement): void {
        e.preventDefault();
        const contact = this.view.contact;
        contact.disableSubmit();
        this.render();
        this.logger.info("Action: contactFormOnSubmit");

        const { data, focusID, valid } = contact.checkValidity(form);
        if (!valid) {
            this.logger.info("Form Invalid: show form errors");
            contact.enableSubmit();
            this.render();
            this.formHelper.focus(form, focusID);
            return;
        }

        const err = this.domain.contact().send(data);
        if (err) {
            this.logger.info(`Post: Error; server error: ${err}`);
            contact.setErrMessage(err);
            scrollTo("#contact-form-header");
        } else {
            this.logger.info("Post: OK");
            contact.setOKMessage(form);
            scrollTo("#contact-form-header");
        }
        contact.enableSubmit();
        this.render();
    }
    contactInputOnkeyup(e: Event) {
        const contact = this.view.contact;
        if (!contact.inputOnkeyup(e)) {
            this.logger.error(`inputOnkeyup ${e.target} failed`);
        }
        this.render();
    }
    //
    // ContactForm End
    //

    render() {
        this.view.render();
    }
}

function scrollTo(hash: string) {
    location.hash = "#xxxxxxxxxxxxxxxxxxxxxxxx";
    location.hash = hash;
}
