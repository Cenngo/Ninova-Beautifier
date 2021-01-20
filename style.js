'use strict';
var style = document.documentElement.style;
chrome.storage.local.get(['bgImg', 'opacity', 'bgColor', 'hlColor', 'mainColor', 'textColor', 'headerColor', 'accent', 'accentS'], (result) =>{
    style.setProperty("--background", `url(${result.bgImg})`);
    setBGColor(result.bgColor);
    
    style.setProperty("--mainColor", result.mainColor);
    style.setProperty("--textColor", result.textColor);
    style.setProperty("--hyperlinkColor", result.hlColor);
    style.setProperty("--opacity", result.opacity / 100);
    style.setProperty("--headerColor", result.headerColor);
    style.setProperty("--accent", result.accent);
    style.setProperty("--secondary", result.accentS);
});

function setBGColor(hex){
    console.log(hex);
    var r = hex.substring(1,3);
    var g = hex.substring(3,5);
    var b = hex.substring(5,7);
    console.log(r + g + b);

    style.setProperty("--bgR", parseInt(r, 16));
    style.setProperty("--bgG", parseInt(g, 16));
    style.setProperty("--bgB", parseInt(b, 16));
}