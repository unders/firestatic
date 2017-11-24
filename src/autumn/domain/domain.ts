import { Logger } from "../../log/log";

interface Context {
    logger: Logger;
}

export class Domain {
    private readonly domainContact: Contact;

    constructor(ctx: Context) {
        this.domainContact = new Contact(ctx.logger);
    }

    contact(): Contact {
        return this.domainContact;
    }
}

interface Data {
    email: string
    message: string
}

class Contact {
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    send(data: Data): string|null {
        this.logger.info(data);
        return null;
    }
}
