// Runs before first paint (inlined in <head>) so a saved dark theme doesn't flash light.
// Kept free of React imports so the server-rendered layout can use it.
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem("skillguide:theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;
