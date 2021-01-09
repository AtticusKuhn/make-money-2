import { myWindow } from '../types';
// import autoRefresh from './autoRefresh';
/*
    rip I must have every function in 1 file unitll I figure out how to use webpack
    */

const inject = (config: any): void => {
    if (window.location.href === 'https://www.conflictnations.com/game.php?bust=1') {
        return;
    }
    function autoRefresh(config: any) {
        setInterval(() => {
            console.log('interval checking...');
            if (!window.chromeStorage.autoRefresh) {
                return; // only execute if this setting has been enabled
            }
            const games_button = document.querySelector('#ui_open_new_games');
            games_button.click();
        }, 1e3);
        // if(!window.locatio)
        console.log('auto refresh function');
    }
    const Mwindow = (window as unknown) as myWindow;
    Mwindow.chromeStorage = config;
    console.log('injected');
    // console.log(hup.config.user);
    // Mwindow.hup = {
    //     aInternal: {},
    //     aListener: (val: any) => {},
    //     set a(val) {
    //         this.aInternal = val;
    //         this.aListener(val);
    //     },
    //     get a() {
    //         return this.aInternal;
    //     },
    //     registerListener: function (listener: any) {
    //         this.aListener = listener;
    //     },
    // };
    setTimeout(() => {
        console.log(Mwindow.hup); // this is the good info
        autoRefresh(config);
        // eval(`(${autoRefresh.toString()})(${JSON.stringify(config)})`);
    }, 1000);
};
export default inject;
