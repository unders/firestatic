import { env } from '../../env/env'

export interface Config {
    readonly online: boolean
}

export const getConfig = function(): Config {
    return {
        online: env.online
    }
};
