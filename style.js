const storedVariables = ['bgImg', 'opacity', 'bgColor', 'hlColor', 'mainColor', 'textColor', 'headerColor', 'accent', 'accentS'];
const style = document.documentElement.style;

chrome.storage.local.get(storedVariables, (result) =>{

    style.setProperty("--background", `url(${result.bgImg})`);
    setBGColor(result.bgColor);
    style.setProperty("--opacity", result.opacity / 100);

    storedVariables.forEach(variable => {
        if(variable === 'bgImg' || variable === 'bgColor' || variable === 'opacity')
            return;
        
        style.setProperty(`--${variable}`, result[variable])
    });
});

function setBGColor(hex){
    var r = hex.substring(1,3);
    var g = hex.substring(3,5);
    var b = hex.substring(5,7);

    style.setProperty("--bgR", parseInt(r, 16));
    style.setProperty("--bgG", parseInt(g, 16));
    style.setProperty("--bgB", parseInt(b, 16));
}