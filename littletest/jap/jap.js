let [word, list] = getWord(), spend_times = 0, visible = false;//safari中time是已定义的全局变量
main();

function main() {
    let audio = $("#aduio");
    $("#time").text("0秒");
    keyBoard();
    addEvent("key");
    $("#delete").on("click", deleteText);
    $("#confirm").on("click", confirm);
    $("#change").on("click", randomWord);
    $("#answer").on("click", showAnswer);
    $("#picture").on("click", showPicture);
    randomWord();
    setInterval(showTime, 1000);
}

function showTime() {
    spend_times++;
    let time = spend_times;
    let times = "";
    if (time < 60) {
        times = time + "秒";
    } else {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        times = min + " 分 " + sec + " 秒";
    }
    $("#time").text(times);
}

function keyBoard() { //生成键盘
    let keyboard = $("#keyboard");
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
        let div = $('<div class="key"></div>');
        div.text(text);
        location.append(div);
    } else return -1;
}

function clickDiv() { //点击键盘的一个键后将键盘上的字母打印到id为input的dom元素中
    let text = $("#input").text();
    text += $(this).text();
    $("#input").text(text);
}

function addEvent(classname) { //为键盘的每个键添加点击事件
    let class_name = "." + classname;
    $(class_name).on("click", clickDiv);
    //jquery中一次性给所有元素添加了事件,不需要遍历处理.而原生中必须一个一个添加
}

function deleteText() { //撤销按钮的点击事件=>删除id为input的dom元素的内容中的最后一个字符
    let text = $("#input").text();
    if (text.length > 0) {
        let newtext = text.substring(0, text.length - 1);
        $("#input").text(newtext);
    }
}

function confirm() { //确认按钮的点击事件=>答对就换一个,打错继续
    let answer = $("#input").text();
    if (answer === "") {
        alert("输入为空!");
        return;
    }
    let question = $("#jap").text();
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
        $("#jap").text(question);
    } else {
        $("#jap").text("");
        alert("全部答完了!");

    }
}

function answerRight(key) { //回答正确的情况.该字符对应的正确标记记true,list里对应的数组元素删去,背景改绿色
    word.get(key).right = true;
    word.get(key).times += 1;
    $("#input").text("");
    rightVisual();
    startAudio(key);
    for (let i = 0; i < list.length; i++) {
        if (list[i] === key) list.splice(i, 1);
    }
    randomWord();
}

function answerFalse(key) { //回答错误的情况.背景改红色
    word.get(key).times += 1;
    $("#input").text("");
    falseVisual();
    //$("#input").css("backgroundColor", "red"); //注意jquery与原生的区别!!
}
function rightVisual() {
    $("body").css("backgroundColor", "green");
    setTimeout(() => {
        $("body").css("backgroundColor", "white")
    }, 1000);
}
function falseVisual() {
    $("body").css("backgroundColor", "red");
    setTimeout(() => {
        $("body").css("backgroundColor", "white")
    }, 1000);
}

function showAnswer() { //显示答案按钮点击事件=>在input里直接显示正确的答案
    let question = $("#jap").text();
    for (let i of word.keys()) {
        if (i === question) {
            $("#input").text(word.get(i).pronunciation);
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
    $("#right_percentage").text("已答对: " + right_word + "! 正确率: " + right_percentage);
}

function showPicture() {
    visible = !visible;
    if (visible) {
        $("body").css("backgroundImage", "url(jap.jpg)");
    } else {
        $("body").css("backgroundImage", "");
    }
}

function startAudio(key) {
    let time = word.get(key).start_time;
    audio.currentTime = time;;
    audio.play();
    setTimeout(stopAudio, 600);

}

function stopAudio() {
    audio.pause();
}

function getStartTime(array) {//从音频文件中分割出每个音的起始时间
    let start_time = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < 5; j++) {
            start_time[i * 5 + j] = parseFloat((array[i] + 0.6 * j).toFixed(2));
        }
    }
    start_time.splice(36, 1);//几个重复的音不要
    start_time.splice(37, 1);
    start_time.splice(44, 4);
    start_time.push(43);
    return start_time;
}

function getWord() { //将之前对象方式存储的数据用map存储,用数组记录还未答对的日语字符,方便随机抽取.
    let list = [],
        index = 0,
        start_time = [3, 7.2, 11.3, 15.42, 19.6, 23.8, 28, 32.1, 36, 40],
        audio_time = getStartTime(start_time),
        word = new Map(),
        old_word = {
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
            "times": 0,
            "start_time": audio_time[index],
        };
        index++;
        word.set(x, value);
        list.push(x);
    }
    return [word, list];
}
