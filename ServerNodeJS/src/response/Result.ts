


export class Result {
  status: number;
  message: string;

  constructor() {
    this.message = '';
    this.status = 200;
  }

  public setValidate(message: string): void {
    this.status = 405;
    this.message = message;
  }

  public setSuccess(message: string): void {
    this.status = 200;
    this.message = message;
  }

  public setError(message: string): void {
    this.status = 500;
    this.message = message;
  }

  public setValue(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}