var answer_times = 0,
    right_times = 0;
keyBoard();
addEvent("key");
getElement("delete").addEventListener("click", deleteText, false);
getElement("confirm").addEventListener("click", confirm, false);
var word = {
    "あ": "a",
    "い": "i",
    "う": "u",
    "え": "e",
    "お": "o",
    "か": "ka",
    "き": "ki",
    "く": "ku",
    "け": "ke",
    "こ": "ko",
    "さ": "sa",
    "し": "shi",
    "す": "su",
    "せ": "se",
    "そ": "so",
    "た": "ta",
    "ち": "chi",
    "つ": "tsu",
    "て": "te",
    "と": "to",
    "な": "na",
    "に": "ni",
    "ぬ": "nu",
    "ね": "ne",
    "の": "no",
    "は": "ha",
    "ひ": "hi",
    "ふ": "fu",
    "へ": "he",
    "ほ": "ho",
    "ま": "ma",
    "み": "mi",
    "む": "mu",
    "め": "me",
    "も": "mo",
    "や": "ya",
    "ゆ": "yu",
    "よ": "yo",
    "ら": "ra",
    "り": "ri",
    "る": "ru",
    "れ": "re",
    "ろ": "ro",
    "わ": "wa",
    "ん": "n"
};
randomWord(getWordLength(word));

function getElement(ele) {
    if (ele) {
        return document.getElementById(ele);
    } else return -1;
}

function keyBoard() {
    var keyboard = getElement("keyboard");
    var list = ["a", "i", "u", "e", "o", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n", "u"];
    for (var n in list) {
        if (list.hasOwnProperty(n)) {
            createDiv(keyboard, list[n]);
        }
    }
}

function createDiv(location, content) {
    var text = (typeof(content) === "string") ? content : ("" + content);
    if (typeof(location) === "object") {
        var div = document.createElement("div");
        var textnode = document.createTextNode(text);
        div.setAttribute("class", "key");
        div.appendChild(textnode);
        location.appendChild(div);
    } else return -1;
}

function clickDiv() {
    var text = this.lastChild.textContent;
    getElement("input").textContent += text;
}

function addEvent(classname) {
    var div_list = document.querySelectorAll("." + classname);
    for (var i in div_list) {
        if (div_list.hasOwnProperty(i)) {
            div_list[i].addEventListener("click", clickDiv, false);
        }
    }
}

function deleteText() {
    var text = getElement("input").textContent;
    if (text.length > 0) {
        var newtext = text.substring(0, text.length - 1);
        getElement("input").textContent = newtext;
    }
}

function confirm() {
    answer_times++;
    var answer = getElement("input").textContent;
    if (answer === "") alert("输入为空!");
    var question = getElement("jap").textContent;
    for (var i in word) {
        if (i === question) {
            if (answer === word[i]) {
                answerRight();
                getElement("input").textContent = "";
                right_times++;
                randomWord(getWordLength(word));
            } else {
                answerFalse();
                getElement("input").textContent = "";
            }
        }
    }
    getElement("right_percentage").textContent = (right_times/answer_times).toFixed(2);
}

function getWordLength(obj) {
    var max = 0;
    if (typeof(obj) === "object") {
        for (var i in obj) max++;
        return max;
    }
}

function randomWord(length) {
    var question, n = 0;
    var R = Math.floor(Math.random() * length) + 1;
    for (var i in word) {
        n++;
        if (R === n) question = i;
    }
    getElement("jap").textContent = "";
    getElement("jap").textContent += question;
}

function answerRight() {
    getElement("main").style.backgroundColor = "green";
}

function answerFalse() {
    getElement("main").style.backgroundColor = "red";
}
function free(dom){
	getElement().textContent = "";
}