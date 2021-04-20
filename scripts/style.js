const style = document.documentElement.style;

window.addEventListener('load', onWindowLoad);

chrome.storage.local.get(storedVariables, (result) =>{

    style.setProperty("--background", `url(${result.bgImg})`);
    setBGColor(result.bgColor);
    style.setProperty("--opacity", result.opacity / 100);

    storedVariables.forEach(variable => {
        if(variable === 'bgImg' || variable === 'bgColor' || variable === 'opacity' || variable === 'showLogo' || variable === 'showCaptions' || variable === 'unlockZoom')
            return;
        
        style.setProperty(`--${variable}`, result[variable])
    });
});

function onWindowLoad(){
    document.querySelector('head > link[rel="stylesheet"]').remove();
    createLogo();
    installCaptions();
}

function setBGColor(hex){
    var r = hex.substring(1,3);
    var g = hex.substring(3,5);
    var b = hex.substring(5,7);

    style.setProperty("--bgR", parseInt(r, 16));
    style.setProperty("--bgG", parseInt(g, 16));
    style.setProperty("--bgB", parseInt(b, 16));
}

function createLogo(){
    chrome.storage.local.get(['showLogo'], function(result){
        if(result.showLogo == true){
            var tepe = document.getElementsByClassName("tepe")[0];
            var img = document.createElement('img');
            img.src = chrome.runtime.getURL("icons/icon128.png");
            img.id = "logo";
            tepe.appendChild(img);
        }
    });
}

function installCaptions(){
    chrome.storage.local.get(['showCaptions'], function(result){
        if(result.showCaptions == true){
            console.log(`[${extensionName}] - Injecting captions script.`)
            var script = document.createElement('script');
            script.src = chrome.runtime.getURL("captions.js");
            document.body.appendChild(script);
        }
    });
}