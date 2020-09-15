module.exports = class ButtonMiddleware {
    #middleware;
    use(...args) {
        return this.#middleware[this.#middleware.default](...args);
    }
    call(fn, ...args) {
        return this.#middleware[fn](...args);
    }
    async send(fn, ...args) {
        return this.#middleware[fn](...args);
    }
    constructor(calls, def) {
        this.#middleware = calls;
        this.#middleware.default = def;
    }
}