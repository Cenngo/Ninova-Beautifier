chrome.storage.local.get(["unlockZoom"], function(result){
    if(result.unlockZoom){
        console.log(`[${extensionName}] - Injecting context menu unlock script.`);
        window.addEventListener('contextmenu', function(event) { event.stopPropagation();}, true);
    }
    else{
        console.log(`[${extensionName}] - Skipping context menu unlock script injection.`);
    }
});