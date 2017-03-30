let [word, list] = getWord(), time = 0,visible = false;

(function (){
    getElement("input").textContent = "";
    getElement("time").textContent = "0秒";
    keyBoard();
    addEvent("key");
    getElement("delete").addEventListener("click", deleteText, false);
    getElement("confirm").addEventListener("click", confirm, false);
    getElement("change").addEventListener("click", randomWord, false);
    getElement("answer").addEventListener("click", showAnswer, false);
    getElement("picture").addEventListener("click", showPicture, false);
    randomWord();
    setInterval(showTime, 1000);
})();

function getElement(ele) { //返回指定id的DOM对象
    if (ele) {
        return document.getElementById(ele);
    } else return -1;
}

function showTime() {
    time++;
    let times = "";
    if (time < 60) {
        times = time + "秒";
    } else {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        times = min + " 分 " + sec + " 秒";
    }
    getElement("time").textContent = times;
}

function keyBoard() { //生成键盘
    let keyboard = getElement("keyboard");
    let list = ["a", "i", "u", "e", "o", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n", "u", "c", "f"];
    for (let n in list) {
        if (list.hasOwnProperty(n)) {
            createDiv(keyboard, list[n]);
        }
    }
}

function createDiv(location, content) { //在指定父元素内创建指定内容的键盘的一个键
    let text = (typeof(content) === "string") ? content : ("" + content);
    if (typeof(location) === "object") {
        let div = document.createElement("div");
        let textnode = document.createTextNode(text);
        div.setAttribute("class", "key");
        div.appendChild(textnode);
        location.appendChild(div);
    } else return -1;
}

function clickDiv() { //点击键盘的一个键后将键盘上的字母打印到id为input的dom元素中
    let text = this.lastChild.textContent;
    getElement("input").textContent += text;
}

function addEvent(classname) { //为键盘的每个键添加点击事件
    let div_list = document.querySelectorAll("." + classname);
    for (let i in div_list) {
        if (div_list.hasOwnProperty(i)) {
            div_list[i].addEventListener("click", clickDiv, false);
        }
    }
}

function deleteText() { //撤销按钮的点击事件=>删除id为input的dom元素的内容中的最后一个字符
    let text = getElement("input").textContent;
    if (text.length > 0) {
        let newtext = text.substring(0, text.length - 1);
        getElement("input").textContent = newtext;
    }
}

function confirm() { //确认按钮的点击事件=>答对就换一个,打错继续
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

function randomWord() { //换一个按钮点击事件=>随机换一个日语字符
    if (list.length > 0) {
        let n = Math.floor(Math.random() * list.length);
        let question = list[n];
        getElement("jap").textContent = "";
        getElement("jap").textContent += question;
    } else {
        alert("全部答完了!");
        getElement("jap").textContent = "";
    }
}

function answerRight(key) { //回答正确的情况.该字符对应的正确标记记true,list里对应的数组元素删去,背景改绿色
    word.get(key).right = true;
    word.get(key).times += 1;
    getElement("input").textContent = "";
    getElement("input").style.backgroundColor = "green";
    for (let i = 0; i < list.length; i++) {
        if (list[i] === key) list.splice(i, 1);
    }
    randomWord();
}

function answerFalse(key) { //回答错误的情况.背景改红色
    word.get(key).times += 1;
    getElement("input").textContent = "";
    getElement("input").style.backgroundColor = "red";
}

function showAnswer() { //显示答案按钮点击事件=>在input里直接显示正确的答案
    let question = getElement("jap").textContent;
    for (let i of word.keys()) {
        if (i === question) {
            getElement("input").textContent = "";
            getElement("input").textContent += word.get(i).pronunciation;
        }
    }
}

function rightPercentage() { //统计已正确回答的数量,计算正确率,并在right_percentage里显示
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
function showPicture(){
    visible = !visible;
    if(visible){
        document.getElementsByTagName("body")[0].style.backgroundImage = 'url("jap.jpg")';
    }
    else{
        document.getElementsByTagName("body")[0].style.backgroundImage = "";
    }
}
function getWord() { //将之前对象方式存储的数据用map存储,用数组记录还未答对的日语字符,方便随机抽取.
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