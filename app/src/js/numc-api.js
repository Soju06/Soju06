$(function () {
    var link = $('#numc_download');
    if(link == undefined || link.length < 1) return;
    link[0].addEventListener('click', downloadButtonClick);
});

function getLaststVersion(func) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/repos/Soju06/NUMC/releases', true);
    xhr.onload = function() {
        const json = this.status === 200 ? JSON.parse(this.responseText) : undefined;
        if(json != undefined && json.length >= 1 && json[0].assets.length >= 1)
            func(json[0].assets[0].browser_download_url);
        else func(undefined);
    }
    xhr.send();
}

function downloadButtonClick() {
    getLaststVersion(function (url) {
        var link = $('#numc_download');
        if(link == undefined || link.length < 1) return;
        if(url == undefined) {
            window.location.href = 'https://github.com/Soju06/NUMC/releases';
            return;
        } console.log('lastst release: ' + url);
        link[0].removeEventListener('click', downloadButtonClick);
        link[0].href = url;
        link[0].removeAttribute('download');
        link[0].setAttribute('download', '');
        link[0].click();
    });
}