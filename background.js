'use strict';
const gettingStarted = "https://github.com/Cenngo/Ninova-Beautifier/wiki/Getting-Started";
const changeLog = "https://github.com/Cenngo/Ninova-Beautifier/wiki/Change-Log";
const showChangeLog = false;
const showGettingStarted = true;

const defaults = {
    bgImg: "https://external-preview.redd.it/sE0hV3Uv1HO_sUtL9JWe1iqJNm7m4T0RtZ3vQQuBilA.jpg?auto=webp&s=da6a6333d3273ddbea5692e473bdac7cdcbd7e28",
    opacity: 50,
    bgColor:"#282828",
    hlColor: "#dc143c",
    textColor: "#ffffff",
    mainColor: "#ffffff",
    lessonColor: "#ffffff",
    headerColor: "#ff7f50",
    accent: "#1e90ff",
    accentS: "#8a2be2",
    showLogo: false,
    showCaptions: false,
    unlockZoom: false
};

chrome.runtime.onUpdateAvailable.addListener(function(details){

});

chrome.runtime.onStartup.addListener(function(){

});

chrome.runtime.onInstalled.addListener(function(details){
    Log("Extension installed, going over initialization routine.");

    injectDefaults();

    if(details.reason == "install" && showGettingStarted){
        
        chrome.tabs.create({
            active:true,
            url: gettingStarted
        });
    }
    else if(details.reason == "update" && showChangeLog){

        chrome.tabs.create({
            active:true,
            url: changeLog
        });
    }

    chrome.contextMenus.create({
        contexts: ['page'],
        documentUrlPatterns:["https://ninova.itu.edu.tr/*"],
        id: "optns",
        enabled:true,
        title: "Customize Page",
        type: 'normal',
        visible:true
    });
});

chrome.contextMenus.onClicked.addListener(handleContext);
chrome.runtime.onMessage.addListener(handleMessage)

function handleContext(info, tab){
    Log(`Context Menu Clicked: ${info.menuItemId}`);
    switch (info.menuItemId) {
        case "optns":
            chrome.runtime.openOptionsPage();
            break;
    
        default:
            Log(`Unhandled context menu: ${info}`);
            break;
    }
}

function handleMessage(message, sender, sendResponse){
    switch (message.id) {

        default:
            Log(`Unhandled message: ${sender} ${message}`);
            break;
    }
}

function injectDefaults(){
    chrome.storage.local.get(storedVariables, function(result){
        Log("Injecting default settings.")
        chrome.storage.local.set(defaults, function(){
            Log("Successfully injected default settings.");
            chrome.storage.local.set(result, function(){});
        });
    });
}

function Log(message){
    console.log(`[${extensionName}] - ${message}`);
}