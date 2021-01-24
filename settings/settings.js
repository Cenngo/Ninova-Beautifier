'use strict';
const ex = document.getElementById('export');
const im = document.getElementById('import');

const storedVariables = ['bgImg', 'opacity', 'bgColor', 'hlColor', 'mainColor', 'textColor', 'headerColor', 'accent', 'accentS'];

window.addEventListener("load", function(window, ev){
    storedVariables.forEach(variable => {
        var element = document.getElementById(variable);
        element.addEventListener("change", function(ev){
            save({
                [variable]: ev.target.value
            });
        });
    });

    displayValues();
});

function displayValues(){
    chrome.storage.local.get(storedVariables, (result) =>{
        storedVariables.forEach(variable => {
            var element = document.getElementById(variable);
            element.value = result[variable];
        });
    });
}

ex.addEventListener("click", function(ev){

    chrome.storage.local.get(storedVariables, function(result) {
        var json = JSON.stringify(result);

        var cfg = new Blob([json], {
            type: "application/json"
        });
        var url = URL.createObjectURL(cfg);
        var download = document.getElementById('download');
        download.href = url;
        download.click();
    });
});

im.addEventListener("click", function(ev){
    var file = document.getElementById('importCfg').files[0];
    if(!file)
        return;

    var reader = new FileReader();
    reader.onload = function(ev){
        var cfg = JSON.parse(ev.target.result);

        var shouldParse = true;

        Object.keys(cfg).forEach(key => {
            if(storedVariables.indexOf(key) == -1){
                console.log("Invalid Config File");
                shouldParse = false;
                return;
            }
        });

        if(!shouldParse)
            return;

        save(cfg, function(){
            console.log("Imported Config");
            displayValues();
        });
    };
    reader.readAsText(file);
});

function save(obj, callback = null){
    chrome.storage.local.set(obj, callback);
}