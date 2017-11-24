import { Logger } from "../log/log";

export class FormHelper {
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    focus(form: HTMLFormElement, id: string): void {
        const input = form[id] as HTMLInputElement;
        if (input) {
            input.focus();
        } else {
            this.logger.error(`focus on form id: ${id} failed`);
        }
    };
}
