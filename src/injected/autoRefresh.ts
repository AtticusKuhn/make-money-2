export default function autoRefresh(config) {
    if (!window.chromeStorage.autoRefresh) {
        return; // only execute if this setting has been enabled
    }
    setInterval(() => {
        const games_button = document.querySelector('#ui_open_new_games');
        games_button.click();
    }, 1e3);
    // if(!window.locatio)
    console.log('auto refresh function');
}
