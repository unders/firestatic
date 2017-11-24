import { bind } from "../../dom/dom";
import { css } from "../../css/css";

const emailID = "contact-email";
const messageID = "contact-message";

interface Data {
    email: string;
    inputEmail: HTMLInputElement;
    message: string;
    inputMessage: HTMLTextAreaElement;
}
interface State {
    submit: Submit;
    email: Email;
    message: Message;
}
interface Submit {
    disable: boolean;
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
        const emailInput = form[emailID] as HTMLInputElement;
        const email = emailInput.value.trim();
        emailInput.value = "x"; // A bug in Chrome.
        emailInput.value = email;

        const messageInput = form[messageID] as HTMLTextAreaElement;
        const msg = messageInput.value.trim();
        messageInput.value = msg;

        return {
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

        let focusID = emailID;
        if (emailIsValid) {
            focusID = messageID;
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
    setErrMessage(msg: string): void {
        // show error message at top of form (like facebook, closable)
        console.log(`showErrMessage(${msg}`);
    }
    setOKMessage(form: HTMLFormElement): void {
        // show success at top of form (like facebook, closable)
        form.reset();
        this.state = initState();
    }

    render(): string {
        if (this.notAttached) { return ""; }

        const s = this.state;

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
        <h2 class="contact-header">Ready for a change? Let’s get in touch.</h2>
        <form action="#" data-action="contactForm" class="contact-form" novalidate>
            <div class="${emailField}">
                <input id="${emailID}" tabindex="1" data-action="contactInput" required type="email"/>
                <label for="${emailID}">Your Email</label>
                <span class="${emailErrorSpace}">visibility:hidden</span>
                <span class="${emailTypeMismatch}">we need your email</span>
            </div>
            <div class="${messageField}">
                <textarea id="${messageID}" tabindex="2" data-action="contactInput" required minlength="5"></textarea>
                <label for="${messageID}">How can we help you?</label>
                <span class="${messageErrorSpace}">visibility:hidden</span>
                <span class="${messageTooShort}">you need to write something</span>
            </div>
             <footer>
                <button class="btn" tabindex="3" ype="submit" disabled="${disable}">Send Message</button>
            </footer>
        </form>
    </div>`;
    }
}

