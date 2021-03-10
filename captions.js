Array.from(window["Tips"].tips).forEach(tip => {
    var element = tip.element;
    if(element.innerText.match(/[A-Z]{3} [0-9]{3}/gm)){
        var caption = tip.content.replace(/<br>.*/gm, "").replace(/<\/?[^>]+(>|$)/g, "");
        var title = document.createElement('i');
        title.innerText = caption + " - ";
        element.prepend(title);
    }
});