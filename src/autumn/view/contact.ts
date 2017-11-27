import { bind } from "../../dom/dom";
import { css } from "../../css/css";

const nameID = "contact-name";
const emailID = "contact-email";
const messageID = "contact-message";

interface Data {
    name: string;
    inputName: HTMLInputElement;
    email: string;
    inputEmail: HTMLInputElement;
    message: string;
    inputMessage: HTMLTextAreaElement;
}
interface State {
    submit: Submit;
    header: Header;
    name: Name;
    email: Email;
    message: Message;
}
interface Submit {
    disable: boolean;
}
interface Header {
    title: string;
    isErrorNotice: boolean;
    isOKNotice: boolean;
}
interface Name {
    valid: boolean;
    hasValue: boolean;
    valueMissing: boolean; // no text
}
interface Email {
    valid: boolean;
    hasValue: boolean;
    valueMissing: boolean; // no text
    typeMismatch: boolean; // text not an email
}
interface Message {
    valid: boolean;
    hasValue: boolean;
    valueMissing: boolean; // no text
    tooShort: boolean;     // text less than minlength
}
interface tooShort {
    tooShort: boolean;
}
interface ValidityResult {
    data: Data;
    focusID: string;
    valid: boolean;
}

function initState(): State {
    return {
        submit: { disable: false },
        header: { title: "Ready for a change? Let’s get in touch.", isErrorNotice: false, isOKNotice: false },
        name: { valid: true, valueMissing: false, hasValue: false },
        email: { valid: true, valueMissing: false, typeMismatch: false, hasValue: false },
        message: { valid: true, valueMissing: false, tooShort: false, hasValue: false },
    }
}

export class Contact {
    private state: State;
    private readonly notAttached: boolean;
    private readonly html: (template: TemplateStringsArray, ...args : any[]) => string;

    constructor(root: HTMLElement|null) {
        this.state = initState();
        if (root) {
            this.notAttached = false;
            this.html = bind(root);
        } else {
            this.notAttached = true;
        }
    }
    private static trim(form: HTMLFormElement): Data {
        const nameInput = form[nameID] as HTMLInputElement;
        const name = nameInput.value.trim();
        nameInput.value = "x"; // A bug in Chrome.
        nameInput.value = name;

        const emailInput = form[emailID] as HTMLInputElement;
        const email = emailInput.value.trim();
        emailInput.value = "x"; // A bug in Chrome.
        emailInput.value = email;

        const messageInput = form[messageID] as HTMLTextAreaElement;
        const msg = messageInput.value.trim();
        messageInput.value = msg;

        return {
            name: name,
            inputName: nameInput,
            email: email,
            inputEmail: emailInput,
            message: msg,
            inputMessage: messageInput
        };
    }

