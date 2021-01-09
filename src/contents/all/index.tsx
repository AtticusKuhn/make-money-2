import './style.scss';
import inject from '../../injected/script';
import { myWindow } from '../../types';

/*
    note that this will throw an error in the extension
    console for being unsafe but don't worry it will still run
    on the main CoN page .
*/
function injectCode(code: string): void {
    if (window.location.href === 'https://www.conflictnations.com/game.php?bust=1') {
        return;
    }
    const injectionScript = document.createElement('script');
    injectionScript.setAttribute('type', 'text/javascript');
    injectionScript.innerHTML = code;
    injectionScript.addEventListener('load', () => {
        injectionScript.remove();
    });
    document.head.append(injectionScript); //help me
}

chrome.storage.sync.get(null, function (storageItems) {
    injectCode(`(${inject.toString()})(${JSON.stringify(storageItems)})`);
});

const injectedConfigSetter = (config: any) => {
    ((window as unknown) as myWindow).chromeStorage = config;
    console.log('setting config');
};
export function setConfig(config: any): void {
    // console.log('setConfig called');
    injectCode(`(${injectedConfigSetter.toString()})(${JSON.stringify(config)})`);
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
    console.log('revieced a message');
    setConfig(request);
    // if (request.greeting == 'hello') sendResponse({ farewell: 'goodbye' });
});
export default setConfig;
