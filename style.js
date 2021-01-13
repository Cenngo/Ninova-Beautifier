chrome.storage.local.get(['bgImg'], function(result){
    document.getElementsByTagName('body')[0].style.setProperty("background-image", `url("${result.bgImg}")`, 'important');
});