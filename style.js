window.addEventListener("load", load);

function load(window, ev){
    chrome.storage.local.get(['bgImg', 'opacity', 'hlColor', 'mainColor', 'textColor', 'headerColor', 'accent', 'accentS'], (result) =>{
        document.getElementsByTagName('body')[0].style.setProperty("background-image", `url("${result.bgImg}")`, 'important');
        const style = document.documentElement.style;
        
        style.setProperty("--mainColor", result.mainColor);
        style.setProperty("--textColor", result.textColor);
        style.setProperty("--hyperlinkColor", result.hlColor);
        style.setProperty("--opacity", result.opacity / 100);
        style.setProperty("--headerColor", result.headerColor);
        style.setProperty("--accent", result.accent);
        style.setProperty("--secondary", result.accentS);
    });
};