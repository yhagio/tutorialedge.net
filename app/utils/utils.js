export default class Utils {
    constructor() {
        this.checkBrowser();
    }

    checkBrowser() {
        let ua = navigator.userAgent.toLowerCase();
        var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
}