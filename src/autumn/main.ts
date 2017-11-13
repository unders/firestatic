import { getConfig } from "./config/config";
import { log } from "../log/log";

const main = () => {
    const config = getConfig();
    const logger = log({ online: config.online });
    logger.info("it still works!");
};

main();
