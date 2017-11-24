import { getConfig } from "./config/config";
import { log } from "../log/log";
import { Domain } from "./domain/domain";
import { ActionHandler } from "./actions";
import { App } from "./app";


const main = () => {
    const config = getConfig();
    const logger = log({ online: config.online });
    logger.info("init app start");

    const domain = new Domain({ logger: logger });
    const app = new App({ logger: logger, domain: domain });
    new ActionHandler({ app: app, logger: logger });

    logger.info("init app done");
};

main();
