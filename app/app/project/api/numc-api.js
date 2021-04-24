// 타스... 였던것
class NumcApplication {
    DownloadElement;
    VersionLabelElement;

    constructor() {
        let de = document.getElementById('numc_download_button');
        let vle = document.getElementById('numc_download_label');
        if(de) this.DownloadElement = de;
        if(vle) this.VersionLabelElement = vle;
        setTimeout(this.onInit, 1000);
    }

    async onInit() {
        await Numc.initDownloadButton();
    }

    async getLaststVersion() {
        let res = await fetch('https://api.github.com/repos/Soju06/NUMC/releases');
        let json = res.status === 200 ? await res.json() : undefined;
        if(json != undefined && json.length >= 1 && json[0].assets.length >= 1)
            return { Version: json[0].name, DownloadURL: json[0].assets[0].browser_download_url };
        return undefined;
    }
    
    async initDownloadButton() {
        if(!Numc.DownloadElement) return;
        let rels = await Numc.getLaststVersion();
        if(!rels || !rels.DownloadURL || !rels.Version) {
            Numc.DownloadElement.setAttribute('href', 'https://github.com/Soju06/NUMC/releases');
            return;
        }
        console.log('numc lastst release: ' + rels);
        if(Numc.VersionLabelElement) Numc.VersionLabelElement.innerHTML = rels.Version;
        Numc.DownloadElement.setAttribute('href', rels.DownloadURL);
        Numc.DownloadElement.removeAttribute('download');
        Numc.DownloadElement.setAttribute('download', '');
    }
}

const Numc = new NumcApplication();