    disableSubmit(): void { this.state.submit.disable = true; }
    enableSubmit(): void { this.state.submit.disable = false; }
    checkValidity(form: HTMLFormElement): ValidityResult {
        const data = Contact.trim(form);
        if (form.checkValidity()) {
            return { data: data, focusID: "", valid: true };
        }

        this.state.header = {
            title: "Please fill in all fields",
            isErrorNotice: true,
            isOKNotice: false };

        const inputName = data.inputName;
        const name = data.name;
        const nameIsValid =  inputName.validity.valid;
        this.state.name = {
            hasValue: (name.length !== 0),
            valid: nameIsValid,
            valueMissing: inputName.validity.valueMissing,
        };

        const inputEmail = data.inputEmail;
        const email = data.email;
        const emailIsValid =  inputEmail.validity.valid;
        this.state.email = {
            hasValue: (email.length !== 0),
            valid: emailIsValid,
            valueMissing: inputEmail.validity.valueMissing,
            typeMismatch: inputEmail.validity.typeMismatch
        };

        const inputMessage = data.inputMessage;
        const message = data.message;
        this.state.message = {
            hasValue: (message.length !== 0),
            valid: inputMessage.validity.valid,
            valueMissing: inputMessage.validity.valueMissing,
            tooShort: (inputMessage.validity as tooShort).tooShort
        };

        let focusID = messageID;
        switch (false) {
            case nameIsValid:
                focusID = nameID;
                break;
            case emailIsValid:
                focusID = emailID;
                break;
        }

        return { data: data, focusID: focusID, valid: false };
    }
    inputOnkeyup(e: Event): boolean {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.keyCode === 13) {
            // ignore enter (submits the form);
           return true;
        }
        const el = e.target as HTMLInputElement;
        switch (el.id) {
            case nameID:
                const name = initState().name;
                name.hasValue = (el.value.length !== 0);
                this.state.name = name;
                return true;
            case emailID:
                const email = initState().email;
                email.hasValue = (el.value.length !== 0);
                this.state.email = email;
                return true;
            case messageID:
                const message = initState().message;
                message.hasValue = (el.value.length !== 0);
                this.state.message = message;
                return true;
            default:
                return false;
        }
    }
    setErrMessage(message: string): void {
        this.state.header = { title: message, isErrorNotice: true, isOKNotice: false }
    }
    setOKMessage(form: HTMLFormElement): void {
        form.reset();
        this.state = initState();
        this.state.header = { title: "Thanks for your message!", isErrorNotice: false, isOKNotice: true }
    }

    render(): string {
        if (this.notAttached) { return ""; }

        const s = this.state;

        const header = s.header;
        const title = header.title;
        let headerClass = "contact-header";
        if (header.isOKNotice) {
            headerClass = `${headerClass} ${css.ok}`;
        }
        if (header.isErrorNotice) {
            headerClass = `${headerClass} ${css.error}`;
        }

        let nameField = css.formField;
        if (s.name.hasValue) {
            nameField = `${nameField} ${css.hasValue}`;
        }
        let nameErrorSpace = `${css.error} ${css.invisible}`;
        let nameMissing = `${css.error} ${css.hidden}`;
        if (!s.name.valid) {
            nameField = `${nameField} ${css.error}`;
            nameErrorSpace = `${css.error} ${css.hidden}`;
            if (s.name.valueMissing) {
                nameMissing = `${css.error} ${css.show}`;
            }
        }

        let emailField = css.formField;
        if (s.email.hasValue) {
            emailField = `${emailField} ${css.hasValue}`;
        }
        let emailErrorSpace = `${css.error} ${css.invisible}`;
        let emailTypeMismatch = `${css.error} ${css.hidden}`;
        if (!s.email.valid) {
            emailField = `${emailField} ${css.error}`;
            emailErrorSpace = `${css.error} ${css.hidden}`;
            if (s.email.valueMissing || s.email.typeMismatch) {
                emailTypeMismatch = `${css.error} ${css.show}`;
            }
        }

        let messageField = css.formField;
        if (s.message.hasValue) {
            messageField = `${messageField} ${css.hasValue}`;
        }
        let messageErrorSpace = `${css.error} ${css.invisible}`;
        let messageTooShort = `${css.error} ${css.hidden}`;
        if (!s.message.valid) {
            messageField = `${messageField} ${css.error}`;
            messageErrorSpace = `${css.error} ${css.hidden}`;
            if (s.message.valueMissing || s.message.tooShort) {
                messageTooShort = `${css.error} ${css.show}`;
            }
        }

        const disable = s.submit.disable;

        return this.html`
    <div class="contact-width">
        <form action="#" data-action="contactForm" class="contact-form" novalidate>
            <h2 id="contact-form-header" class="${headerClass}">${title}</h2>
            <div class="${nameField}">
                <input id="${nameID}" tabindex="1" data-action="contactInput" required type="text"/>
                <label for="${nameID}">Name</label>
                <span class="${nameErrorSpace}">visibility:hidden</span>
                <span class="${nameMissing}">we need your name</span>
            </div>
            <div class="${emailField}">
                <input id="${emailID}" tabindex="2" data-action="contactInput" required type="email"/>
                <label for="${emailID}">Email</label>
                <span class="${emailErrorSpace}">visibility:hidden</span>
                <span class="${emailTypeMismatch}">we need your email</span>
            </div>
            <div class="${messageField}">
                <textarea id="${messageID}" tabindex="3" data-action="contactInput" required minlength="5"></textarea>
                <label for="${messageID}">How can we help you?</label>
                <span class="${messageErrorSpace}">visibility:hidden</span>
                <span class="${messageTooShort}">you need to write something</span>
            </div>
             <footer>
                <button class="btn" tabindex="4" ype="submit" disabled="${disable}">Send Message</button>
            </footer>
        </form>
    </div>`;
    }
}

