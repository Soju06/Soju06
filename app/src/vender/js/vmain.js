!(function (n) {
    var win = $(window), a = $("body");
    breakpoints({ xlarge: ["1281px", "1680px"], large: ["981px", "1280px"], medium: ["737px", "980px"], small: ["481px", "736px"], xsmall: [null, "480px"] });
    
    win.on("load", function () {
        window.setTimeout(function () {
            a.removeClass("is-preload");
        }, 100);
    });
    if (browser.mobile) a.addClass("is-touch");
    $(".scrolly").scrolly({ speed: 1500 });
    $("#nav > ul").dropotron({ alignment: "right", hideDelay: 350 });
    // $('<div id="titleBar"><a href="#navPanel" class="toggle"></a><span class="title">' + $("#logo").html() + "</span></div>").appendTo(a);
    // $('<div id="navPanel"><nav>' + $("#nav").navList() + "</nav></div>").appendTo(a).panel({ 
    //     delay: 500, hideOnClick: !0, hideOnSwipe: !0, resetScroll: !0, resetForms: !0, side: "left", target: a, visibleClass: "navPanel-visible" 
    // });

    if ("ie" == browser.name || browser.mobile) { 
        n.fn._parallax = function () { return $(this); }; 
    } else { 
        n.fn._parallax = function () {
            return (
                $(this).each(function () {
                    var o = $(this);
                    breakpoints.on("<=medium", function () { o.css("background-position", ""), win.off("scroll._parallax"); });
                    breakpoints.on(">medium", function () {
                    o.css("background-position", "center 0px");
                    win.on("scroll._parallax", function () {
                        o.css("background-position", "center " + -0.15 * 
                        (parseInt(win.scrollTop()) - parseInt(o.position().top)) + "px");
                    });
                    });
                }), $(this)
            );
        };
        win.on("load resize", function () { win.trigger("scroll"); });
    }

    $(".spotlight")._parallax().each(function () {
        var e = $(this);
        breakpoints.on("<=medium", function () { e.css("background-image", ""), e.unscrollex(); }),
        breakpoints.on(">medium", function () {
            var n, i, a;
            e.css("background-image", 'url("' + e.find(".image.main > img").attr("src") + '")');
            if(e.hasClass("top")) { a = "top"; n = "-20%"; i = 0; } 
            else if(e.hasClass("bottom")) { a = "bottom-only"; n = 0; i = "20%"; } 
            else { a = "middle"; n = 0; i = 0; }

            e.scrollex({ mode: a, top: n, bottom: i,
                initialize: function (n) { e.addClass("inactive"); },
                terminate: function (n) { e.removeClass("inactive"); },
                enter: function (n) { e.removeClass("inactive"); }
            });
        });
    }),

    $(".wrapper").each(function () {
        var e = $(this);
        breakpoints.on("<=medium", function () { e.unscrollex(); });
        breakpoints.on(">medium", function () {
            e.scrollex({ top: 250, bottom: 0,
                initialize: function (n) { e.addClass("inactive"); },
                terminate: function (n) { e.removeClass("inactive"); },
                enter: function (n) { e.removeClass("inactive"); },
            });
        });
    });

    $("#banner")._parallax();
})(jQuery);
