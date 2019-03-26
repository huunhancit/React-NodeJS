

export default class Utils {

  public static isNotEmpty(value: any) {
    return value && value.length > 0;
  }

  public static isEmpty(value: any) {
    return !this.isNotEmpty(value);
  }
}