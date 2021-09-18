export interface myWindow {
    hup: any;
    chromeStorage: { [key: string]: string };
}
export type chromeStorage = {
    money: number;
}
export enum upgradeType {
    item,
    button,
    upgrade,
}