var bg = document.getElementById('bgImg');
bg.addEventListener("change", setBg);

function setBg(ev){
    chrome.storage.local.set({bgImg: ev.target.value}, function(){
    });
}