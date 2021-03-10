'use strict';
const ex = document.getElementById('export');
const im = document.getElementById('import');

window.addEventListener("load", function(window, ev){
    Log("Installing event listeners.")
    storedVariables.forEach(variable => {
        var element = document.getElementById(variable);
        element.addEventListener("change", function(ev){
            var selection;
            if(ev.target.type === 'checkbox'){
                selection = ev.target.checked;
            }
            else{
                selection = ev.target.value;
            }
            save({
                [variable]: selection
            });
        });
    });

    displayValues();
});

function displayValues(){
    Log("Displaying saved value.");
    chrome.storage.local.get(storedVariables, (result) =>{
        storedVariables.forEach(variable => {
            var element = document.getElementById(variable);
            if(element.type === 'checkbox'){
                element.checked = result[variable]
            }
            else{
                element.value = result[variable];
            }
        });
    });
}

ex.addEventListener("click", function(ev){
    Log("Exporting config file.")
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
    Log("File is valid, importing config.");

    var reader = new FileReader();
    reader.onload = function(ev){
        var cfg = JSON.parse(ev.target.result);

        var shouldParse = true;

        Object.keys(cfg).forEach(key => {
            if(storedVariables.indexOf(key) == -1){
                Log("Invalid variable from imported config, skiiping variable.")
                shouldParse = false;
                return;
            }
        });

        if(!shouldParse)
            return;

        save(cfg, function(){
            Log("Successfully imported config file.")
            displayValues();
        });
    };
    reader.readAsText(file);
});

function save(obj, callback = null){
    Log(`Saving varible.`)
    chrome.storage.local.set(obj, callback);
}

function Log(message){
    console.log(`[${extensionName}] - ${message}`)
}