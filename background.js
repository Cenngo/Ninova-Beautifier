'use strict';

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        injectDefaults();
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

    chrome.tabs.create({
        active:true,
        url: "https://github.com/Cenngo/Ninova-Beautifier/wiki/Getting-Started"
    });
});

chrome.contextMenus.onClicked.addListener(handleContext);

function handleContext(info, tab){
    console.log(`Context Menu Clicked: ${info.menuItemId}`);
    switch (info.menuItemId) {
        case "optns":
            chrome.runtime.openOptionsPage();
            break;
    
        default:
            break;
    }
}

function injectDefaults(){
    chrome.storage.local.set({
        bgImg: "https://external-preview.redd.it/sE0hV3Uv1HO_sUtL9JWe1iqJNm7m4T0RtZ3vQQuBilA.jpg?auto=webp&s=da6a6333d3273ddbea5692e473bdac7cdcbd7e28",
        opacity: 50,
        bgColor:"#282828",
        hlColor: "#dc143c",
        textColor: "#ffffff",
        mainColor: "#ffffff",
        headerColor: "#ff7f50",
        accent: "#1e90ff",
        accentS: "#8a2be2"
    },function(){
        console.log("Successfully injected default options.");
    });
}