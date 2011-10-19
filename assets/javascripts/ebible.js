////////////////////////////////////////////////////////////////
// GLOBALS


function findDescendantsByClass(a, b) {
    var c = [];
    for (var d = 0; d < a.childNodes.length; ++d) {
        var e = a.childNodes[d],
            f = findDescendantsByClass(e, b);
        c = c.concat(f), e.tagName && StyleClass.contains(e, b) && c.push(e)
    }
    return c
}
function findAncestorByTag(a, b) {
    b = b.toUpperCase();
    if (a) {
        a = a.parentNode;
        while (a && a.tagName) {
            if (a.tagName.toUpperCase() == b) return a;
            a = a.parentNode
        }
    }
    return null
}
function eventTarget(a) {
    if (!a) return null;
    if (a.target) return a.target;
    if (a.srcElement) return a.srcElement
}
function addEvent(a, b, c, d) {
    if (a.addEventListener) return a.addEventListener(b, c, d), !0;
    if (a.attachEvent) {
        var e = a.attachEvent("on" + b, c);
        return e
    }
}
function removeEvent(a, b, c, d) {
    if (a.removeEventListener) return a.removeEventListener(b, c, d), !0;
    if (a.detachEvent) {
        var e = a.detachEvent("on" + b, c);
        return e
    }
}
function StyleClass() {}
function contains(a, b) {
    var c = indexOf(a, b);
    return c >= 0 ? !0 : !1
}
function indexOf(a, b) {
    for (var c = 0; c < a.length; c++) if (a[c] == b) return c;
    return -1
}
function JSONscriptRequest(a) {
    this.fullUrl = a, this.noCacheIE = "&noCacheIE=" + (new Date).getTime(), this.headLoc = document.getElementsByTagName("head").item(0), this.scriptId = "YJscriptId" + JSONscriptRequest.scriptCounter++
}
function orderText(a) {
    aObj = new JSONscriptRequest(a), aObj.buildScriptTag(), aObj.addScriptTag()
}
function truebody() {
    return !window.opera && document.compatMode && document.compatMode != "BackCompat" ? document.documentElement : document.body
}
function onShowVersePopup(a) {
    a ? a = a : a = event, currentVisiblePopup != null && onHideVersePopup(null), mouseX = a.pageX, mouseY = a.pageY;
    var b = eventTarget(a),
        c = getPassageFromTarget(b),
        d = c + "-popup";
    clearTimeout(delayID), currentVisiblePopup = d, document.getElementById(d) ? delayID = window.setTimeout("showPopup('" + d + "')", popDelay) : delayID = window.setTimeout("createPopup('" + d + "','" + c + "')", popDelay)
}
function onHideVersePopup(a) {
    var b = document.getElementById(currentVisiblePopup);
    clearTimeout(delayID), b && (b.style.visibility = "hidden", currentVisiblePopup = null)
}
function getPassageFromTarget(a) {
    var b = "";
    a.tagName != "A" && (parentAnchor = findAncestorByTag(a, "a"), a = parentAnchor);
    if (a.name && a.name != null) b = a.name;
    else if (a.href) {
        var c = a.href.lastIndexOf("/");
        b = a.href.substring(c + 1)
    }
    return b
}
function createPopup(a, b) {
    var c = document.createElement("div");
    c.id = a, c.className = "eBible-passage-popup", c.style.visibility = "hidden", c.style.position = "absolute", c.style.fontFamily = "Georgia, Times New Roman, Times, serif", c.style.fontSize = "11", c.style.padding = "12px", c.style.color = "#000", c.style.background = "#FFFFFF", c.style.boxShadow = "0px 1px 2px #aaa", c.style.cssText += "background: -moz-linear-gradient(top, #fff 70%, #f8f8f8 100%);", c.style.cssText += "background: -webkit-linear-gradient(top, #fff 70%, #f8f8f8 100%);", c.style.cssText += "background: -ms-linear-gradient(top, #fff 70%, #f8f8f8 100%);", c.style.cssText += "background: -linear-gradient(top, #fff 70%, #f8f8f8 100%);", c.style.width = popupWidth + "px", c.style.maxHeight = popupMaxHeight + "px", document.body.appendChild(c), showPopup(a);
    var d = document.createElement("div");
    d.id = b + "-popup-body";
    var e = KEY == "EBIBLE_DEMO" ? "Loading passage... " : "Fetching from eBible.com... ";
    d.innerHTML = "<img src=" + EBIBLE_BASE_URL + "/images/ajax-loader.gif /> " + e, d.className = "versePreviewBody", c.appendChild(d), url = EBIBLE_BASE_URL + "/query?utf=8%E2%9C%93&query=" + escape(b) + "&commit=Go&json=true&verselink=true&callback=verselink_result&verselink_translation=" + escape(eBible.translation), orderText(url)
}
function showPopup(a) {
    posPop(a), document.getElementById(a).style.visibility = "visible"
}
function posPop(a) {
    a = document.getElementById(a);
    var b = offsetfrommouse[0],
        c = offsetfrommouse[1],
        d = document.all ? truebody().scrollLeft + truebody().clientWidth : pageXOffset + window.innerWidth - 15,
        e = document.all ? Math.min(truebody().scrollHeight, truebody().clientHeight) : Math.min(window.innerHeight);
    d - mouseX < a.offsetWidth + 30 ? b = mouseX - b - a.offsetWidth - 30 : b += mouseX, e - mouseY < a.offsetHeight + 30 ? c += document.all ? mouseY + truebody().scrollTop - Math.max(0, a.offsetHeight + 30 + mouseY - e) : mouseY - Math.max(0, a.offsetHeight + 30 + mouseY - e - truebody().scrollTop) : (c += mouseY, document.all && (c += truebody().scrollTop)), !document.all, c < 0 && (c = c * -1), a.style.left = b + "px", a.style.top = mouseY + "px"
}
function verselink_result(a) {
    document.getElementById(currentVisiblePopup).innerHTML = a, create_fb_button(), document.getElementById(currentVisiblePopup).innerHTML += '<p id="popup-meta">Powered by <a href="' + EBIBLE_BASE_URL + '">eBible.com</a></p>', loadGA()
}
function create_fb_button() {
}
function loadFB() {
}
function loadGA() {
}
function init() {
    if (arguments.callee.done) return;
    arguments.callee.done = !0, loadFB(), ebdInit()
}
function ebdInit() {
    var a = document.getElementsByTagName("script");
    for (i = 0; i < a.length; i++) {
        var b, c;
        b = a[i].src.search(/ebible.verselink|ebibleicious/);
        if (b >= 0) {
            c = decodeQS(a[i].src), c.element && (eBible.element = c.element), c.new_window && (eBible.new_window = c.new_window == "1"), c.translation && (eBible.translation = c.translation), c.mode && (eBible.mode = c.mode), c.related_topics && (eBible.related_topics = c.related_topics), c.class_name && (eBible.class_name = c.class_name), a[i].src.indexOf("localhost") >= 0 ? EBIBLE_BASE_URL = "http://localhost" : a[i].src.indexOf("codexinfinitum") >= 0 && (EBIBLE_BASE_URL = "http://codexinfinitum.com");
            break
        }
    }
    ebdLoad()
}
function ebdLoad() {
    eBibleCSS(), (eBible.element && (e = document.getElementById(eBible.element)) || (e = document.body)) && findPassages(e, eBible.class_name)
}
function eBibleCSS() {
    popupCSS = ".eBible-passage-popup h1   { font-size: 24px !important; margin: 0 !important;font-weight: normal !important; line-height: 36px !important; padding: 0 !important; }", popupCSS += ".eBible-passage-popup h1 a { text-decoration: none !important; color: #000 !important; }", popupCSS += ".eBible-passage-popup h2   { font-size: 16px !important; text-transform: upppercase !important; font-weight: normal !important; line-height: 16px !important; padding: 0 !important; margin: 8px 0 12px 0 !important; }", popupCSS += ".eBible-passage-popup h2 a { color: #d63a3a !important;text-decoration: none !important; }", popupCSS += ".eBible-passage-popup p    { font-size: 13px !important; line-height: 18px !important; margin-bottom: 16px !important; }", popupCSS += ".eBible-passage-popup p sup  { font-size: 9px !important; line-height: 1; }", popupCSS += "p#popup-meta     { color: #666 !important; line-height: 0 !important; margin-top: 18px !important; }", popupCSS += "p#popup-meta a   { color: #333 !important; text-decoration: underline !important }", popupCSS += ".ebible-clear   { clear: both !important }", addCSS(popupCSS);
    var a = "background: -linear-linear-gradient(top, #f5f5f5 62%, #e6e6e6 100%);";
    a += "background: -moz-linear-gradient(top, #f5f5f5 62%, #e6e6e6 100%);", a += "background: -ms-linear-gradient(top, #f5f5f5 62%, #e6e6e6 100%);", a += "background: -webkit-linear-gradient(top, #f5f5f5 62%, #e6e6e6 100%);", a += "border: 1px solid #d4d4d4 !important;", a += "border-bottom: 1px solid #bbb !important;", a += "color: #444 !important;", a += "cursor: pointer !important;", a += "float: left;", a += "font-family: Helvetica, Arial, sans-serif;", a += "font-size: 13px !important;", a += "font-weight: bold !important;", a += "line-height: 1 !important;", a += "margin: 0 0 8px 0 !important;", a += "padding: 8px 6px !important;", a += "text-decoration: none !important;", a += "text-shadow: 0 1px #fff;", a += "width: 112px !important;", addCSS("a#continue-reading { " + a + " }")
}
function addCSS(a) {
    var b = document.createElement("style");
    b.type = "text/css", b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(b)
}
function findPassages(a, b) {
    var c = "I+|1st|2nd|3rd|First|Second|Third|1|2|3",
        d = "Genesis|Gen|Exodus|Exod?|Leviticus|Lev|Levit?|Numbers|Nmb|Numb?|Deuteronomy|Deut?|Joshua|Josh?|Judges|Jdg|Judg?|Ruth|Ru|Samuel|Sam|Sml|Kings|Kngs?|Kin?|Chronicles|Chr|Chron|Ezra|Ez|Nehemiah|Nehem?|Esther|Esth?|Job|Jb|Psalms?|Psa?|Proverbs?|Prov?|Ecclesiastes|Eccl?|Songs?ofSolomon|Songs?|Isaiah|Isa|Jeremiah|Jer|Jerem|Lamentations|Lam|Lament?|Ezekiel|Ezek?|Daniel|Dan|Hosea|Hos|Joel|Jo|Amos|Am|Obadiah|Obad?|Jonah|Jon|Micah|Mic|Nahum|Nah|Habakkuk|Hab|Habak|Zephaniah|Zeph|Haggai|Hag|Hagg|Zechariah|Zech?|Malachi|Malac?|Mal|Mat{1,2}hew|Mat?|Mark|Mrk|Luke|Lu?k|John|Jhn|Jo|Acts?|Ac|Romans|Rom|Corinthians|Cor|Corin|Galatians|Gal|Galat|Ephesians|Eph|Ephes|Philippians|Phili?|Colossians|Col|Colos|Thessalonians|Thes|Timothy|Tim|Titus|Tts|Tit|Philemon|Phil?|Hebrews|Hebr?|James|Jam|Jms|Peter|Pete?|Jude|Ju|Revelations?|Rev|Revel",
        e = "\\d+(:\\d+)?(?:\\s?[-&]\\s?\\d+)?(:\\d+)?",
        f = "\\b(?:(" + c + ")\\s+)?(" + d + ")\\s+(" + e + "(?:\\s?\\s?" + e + ")*)\\b";
    f = new RegExp(f, "m");
    var g = function (a) {
            var c = f.exec(a.data);
            if (c) {
                var d = c[0],
                    e = a.splitText(c.index),
                    g = e.splitText(d.length),
                    h;
                if (eBible.mode == "snippet") h = a.ownerDocument.createElement("DIV");
                else {
                    h = a.ownerDocument.createElement("A");
                    var i = EBIBLE_BASE_URL + "/query?utf=8%E2%9C%93&query=" + escape(d);
                    h.setAttribute("href", i), h.setAttribute("target", "_blank"), addEvent(h, "click", eBible.onclick, !1), eBible.mode == "mouseover" ? (h.name = d, addEvent(h, "mouseover", onShowVersePopup, !1), addEvent(document, "mouseup", onHideVersePopup, !0)) : addEvent(h, "mouseover", eBible.showTitle, !1)
                }
                return a.parentNode.replaceChild(h, e), h.className = b, h.appendChild(e), h
            }
            return a
        };
    traverseDOM(a.childNodes[0], 1, g)
}
function traverseDOM(a, b, c) {
    var d = /^(a|script|style|textarea)/i,
        e = 0;
    while (a && b > 0) {
        e++;
        if (e >= eBible.max_nodes) {
            var f = function () {
                    traverseDOM(a, b, c)
                };
            setTimeout(f, 50);
            return
        }
        switch (a.nodeType) {
        case 1:
            var g = !0;
            if (a.tagName != "ARTICLE") var g = !d.test(a.tagName);
            if (g == !0 && a.childNodes.length > 0) {
                a = a.childNodes[0], b++;
                continue
            }
            break;
        case 3:
        case 4:
            a = c(a)
        }
        if (a.nextSibling) a = a.nextSibling;
        else while (b > 0) {
            a = a.parentNode, b--;
            if (a.nextSibling) {
                a = a.nextSibling;
                break
            }
        }
    }
}
function decodeQS(a) {
    var b, c, d, e, f = {};
    d = a.indexOf("?"), d = d < 0 ? 0 : d + 1;
    while (d >= 0 && (e = a.indexOf("=", d)) >= 0) b = a.substring(d, e), d = a.indexOf("&", e), c = d < 0 ? a.substring(e + 1) : a.substring(e + 1, d++), f[unescape(b)] = unescape(c);
    return f
}
KEY = "", EBIBLE_BASE_URL = "http://ebible.com";
var FB;
StyleClass.split = function (a) {
    return a ? a.split(" ") : []
}, StyleClass.join = function (a) {
    return a ? a.join(" ") : ""
}, StyleClass.contains = function (a, b) {
    var c;
    return typeof a == "string" ? c = StyleClass.split(a) : typeof a == "array" ? c = a : c = StyleClass.split(a.className), contains(c, b)
}, JSONscriptRequest.scriptCounter = 1, JSONscriptRequest.prototype.buildScriptTag = function () {
    this.scriptObj = document.createElement("script"), this.scriptObj.setAttribute("type", "text/javascript"), this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE), this.scriptObj.setAttribute("id", this.scriptId)
}, JSONscriptRequest.prototype.removeScriptTag = function () {
    this.headLoc.removeChild(this.scriptObj)
}, JSONscriptRequest.prototype.addScriptTag = function () {
    this.headLoc.appendChild(this.scriptObj)
};
var offsetfrommouse = [10, 10],
    popupWidth = 275,
    popupMaxHeight = 500,
    currentVisiblePopup = null,
    currentimageheight = 10,
    popDelay = 400,
    delayID = null,
    mouseX, mouseY, permalink, fb_share_id = 1,
    gaLoaded = !1;
document.addEventListener && document.addEventListener("DOMContentLoaded", init, !1);
if (/WebKit/i.test(navigator.userAgent)) var _timer = setInterval(function () {
    /loaded|complete/.test(document.readyState) && (clearInterval(_timer), init())
}, 10);
window.onload = init;
var eBible = {
    translation: "ESV",
    related_topics: 5,
    max_nodes: 500,
},
    ebdSnippets = [];
eBible.showTitle = function (a) {
    switch (eBible.mode) {
    case "link":
        title = "View " + eventTarget(a).childNodes[0].data + " - " + eBible.translation + " from eBible.com";
        break;
    case "study":
        title = "Study " + eventTarget(a).childNodes[0].data + " - " + eBible.translation + " from eBible.com";
        break;
    default:
        return
    }
    eBible.new_window && (title += " (new window)"), eventTarget(a).setAttribute("title", title)
}