import { log } from "../log/log";

const main = () => {
    const logger = log({ online: false });
    logger.info("it works, yes");
};

main();
