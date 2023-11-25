/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */

function iniciarApp(){
  chrome.app.window.create('index.html', {
    alwaysOnTop: true,
    frame: 'none',
    id: 'main',
    resizable: false,
    outerBounds: { // 'bounds' is deprecated, and you want full window size
      width: 220,
      height: 29,
      left: screen.availWidth - 500,//screen.availWidth - windowWidth,
      top:  screen.availHeight - 38,//screen.availHeight - 29,
    }
  });
  //chrome.app.window
}


//chrome.runtime.onInstalled.addListener(iniciarApp); //Si agrego esto funciona mal :(
chrome.app.runtime.onLaunched.addListener(iniciarApp);
chrome.runtime.onStartup.addListener(iniciarApp);
chrome.runtime.onUpdateAvailable.addListener(function () {
  chrome.runtime.reload();
});
 


 