// 바닐라 자스 똥. 덩. 어. 리 ㄹㅇㅋㅋ
// 타스 마렵다
const __________________elements = new Array();
const __________________window = $(window);

class VideoAutoResize {

    Parent;
    Element;

    constructor(parent, element) {
        if (!parent || !element) throw '제대로 된 파라미터 내놔!';
        this.Element = element;
        this.Parent = parent;
        __________________elements.push(this);
        this.onResize();
    }

    onResize() {
		var parent = $(this.Parent);
        var win = {};

		win.width = parent.width();
		win.height = parent.height();

		var margin = 24;
		var vid = {};
		vid.width = win.width + ((win.width * margin) / 100);
		vid.height = Math.ceil((9 * win.width) / 16);
		vid.marginTop = -((vid.height - win.height) / 2);
		vid.marginLeft = -((win.width * (margin / 2)) / 100);

		if (vid.height < win.height) {
			vid.height = win.height + ((win.height * margin) / 100);
			vid.width = Math.floor((16 * win.height) / 9);
			vid.marginTop = -((win.height * (margin / 2)) / 100);
			vid.marginLeft = -((vid.width - win.width) / 2);
		}
		$(this.Element).css(vid);
    }
}

window.addEventListener("resize", () => __________________elements.forEach(e => e.onResize()));