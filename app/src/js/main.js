$('#title').css('opacity', '0');
$('#banner_date')[0].innerHTML = new Date().getFullYear();
$('#bg').css('background-image', "url(" + getRandomWallpaperUrl() + ")");
// 타이틀 글자 에니메이션 정보
const titleAnimationInfos = [[ 'rgb(245,144,178)', 3500, 1000 ], [ 'rgb(255,255,255)', 4000, 500 ], [ 'rgb(236,63,121)', 4500, 0 ]];
const startedDate = 2017;
//const titleAnimationInfos = [ [ 'rgb(255,255,255)', 3000, 2000 ], [ 'rgb(245,144,178)', 3500, 1000 ], [ 'rgb(255,255,255)', 4000, 500 ], [ 'rgb(236,63,121)', 4500, 0 ]];

$(function() {
    setTimeout(function() {
        $('#title').css('opacity', '');
        titleAnimation($('#title'), titleAnimationInfos);
        console.log('animation inited!!');
        textCountUp($('#banner_date')[0]);
    }, 1000);
});

function titleAnimation(svg, animationInfos) {
    var paths = svg.find('path');
    paths.remove();
    $(function() {
        for (var li = 0; li < animationInfos.length; li++) {
            const info = animationInfos[li];
            runAnimation(createAnimation(info[0], paths), info[1], info[2]);
        }
    });
}

function createAnimation(color, paths) {
    var clonepaths = clonePaths(paths, true, title);
    clonepaths.forEach(path => {
        path.style.stroke = color;
        const tl = path.getTotalLength();
        path.style.strokeDashoffset = tl;
        path.style.strokeDasharray = tl;
    }); return clonepaths;
}

function runAnimation(paths, animationTime, animationDelay) {
    setTimeout(function() {
        paths.forEach(path => {
            const tl = path.getTotalLength();
            path.style.strokeDasharray = tl + ' ' + tl;
            path.style.strokeDashoffset = tl;
            $(path).animate({
                "strokeDashoffset" : 0
            }, animationTime);
        });
        console.log('animation start: ' + animationDelay);
    }, animationDelay);
}

function cloneSVGPaths(svg, a) {
    var cpaths = [];
    var ps = svg.find('path');
    ps.each(function(i, p) {
        var cp = p.cloneNode();
        cpaths.push(cp);
        if(a) svg.append(cp);
    }); return cpaths;
}

function clonePaths(ps, a, svg) {
    var cpaths = [];
    ps.each(function(i, p) {
        var cp = p.cloneNode();
        cpaths.push(cp);
        if(a) svg.prepend(cp);
    }); return cpaths;
}

function textCountUp(elmt) { _textCountUp(elmt, new Date().getFullYear(), startedDate); }
function _textCountUp(elmt, cunt, tagt) {
    console.log('date count: ' + cunt);
    elmt.innerHTML = cunt;
    if(cunt != tagt) 
        setTimeout(function () {
            _textCountUp(elmt, cunt > tagt ? cunt - 1 : cunt + 1, tagt);
        }, 400);
}