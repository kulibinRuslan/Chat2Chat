export abstract class BaseHandler {
    private subscribed: any[] = [];
    protected client;

    constructor(_client) {
        this.client = _client;
    }

    subscribe(event, func) {
        this.subscribed.push([event, func]);
    }

    handle(event, data) {
        for (let i of this.subscribed.filter((x) => x[0] == event)) {
            i[1](data);
        }
    }
}
