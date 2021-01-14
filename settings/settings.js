const bg = document.getElementById('bgImg');
const opacity = document.getElementById('opacity');
const hlColor = document.getElementById('hlColor');
const mainColor = document.getElementById('mainColor');
const textColor = document.getElementById('textColor');
const headerColor = document.getElementById('headerColor');
const accent = document.getElementById('accentColor');
const accentSecond = document.getElementById('accentSecColor');

window.addEventListener("load", function(window, ev){
    chrome.storage.local.get(['bgImg', 'opacity', 'hlColor', 'mainColor', 'textColor', 'headerColor', 'accent', 'accentS'], (result) =>{
        bg.value = result.bgImg;
        opacity.value = result.opacity;
        hlColor.value = result.hlColor;
        mainColor.value = result.mainColor;
        textColor.value = result.textColor;
        headerColor.value = result.headerColor;
        accent.value = result.accent;
        accentSecond.value = result.accentS;
    });
});

bg.addEventListener("change", (ev) =>{
    save({bgImg: ev.target.value});
});

opacity.addEventListener("change", (ev) =>{
    save({opacity: ev.target.value});
});

hlColor.addEventListener("change", (ev) =>{
    save({hlColor: ev.target.value});
});

mainColor.addEventListener("change", (ev)=>{
    save({mainColor: ev.target.value});
});

textColor.addEventListener("change", (ev)=>{
    save({textColor: ev.target.value});
});

headerColor.addEventListener("change", (ev)=>{
    save({headerColor: ev.target.value});
});

accent.addEventListener("change", (ev)=>{
    save({accent: ev.target.value});
});

accentSecond.addEventListener("change", (ev)=>{
    save({accentS: ev.target.value});
});

function save(obj, callback = null){
    chrome.storage.local.set(obj, callback);
}