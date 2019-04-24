import { Result } from "./Result";

export class Login extends Result {
    token: string;
    userInfo: any;

    constructor(status: number, message: string, token: string, userInfo: any) {
        super();
        this.setValue(status, message);
        this.token = token;
        this.userInfo = userInfo;
    }
}