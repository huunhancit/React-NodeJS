import { Result } from "./Result";

export class Login extends Result {
    token: string;

    constructor(status: number, message: string, token: string) {
        super();
        this.setValue(status, message);
        this.token = token;
    }
}