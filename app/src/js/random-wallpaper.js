const Wallpapers = [ 
    "https://cdn.discordapp.com/attachments/512954249362145290/809335593670148126/1608116313837.jpg", 
    "https://cdn.discordapp.com/attachments/512954249362145290/809337850151174205/20200909_183424.jpg", 
    "https://cdn.discordapp.com/attachments/512954249362145290/809363094178234378/wallpaper_2_-_.jpg",
    "https://cdn.discordapp.com/attachments/512954249362145290/809338295451648030/20200912_222000.jpg"
];

function getRandomWallpaperUrl() {
    return Wallpapers[getRandomInt(0, Wallpapers.length - 1)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}