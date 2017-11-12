export interface Logger {
    info(data: any): void
    error(data: any): void
}

class NoLog {
    static info(data: any): void { /* no operation when online */ }
    static error(data: any): void { /* no operation when online */ }
}

class Log {
    static info(data: any): void {
        console.info(data);
    }
    static error(data: any): void {
        console.error(data);
    }
}

interface Context {
    readonly online: boolean;
}

export const log = function(ctx: Context): Logger {
    if (ctx.online) {
        return NoLog;
    }

    return Log;
};
