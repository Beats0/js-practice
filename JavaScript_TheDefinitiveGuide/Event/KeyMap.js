// 构造函数
function Keymap(bindings) {
    this.map = {}; // 按键标识符到handler的映射
    // { 按键标识符1: handler1, ... }
    if (bindings) {
        for (var name in bindings) {
            this.bind(name, bindings[name]);
        }
    }
}

// 绑定 指定的按键标识符和指定的处理程序函数
Keymap.prototype.bind = function (key, func) {
    this.map[Keymap.normalize(key)] = func;
};
// 删除 指定标识符的绑定
Keymap.prototype.unbind = function (key) {
    delete this.map[Keymap.normalize(key)];
};
// 在指定的元素上配置 keymap
Keymap.prototype.install = function (element) {
    var keymap = this;

    function handler(event) {
        return keymap.dispatch(event, element);
    }

    if (element.addEventListener) {
        element.addEventListener("keydown", handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("onkeydown", handler);
    }
};
// 当触发键盘事件时，如果匹配到了 Keymap.map 中的keyid，则调用keyid对应的handler
Keymap.prototype.dispatch = function (event, element) {
    var modifiers = ""; // 辅助键
    var keyname = null; // 键名
    if (event.altKey) modifiers += "alt_";
    if (event.ctrlKey) modifiers += "ctrl_";
    if (event.metaKey) modifiers += "meta_";
    if (event.shiftKey) modifiers += "shift_";
    if (event.key) {
        keyname = event.key;
    } else if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+") {
        keyname = event.keyIdentifier;
    } else {
        keyname = Keymap.keyCodeToKeyname[event.keyCode];
    }
    if (!keyname) return;
    // 键盘事件发生时的keyid
    var keyid = modifiers + keyname.toLowerCase();
    // 匹配 Keymap.map 中的keyid
    var handler = this.map[keyid];
    if (handler) { // 如果匹配到了，则调用keyid对应的handler
        var returnValue = handler.call(element, event, keyid);
        if (returnValue === false) { // 如果返回值为false
            // 取消冒泡
            if (event.stopPropagation) {  // 标准
                event.stopPropagation();
            } else {
                event.cancelBubble = true;  // IE
            }
            // 阻止按键的默认行为，即取消此次按键
            if (event.preventDefault) {   // 标准
                event.preventDefault();
            } else {
                event.returnValue = false;  // IE
            }
        }
        return returnValue;
    }
};
// 把标准化keyid，“ctrl+s” => “ctrl_s”
Keymap.normalize = function (keyid) {
    keyid = keyid.toLowerCase();
    var words = keyid.split(/\s+|[\-+_]/);
    var keyname = words.pop();
    keyname = Keymap.aliases[keyname] || keyname;
    words.sort();
    words.push(keyname);
    return words.join("_");
};
// 把按键常见的别名映射到“正式名”
Keymap.aliases = {
    "escape": "esc",
    "delete": "del",
    "return": "enter",
    "ctrl": "control",
    "space": "spacebar",
    "ins": "insert"
}
// 传统的keyCode是不标准的，以下可以在大多数浏览器和OS中使用
Keymap.keyCodeToKeyname = {
    // Keys with words or arrows on them
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Esc",
    32: "Spacebar",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    45: "Insert",
    46: "Del",
    // Number keys on main keyboard (not keypad)
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    // Letter keys. Note that we don't distinguish upper and lower case
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    // Keypad numbers and punctuation keys. (Opera does not support these.) 96:"0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "Multiply",
    107: "Add",
    109: "Subtract",
    110: "Decimal",
    111: "Divide",
    // Function keys
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    124: "F13",
    125: "F14",
    126: "F15",
    127: "F16",
    128: "F17",
    129: "F18",
    130: "F19",
    131: "F20",
    132: "F21",
    133: "F22",
    134: "F23",
    135: "F24",
    // Punctuation keys that don't require holding down Shift
    // Hyphen is nonportable: FF returns same code as Subtract
    59: ";",
    61: "=",
    186: ";",
    187: "=", // Firefox and Opera return 59,61
    188: ",",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
}
// ----------
var keymap = new Keymap({
    "ctrl+s": function () {
        console.info("ctrl+s");
    },
    "ctrl+a": function () {
        console.info("ctrl+a");
    }
});
keymap.bind("ctrl+v", function () {
    console.info("ctrl+v");
});
keymap.install(document.body);
