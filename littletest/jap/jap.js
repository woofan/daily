getElement("input").textContent = "";
keyBoard();
addEvent("key");
getElement("delete").addEventListener("click", deleteText, false);
getElement("confirm").addEventListener("click", confirm, false);
getElement("change").addEventListener("click", randomWord, false);
getElement("answer").addEventListener("click", showAnswer, false);
let [word, list] = getWord();
randomWord();

function getElement(ele) {
    if (ele) {
        return document.getElementById(ele);
    } else return -1;
}

function keyBoard() {
    let keyboard = getElement("keyboard");
    let list = ["a", "i", "u", "e", "o", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n", "u", "c", "f"];
    for (let n in list) {
        if (list.hasOwnProperty(n)) {
            createDiv(keyboard, list[n]);
        }
    }
}

function createDiv(location, content) {
    let text = (typeof(content) === "string") ? content : ("" + content);
    if (typeof(location) === "object") {
        let div = document.createElement("div");
        let textnode = document.createTextNode(text);
        div.setAttribute("class", "key");
        div.appendChild(textnode);
        location.appendChild(div);
    } else return -1;
}

function clickDiv() {
    let text = this.lastChild.textContent;
    getElement("input").textContent += text;
}

function addEvent(classname) {
    let div_list = document.querySelectorAll("." + classname);
    for (let i in div_list) {
        if (div_list.hasOwnProperty(i)) {
            div_list[i].addEventListener("click", clickDiv, false);
        }
    }
}

function deleteText() {
    let text = getElement("input").textContent;
    if (text.length > 0) {
        let newtext = text.substring(0, text.length - 1);
        getElement("input").textContent = newtext;
    }
}

function confirm() {
    let answer = getElement("input").textContent;
    if (answer === "") {
        alert("输入为空!");
        return;
    }
    let question = getElement("jap").textContent;
    for (let i of word.keys()) {
        if (i === question) {
            if (answer === word.get(i).pronunciation) {
                answerRight(i);
            } else {
                answerFalse(i);
            }
        }
    }
    rightPercentage();
}

function randomWord() {
    let n = Math.floor(Math.random() * list.length);
    let question = list[n];
    getElement("jap").textContent = "";
    getElement("jap").textContent += question;
}

function answerRight(key) {
    word.get(key).right = true;
    word.get(key).times += 1;
    getElement("input").textContent = "";
    getElement("input").style.backgroundColor = "green";
    for (let i = 0; i < list.length; i++) {
        if (list[i] === key) list.splice(i, 1);
    }
    randomWord();
}

function answerFalse(key) {
    word.get(key).times += 1;
    getElement("input").textContent = "";
    getElement("input").style.backgroundColor = "red";
}

function showAnswer() {
    let question = getElement("jap").textContent;
    for (let i of word.keys()) {
        if (i === question) {
            getElement("input").textContent = "";
            getElement("input").textContent += word.get(i).pronunciation;
        }
    }
}

function rightPercentage() {
    let times = 0,
        right_times = 0;
    for (let i of word.values()) {
        times += i.times;
        if (i.right === true) {
            right_times++;
        }
    }
    let right_word = word.size - list.length;
    let right_percentage = (right_times / times).toFixed(2);
    getElement("right_percentage").textContent = "已答对: " + right_word + "! 正确率: " + right_percentage;
}

function getWord() {
    let list = [];
    let word = new Map();
    let old_word = {
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
    for (let x in old_word) {
        let value = {
            "pronunciation": old_word[x],
            "right": false,
            "times": 0
        };
        word.set(x, value);
        list.push(x);
    }
    return [word, list];
}