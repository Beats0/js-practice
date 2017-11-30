var __reflect = this && this.__reflect || function(t, e, n) {
    t.__class__ = e,
        n ? n.push(e) : n = [e],
        t.__types__ = t.__types__ ? n.concat(t.__types__) : n
}
    , __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }

    for (var a in e)
        e.hasOwnProperty(a) && (t[a] = e[a]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
        new n)
}
    , __rest = this && this.__rest || function(t, e) {
    var n = {};
    for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && e.indexOf(a) < 0 && (n[a] = t[a]);
    if (null != t && "function" == typeof Object.getOwnPropertySymbols)
        for (var r = 0, a = Object.getOwnPropertySymbols(t); r < a.length; r++)
            e.indexOf(a[r]) < 0 && (n[a[r]] = t[a[r]]);
    return n
}
    , GAL;
!function(t) {
    var e = 16
        , n = 0
        , a = 4
        , r = 6
        , i = 8
        , o = 12
        , c = function() {
        function t() {
            var t = this;
            this.onMessage = null,
                this.ws = null,
                this.textDecoder = this.getDecoder(),
                this.textEncoder = this.getEncoder(),
                this.heartbeatInterval = 0,
                this.timestamp = Date.now(),
                this.connect = function() {
                    t.ws = new WebSocket("ws://broadcastlv.chat.bilibili.com:4090/sub"),
                        t.ws.binaryType = "arraybuffer",
                        t.ws.onopen = t.handleOpen,
                        t.ws.onmessage = t.handleMessage,
                        t.ws.onclose = t.handleClose,
                        t.ws.onerror = t.handleError
                }
                ,
                this.handleOpen = function() {
                    t.auth()
                }
                ,
                this.handleMessage = function(e) {
                    var c = e.data
                        , s = new DataView(c,0)
                        , u = s.getInt32(n)
                        , f = s.getInt16(a)
                        , h = (s.getInt16(r),
                        s.getInt32(i));
                    s.getInt32(o);
                    switch (h) {
                        case 8:
                            t.heartbeat(),
                                t.heartbeatInterval = setInterval(t.heartbeat, 1e4);
                            break;
                        case 3:
                            break;
                        case 5:
                            for (var l = s, d = c, g = void 0, y = 0; y < d.byteLength; y += u) {
                                u = l.getInt32(y),
                                    f = l.getInt16(y + a),
                                    g = t.textDecoder.decode(d.slice(y + f, y + u));
                                try {
                                    var m = JSON.parse(g)
                                        , w = m.CMD
                                        , p = m.Info;
                                    m.RoomID;
                                    "ACT" === w && Date.now() - t.timestamp >= 600 && (t.onMessage(p),
                                        t.timestamp = Date.now())
                                } catch (x) {}
                            }
                    }
                }
                ,
                this.handleClose = function() {
                    t.heartbeatInterval && clearInterval(t.heartbeatInterval);
                    var e = Math.floor(3 * Math.random() + 3);
                    setTimeout(t.connect, 1e3 * e)
                }
                ,
                this.handleError = function(t) {}
                ,
                this.heartbeat = function() {
                    var c = new ArrayBuffer(e)
                        , s = new DataView(c,0);
                    s.setInt32(n, e),
                        s.setInt16(a, e),
                        s.setInt16(r, 1),
                        s.setInt32(i, 2),
                        s.setInt32(o, 1),
                        t.ws.send(c)
                }
        }

        return t.prototype.open = function(t) {
            void 0 === t && (t = function() {}
            ),
                this.onMessage = t;
            try {
                this.connect()
            } catch (e) {
                console.log(e)
            }
        }
            ,
            t.prototype.close = function() {
                this.onMessage = function() {}
                    ,
                this.ws && (this.ws.onopen = function() {}
                    ,
                    this.ws.onmessage = function() {}
                    ,
                    this.ws.onclose = function() {}
                    ,
                    this.ws.onerror = function() {}
                    ,
                    this.ws.close())
            }
            ,
            t.prototype.auth = function() {
                var t = JSON.stringify({
                    uid: 0,
                    roomid: 5078459
                })
                    , c = new ArrayBuffer(e)
                    , s = new DataView(c,0)
                    , u = this.textEncoder.encode(t);
                s.setInt32(n, e + u.byteLength),
                    s.setInt16(a, e),
                    s.setInt16(r, 1),
                    s.setInt32(i, 7),
                    s.setInt32(o, 1),
                    this.ws.send(this.mergeArrayBuffer(c, u))
            }
            ,
            t.prototype.mergeArrayBuffer = function(t, e) {
                var n = new Uint8Array(t)
                    , a = new Uint8Array(e)
                    , r = new Uint8Array(t.byteLength + e.byteLength);
                return r.set(n, 0),
                    r.set(a, t.byteLength),
                    r.buffer
            }
            ,
            t.prototype.char2ab = function(t) {
                for (var e = new ArrayBuffer(t.length), n = new Uint8Array(e), a = 0; a < t.length; a += 1)
                    n[a] = t[a];
                return e
            }
            ,
            t.prototype.getDecoder = function() {
                return "undefined" != typeof TextDecoder ? new TextDecoder : {
                    decode: function(t) {
                        return decodeURIComponent(encodeURIComponent(String.fromCharCode.apply(String, new Uint8Array(t))))
                    }
                }
            }
            ,
            t.prototype.getEncoder = function() {
                return "undefined" != typeof TextEncoder ? new TextEncoder : {
                    encode: function(t) {
                        for (var e = new ArrayBuffer(t.length), n = new Uint8Array(e), a = 0, r = t.length; r > a; a += 1)
                            n[a] = t.charCodeAt(a);
                        return e
                    }
                }
            }
            ,
            t
    }();
    t.WS = c,
        __reflect(c.prototype, "GAL.WS")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function() {
        function t() {
            var t = this;
            this.isEnd = !0,
                this.tw = [],
                this.states = [],
                this.init = function(e, n, a) {
                    t.tw = [],
                        t.states = [],
                        t.animation = e,
                        n instanceof Array ? t.target = n : t.target = [n],
                        t.target.forEach(function(e) {
                            t.tw.push(egret.Tween.get(e)),
                                t.states.push(!1)
                        }),
                        t.callback = a
                }
                ,
                this.check = function() {
                    return t.isEnd
                }
                ,
                this.start = function(e) {
                    t.isEnd = !1,
                        t.nextTransform = e,
                        t.tw.forEach(function(e, n) {
                            e.to(t.nextTransform, t.animation.duration, t.animation.func).call(function() {
                                t.states[n] = !0;
                                var e = t.states.reduce(function(t, e) {
                                    return t && e
                                });
                                e && (t.isEnd = !0,
                                t.callback && t.callback(t.nextTransform))
                            })
                        })
                }
                ,
                this.end = function() {
                    t.target.forEach(function(e, n) {
                        t.tw[n] && egret.Tween.pauseTweens(e),
                            Object.keys(t.nextTransform).forEach(function(n) {
                                e[n] = t.nextTransform[n]
                            })
                    }),
                        t.isEnd = !0,
                    t.callback && t.callback(t.nextTransform)
                }
        }

        return t
    }();
    t.Animator = e,
        __reflect(e.prototype, "GAL.Animator")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    t.MAX_GRID = 6,
        t.CHAR_SIZE_LUT = {
            scale: {
                exSmall: .2,
                small: .6,
                middle: 1,
                large: 1.6,
                exLarge: 2
            },
            yOffset: {
                exSmall: 32,
                small: 64,
                middle: 84,
                large: 96,
                exLarge: 128
            },
            initFromOffset: {
                exSmall: .1,
                small: .2,
                middle: .3,
                large: .4,
                exLarge: .4
            }
        },
        t.CHAR_ATTRS = {},
        t.DIALOG_SIZE_LUT = {
            touchIcon: {
                bg: "elements.touch",
                width: 64,
                right: 12,
                bottom: 12
            },
            adv: {
                width: 540,
                height: 287,
                nameLeft: 128,
                nameSize: 28,
                nameWidth: 256,
                nameTop: 42,
                wordsLeft: 30,
                wordsTop: 112,
                wordsWidth: 480,
                wordsSize: 24,
                wordsLineSpacing: 8
            },
            nvl: {
                bg: "dialog.nvl",
                width: 540,
                height: 960,
                innerWidth: 460,
                innerHeight: 720,
                nameWidth: 256,
                nameSize: 28,
                nameLeft: 0,
                wordsLeft: 0,
                wordsTop: 18,
                wordsSize: 24,
                wordsLineSpacing: 4,
                blockSpacing: 32,
                blockMinHeight: 32
            }
        },
        t.BRANCH_ATTRS = {
            branchWidth: 420,
            branchAligh: egret.HorizontalAlign.RIGHT,
            textWidth: 420,
            textX: 0,
            textY: null,
            branchPadding: 8,
            color: 16777215,
            fontSize: 22,
            lineSpace: 6,
            branchSpace: 12,
            textAlign: egret.HorizontalAlign.CENTER,
            bg: "elements.button",
            mask: "dialog.nvl"
        }
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function() {
        function t() {
            var t = this;
            this.isEnd = !0,
                this.start = function(e, n, a, r) {
                    if (t.isEnd = !1,
                            t.parent = a,
                            t.preTarget = e,
                            t.nextTarget = n,
                            t.nextTarget.alpha = 0,
                            void 0 !== r ? t.parent.addChildAt(t.nextTarget, r) : t.parent.addChild(t.nextTarget),
                        "fade" === t.transition.type) {
                        var i = t.transition.duration;
                        egret.Tween.get(t.preTarget).to({
                            alpha: 0
                        }, .8 * i),
                            egret.Tween.get(t.nextTarget).wait(.3 * i).to({
                                alpha: 1
                            }, .7 * i).call(function() {
                                return t.end()
                            })
                    }
                    "none" === t.transition.type && t.end()
                }
                ,
                this.check = function() {
                    return t.isEnd
                }
                ,
                this.end = function() {
                    t.isEnd || (egret.Tween.pauseTweens(t.preTarget),
                        egret.Tween.pauseTweens(t.nextTarget),
                        t.parent.removeChild(t.preTarget),
                        t.nextTarget.alpha = 1,
                        t.isEnd = !0,
                        t.preTarget = null,
                        t.nextTarget = null)
                }
        }

        return t.prototype.init = function(t) {
            this.transition = t
        }
            ,
            t
    }();
    t.Transition = e,
        __reflect(e.prototype, "GAL.Transition")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function() {
        function t(t, e) {
            void 0 === t && (t = !1),
            void 0 === e && (e = !1),
                this.multiple = !1,
                this.audio = {
                    audio: null,
                    channel: null,
                    position: 0
                },
                this.multiple = t,
                this.defaultLoop = e
        }

        return t.prototype.play = function(t, e) {
            this.multiple || (this.loop = void 0 === e ? this.defaultLoop : e,
            this.audio.channel && this.audio.channel.stop(),
                this.audio.audio = RES.getRes(t),
                this.audio.channel = this.audio.audio.play(0, this.loop ? 0 : 1))
        }
            ,
            t.prototype.pause = function() {
                this.multiple || (this.audio.position = this.audio.channel.position,
                    this.audio.channel.stop(),
                    this.audio.channel = null)
            }
            ,
            t.prototype.resume = function() {
                this.multiple || (this.audio.channel = this.audio.audio.play(this.audio.position, this.loop ? -1 : 1))
            }
            ,
            t.prototype.stop = function() {
                this.multiple || this.audio.channel.stop()
            }
            ,
            t.prototype.volume = function(t) {
                this.multiple || (this.audio.channel.volume = t)
            }
            ,
            t
    }();
    t.Audio = e,
        __reflect(e.prototype, "GAL.Audio")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var n = null !== e && e.apply(this, arguments) || this;
            return n.isEnd = !1,
                n.animation = {
                    duration: 400,
                    func: function(t) {
                        return t
                    }
                },
                n.direction = {
                    direction: "right",
                    offset: 128
                },
                n.customTransform = !1,
                n.animator = new t.Animator,
                n
        }

        return __extends(n, e),
            n.prototype.addToScene = function(t) {
                this.scene = t,
                    this.scene.layers.branch.addChild(this)
            }
            ,
            n.prototype.open = function(e, n, a) {
                var r = this;
                void 0 === n && (n = !0),
                void 0 === a && (a = {}),
                    this.isEnd = !1,
                    this.scene.hideDialog();
                var i = new egret.Bitmap;
                i.texture = RES.getRes("" + t.BRANCH_ATTRS.mask),
                    this.addChild(i);
                var o = new egret.DisplayObjectContainer;
                this.addChild(o);
                var c = 0
                    , s = 0;
                e.forEach(function(e, i) {
                    var c = e.content
                        , u = e.callback
                        , f = e.bg
                        , h = e.transform
                        , l = new egret.DisplayObjectContainer
                        , d = new egret.Bitmap;
                    d.texture = RES.getRes("" + (f || t.BRANCH_ATTRS.bg));
                    var g = new egret.TextField;
                    if (l.touchEnabled = !0,
                            r.customTransform) {
                        g.text = c || "",
                            g.size = h.size || t.BRANCH_ATTRS.fontSize,
                            l.width = h.width,
                            d.width = h.width,
                            g.width = h.width,
                            l.height = h.height,
                            d.height = h.height,
                            g.textAlign = h.textAlign || egret.HorizontalAlign.CENTER,
                            g.lineSpacing = h.lineSpacing || t.BRANCH_ATTRS.lineSpace,
                            g.textColor = h.color || t.BRANCH_ATTRS.color,
                            g.y = (h.height - g.height) / 2;
                        var y = h.x || t.BRANCH_ATTRS.branchAligh;
                        "number" == typeof y ? l.x = y : y === egret.HorizontalAlign.CENTER ? l.x = (t.BRANCH_ATTRS.branchWidth - t.BRANCH_ATTRS.textWidth) / 2 : y === egret.HorizontalAlign.LEFT ? l.x = 0 : y === egret.HorizontalAlign.RIGHT && (l.x = r.stage.stageWidth - l.width),
                            l.y = h.y,
                            l.rotation = h.rotation || 0
                    } else {
                        g.text = c,
                            g.size = a.size || t.BRANCH_ATTRS.fontSize,
                            l.width = a.width || t.BRANCH_ATTRS.branchWidth,
                            d.width = a.width || t.BRANCH_ATTRS.branchWidth,
                            g.width = a.width || t.BRANCH_ATTRS.textWidth,
                            d.height = l.width / d.texture.textureWidth * d.texture.textureHeight,
                            g.textAlign = a.textAlign || t.BRANCH_ATTRS.textAlign,
                            g.lineSpacing = a.lineSpacing || t.BRANCH_ATTRS.lineSpace,
                            g.x = t.BRANCH_ATTRS.textX || 0,
                            g.y = t.BRANCH_ATTRS.textY || (d.height - g.height) / 2;
                        var m = a.x || t.BRANCH_ATTRS.branchAligh;
                        "number" == typeof m ? l.x = m : m === egret.HorizontalAlign.CENTER ? l.x = (r.stage.stageWidth - t.BRANCH_ATTRS.branchWidth) / 2 : m === egret.HorizontalAlign.LEFT ? l.x = 0 : m === egret.HorizontalAlign.RIGHT && (l.x = r.stage.stageWidth - l.width),
                            l.y = s,
                            l.height = (a.height || d.height) + 2 * t.BRANCH_ATTRS.branchPadding,
                            s += l.height + t.BRANCH_ATTRS.branchSpace
                    }
                    l.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
                        u(i, c),
                        n && r.close()
                    }, r),
                        l.addChild(d),
                        l.addChild(g),
                        o.addChild(l)
                });
                var u = this.stage.stageWidth
                    , f = this.stage.stageHeight;
                this.customTransform ? (o.width = u,
                    o.height = f) : (c = s,
                    s = (f - c) / 2,
                    o.y = s),
                    this.customTransform = !1,
                    o.alpha = 0;
                var h = this.direction
                    , l = h.offset
                    , d = h.direction
                    , g = o.x
                    , y = o.y;
                return "left" === d ? o.x -= l : "right" === d ? o.x += l : "top" === d ? o.y -= l : "bottom" === d && (o.y += l),
                    this.animator.init(this.animation, o),
                    this.animator.start({
                        alpha: 1,
                        x: g,
                        y: y
                    }),
                    {
                        check: function() {
                            return r.isEnd
                        },
                        exec: function() {}
                    }
            }
            ,
            n.prototype.animate = function(t, e) {
                return void 0 === t && (t = 500),
                void 0 === e && (e = function(t) {
                        return t
                    }
                ),
                    this.animation = {
                        duration: t,
                        func: e
                    },
                    this
            }
            ,
            n.prototype.custom = function() {
                return this.customTransform = !0,
                    this
            }
            ,
            n.prototype.from = function(t, e) {
                return void 0 === e && (e = 24),
                    this.direction.direction = t,
                e && (this.direction.offset = e),
                    this
            }
            ,
            n.prototype.close = function() {
                this.removeChildren(),
                    this.isEnd = !0
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Branch = e,
        __reflect(e.prototype, "GAL.Branch")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var n = e.call(this) || this;
            return n.bg = new egret.Bitmap,
                n.titleLayers = {
                    two: new egret.Bitmap,
                    three: new egret.Bitmap,
                    tv: new egret.Bitmap,
                    bg: new egret.Bitmap,
                    logo: new egret.Bitmap
                },
                n.sexLayers = {
                    boy: new egret.Bitmap,
                    girl: new egret.Bitmap,
                    boyTip: new egret.Bitmap,
                    girlTip: new egret.Bitmap,
                    boySelect: new egret.Bitmap,
                    girlSelect: new egret.Bitmap,
                    frame: new egret.Bitmap,
                    title: new egret.TextField,
                    content: new egret.TextField,
                    confirm: new egret.Bitmap
                },
                n.layers = {
                    title: new egret.DisplayObjectContainer,
                    mask: new egret.Bitmap,
                    sex: new egret.DisplayObjectContainer
                },
                n.sex = 0,
                n.animationEnd = !1,
                n.callback = null,
                n.handleSelectBoy = function() {
                    if (0 !== n.sex) {
                        var t = egret.Tween.get(n.sexLayers.boySelect)
                            , e = egret.Tween.get(n.sexLayers.girlSelect)
                            , a = egret.Tween.get(n.sexLayers.frame);
                        e.to({
                            scaleX: 1.1,
                            scaleY: 1.1
                        }, 400, egret.Ease.quadInOut).call(function() {
                            n.sexLayers.girlSelect.texture = RES.getRes("elements.sex-icon-no")
                        }).to({
                            scaleX: 1,
                            scaleY: 1
                        }, 300, egret.Ease.backInOut),
                            t.wait(300).to({
                                scaleX: 1.2,
                                scaleY: 1.2
                            }, 600, egret.Ease.backInOut).call(function() {
                                n.sexLayers.boySelect.texture = RES.getRes("elements.sex-icon-ok")
                            }).to({
                                scaleX: 1,
                                scaleY: 1
                            }, 400, egret.Ease.backInOut),
                            a.to({
                                alpha: 0
                            }, 400, egret.Ease.quadInOut).call(function() {
                                n.sexLayers.frame.scaleX = .6,
                                    n.sexLayers.frame.scaleY = .6,
                                    n.sexLayers.frame.x = n.sexLayers.boySelect.x
                            }).to({
                                alpha: 1,
                                scaleX: 1,
                                scaleY: 1
                            }, 600, egret.Ease.backInOut).to({
                                scaleX: .95,
                                scaleY: .95
                            }, 150, function(t) {
                                return t
                            }).to({
                                scaleX: 1.05,
                                scaleY: 1.05
                            }, 150, function(t) {
                                return t
                            }).to({
                                scaleX: 1,
                                scaleY: 1
                            }, 150, function(t) {
                                return t
                            }).call(function() {
                                n.sex = 0
                            })
                    }
                }
                ,
                n.handleSelectGirl = function() {
                    if (1 !== n.sex) {
                        var t = egret.Tween.get(n.sexLayers.boySelect)
                            , e = egret.Tween.get(n.sexLayers.girlSelect)
                            , a = egret.Tween.get(n.sexLayers.frame);
                        t.to({
                            scaleX: 1.1,
                            scaleY: 1.1
                        }, 400, egret.Ease.quadInOut).call(function() {
                            n.sexLayers.boySelect.texture = RES.getRes("elements.sex-icon-no")
                        }).to({
                            scaleX: 1,
                            scaleY: 1
                        }, 300, egret.Ease.backInOut),
                            e.wait(300).to({
                                scaleX: 1.2,
                                scaleY: 1.2
                            }, 600, egret.Ease.backInOut).call(function() {
                                n.sexLayers.girlSelect.texture = RES.getRes("elements.sex-icon-ok")
                            }).to({
                                scaleX: 1,
                                scaleY: 1
                            }, 400, egret.Ease.backInOut),
                            a.to({
                                alpha: 0
                            }, 400, egret.Ease.quadInOut).call(function() {
                                n.sexLayers.frame.scaleX = .6,
                                    n.sexLayers.frame.scaleY = .6,
                                    n.sexLayers.frame.x = n.sexLayers.girlSelect.x
                            }).to({
                                alpha: 1,
                                scaleX: 1,
                                scaleY: 1
                            }, 600, egret.Ease.backInOut).to({
                                scaleX: .95,
                                scaleY: .95
                            }, 150, function(t) {
                                return t
                            }).to({
                                scaleX: 1.05,
                                scaleY: 1.05
                            }, 150, function(t) {
                                return t
                            }).to({
                                scaleX: 1,
                                scaleY: 1
                            }, 150, function(t) {
                                return t
                            }).call(function() {
                                n.sex = 1
                            })
                    }
                }
                ,
                n.handleConfirm = function() {
                    t.post(t.config.domain.sex, {
                        sex: n.sex
                    }).then(function(t) {
                        var e = t.data
                            , a = e.code
                            , r = e.msg;
                        return 0 !== a ? void alert("出错啦：" + r) : (n.animationEnd = !0,
                            void n.callback(n.sex))
                    })["catch"](function(t) {
                        alert("出了点问题呢，请重试哦~")
                    })
                }
                ,
                n.bg.name = "bg",
                n.addChild(n.bg),
                n.titleLayers.two.name = "22",
                n.titleLayers.three.name = "33",
                n.titleLayers.tv.name = "tv",
                n.titleLayers.bg.name = "bg",
                n.titleLayers.logo.name = "logo",
                n.layers.title.addChild(n.titleLayers.bg),
                n.layers.title.addChild(n.titleLayers.tv),
                n.layers.title.addChild(n.titleLayers.three),
                n.layers.title.addChild(n.titleLayers.two),
                n.layers.title.addChild(n.titleLayers.logo),
                n.sexLayers.boy.name = "boy",
                n.sexLayers.girl.name = "girl",
                n.sexLayers.confirm.name = "confirm",
                n.sexLayers.content.name = "content",
                n.sexLayers.title.name = "title",
                n.sexLayers.boyTip.name = "boyTip",
                n.sexLayers.girlTip.name = "girlTip",
                n.sexLayers.boySelect.name = "boySelect",
                n.sexLayers.girlSelect.name = "girlSelect",
                n.sexLayers.frame.name = "frame",
                n.layers.sex.addChild(n.sexLayers.title),
                n.layers.sex.addChild(n.sexLayers.content),
                n.layers.sex.addChild(n.sexLayers.frame),
                n.layers.sex.addChild(n.sexLayers.boy),
                n.layers.sex.addChild(n.sexLayers.girl),
                n.layers.sex.addChild(n.sexLayers.boyTip),
                n.layers.sex.addChild(n.sexLayers.girlTip),
                n.layers.sex.addChild(n.sexLayers.boySelect),
                n.layers.sex.addChild(n.sexLayers.girlSelect),
                n.layers.sex.addChild(n.sexLayers.confirm),
                n.layers.title.name = "title",
                n.layers.mask.name = "mask",
                n.layers.sex.name = "sex",
                n.addChild(n.layers.title),
                n.addChild(n.layers.mask),
                n.addChild(n.layers.sex),
                n
        }

        return __extends(n, e),
            n.prototype.addToStage = function(t) {
                this.originStage = t,
                    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.reset, this)
            }
            ,
            n.prototype.init = function() {
                this.originStage.addChild(this)
            }
            ,
            n.prototype.showTitle = function(t) {
                var e = this;
                void 0 === t && (t = function() {}
                ),
                    this.layers.title.visible = !0,
                    this.animationEnd = !1,
                    this.titleLayers.two.alpha = 0,
                    this.titleLayers.three.alpha = 0,
                    this.titleLayers.tv.alpha = 0,
                    this.titleLayers.logo.alpha = 0;
                var n = this.titleLayers.two.y;
                this.titleLayers.two.y += 36;
                var a = this.titleLayers.three.y;
                this.titleLayers.three.y += 36;
                var r = this.titleLayers.tv.y;
                this.titleLayers.tv.y += 36;
                var i = this.titleLayers.logo.y;
                this.titleLayers.logo.y += 36;
                var o = egret.Tween.get(this.titleLayers.two)
                    , c = egret.Tween.get(this.titleLayers.three)
                    , s = egret.Tween.get(this.titleLayers.tv)
                    , u = egret.Tween.get(this.titleLayers.logo);
                return c.to({
                    alpha: 1,
                    y: a
                }, 700, egret.Ease.quadOut),
                    o.wait(400).to({
                        alpha: 1,
                        y: n
                    }, 700, egret.Ease.quadOut),
                    s.wait(600).to({
                        alpha: 1,
                        y: r
                    }, 600, egret.Ease.quadOut),
                    u.wait(800).to({
                        alpha: 1,
                        y: i
                    }, 700, egret.Ease.quadOut).call(function() {
                        t(),
                            e.animationEnd = !0
                    }),
                    {
                        check: function() {
                            return e.animationEnd
                        },
                        exec: function() {}
                    }
            }
            ,
            n.prototype.chooseSex = function(t) {
                var e = this;
                void 0 === t && (t = function() {}
                ),
                    this.layers.sex.visible = !0,
                    this.layers.mask.visible = !0,
                    this.animationEnd = !1,
                    this.callback = t,
                    this.layers.mask.alpha = 0,
                    this.sexLayers.boy.alpha = 0,
                    this.sexLayers.girl.alpha = 0,
                    this.sexLayers.title.alpha = 0,
                    this.sexLayers.content.alpha = 0,
                    this.sexLayers.confirm.alpha = 0,
                    this.sexLayers.boySelect.scaleX = 0,
                    this.sexLayers.boySelect.scaleY = 0,
                    this.sexLayers.boyTip.scaleX = 0,
                    this.sexLayers.girlTip.scaleY = 0,
                    this.sexLayers.girlSelect.scaleX = 0,
                    this.sexLayers.girlSelect.scaleY = 0,
                    this.sexLayers.frame.scaleX = .6,
                    this.sexLayers.frame.scaleY = .6,
                    this.sexLayers.frame.alpha = 0;
                var n = this.layers.mask.y;
                this.layers.mask.y += 36;
                var a = this.sexLayers.boy.y;
                this.sexLayers.boy.y += 72;
                var r = this.sexLayers.girl.y;
                this.sexLayers.girl.y += 72;
                var i = this.sexLayers.title.y;
                this.sexLayers.title.y += 36;
                var o = this.sexLayers.content.y;
                this.sexLayers.content.y += 36;
                var c = this.sexLayers.confirm.y;
                this.sexLayers.confirm.y += 36;
                var s = egret.Tween.get(this.layers.mask)
                    , u = egret.Tween.get(this.sexLayers.title)
                    , f = egret.Tween.get(this.sexLayers.content)
                    , h = egret.Tween.get(this.sexLayers.boy)
                    , l = egret.Tween.get(this.sexLayers.girl)
                    , d = egret.Tween.get(this.sexLayers.confirm)
                    , g = egret.Tween.get(this.sexLayers.boyTip)
                    , y = egret.Tween.get(this.sexLayers.girlTip)
                    , m = egret.Tween.get(this.sexLayers.boySelect)
                    , w = egret.Tween.get(this.sexLayers.girlSelect)
                    , p = egret.Tween.get(this.sexLayers.frame)
                    , x = egret.Tween.get(this.layers.title);
                return x.wait(400).to({
                    y: -146
                }, 1e3, egret.Ease.quadOut).to({
                    alpha: 0
                }, 500, egret.Ease.quadInOut).call(function() {
                    e.layers.title.visible = !1,
                        e.layers.mask.visible = !1
                }),
                    s.to({
                        alpha: 1,
                        y: n
                    }, 600, egret.Ease.quadOut),
                    u.wait(200).to({
                        alpha: 1,
                        y: i
                    }, 400, egret.Ease.quadOut),
                    f.wait(200).to({
                        alpha: 1,
                        y: o
                    }, 400, egret.Ease.quadOut),
                    h.wait(600).to({
                        alpha: 1,
                        y: a
                    }, 600, egret.Ease.quadOut),
                    l.wait(800).to({
                        alpha: 1,
                        y: r
                    }, 600, egret.Ease.quadOut),
                    d.wait(1e3).to({
                        alpha: 1,
                        y: c
                    }, 500, egret.Ease.quadOut),
                    g.wait(1e3).to({
                        scaleX: 1.2,
                        scaleY: 1.2
                    }, 600, egret.Ease.backInOut).to({
                        scaleX: .9,
                        scaleY: .9
                    }, 200).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 200),
                    y.wait(1e3).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 600, egret.Ease.backInOut).to({
                        scaleX: .9,
                        scaleY: .9
                    }, 200).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 200),
                    m.wait(1400).to({
                        scaleX: 1.2,
                        scaleY: 1.2
                    }, 800, egret.Ease.backInOut).call(function() {
                        e.sexLayers.boySelect.texture = RES.getRes("elements.sex-icon-ok")
                    }).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 400, egret.Ease.backInOut),
                    w.wait(1400).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 800, egret.Ease.backInOut),
                    p.wait(1800).to({
                        alpha: 1,
                        scaleX: 1,
                        scaleY: 1
                    }, 600, egret.Ease.backInOut).to({
                        scaleX: .95,
                        scaleY: .95
                    }, 150, function(t) {
                        return t
                    }).to({
                        scaleX: 1.05,
                        scaleY: 1.05
                    }, 150, function(t) {
                        return t
                    }).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 150, function(t) {
                        return t
                    }).call(function() {
                        e.sexLayers.boy.addEventListener(egret.TouchEvent.TOUCH_TAP, e.handleSelectBoy, e),
                            e.sexLayers.girl.addEventListener(egret.TouchEvent.TOUCH_TAP, e.handleSelectGirl, e),
                            e.sexLayers.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, e.handleConfirm, e)
                    }),
                    {
                        check: function() {
                            return e.animationEnd
                        },
                        exec: function() {}
                    }
            }
            ,
            n.prototype.close = function() {
                this.originStage.removeChild(this)
            }
            ,
            n.prototype.reset = function() {
                this.layers.title.visible = !1,
                    this.layers.sex.visible = !1,
                    this.layers.mask.visible = !1,
                    this.animationEnd = !1,
                    this.resetTitle(),
                    this.resetSex()
            }
            ,
            n.prototype.resetTitle = function() {
                var t = this.titleLayers
                    , e = t.two
                    , n = t.three
                    , a = t.tv
                    , r = (t.bg,
                    t.logo)
                    , i = this.originStage
                    , o = i.stageWidth
                    , c = i.stageHeight;
                this.bg.texture = RES.getRes("elements.title-bg-blur"),
                    this.bg.x = 0,
                    this.bg.x = 0,
                    this.layers.title.x = 0,
                    this.layers.title.y = 0,
                    this.layers.title.alpha = 1,
                    this.titleLayers.two.texture = RES.getRes("cg.2233"),
                    this.titleLayers.three.texture = RES.getRes("cg.moon"),
                    this.titleLayers.tv.texture = RES.getRes("cg.bridge"),
                    this.titleLayers.bg.texture = RES.getRes("elements.title-bg"),
                    this.titleLayers.logo.texture = RES.getRes("elements.logo"),
                    e.width = 1233,
                    e.height = e.texture.textureHeight / e.texture.textureWidth * e.width,
                    e.x = -480,
                    e.y = c - e.height - 24,
                    n.width = 884,
                    n.height = n.texture.textureHeight / n.texture.textureWidth * n.width,
                    n.x = -40,
                    n.y = -260,
                    a.width = 2548,
                    a.height = a.texture.textureHeight / a.texture.textureWidth * a.width,
                    a.x = 1500,
                    a.y = -120,
                    a.scaleX = -1,
                    r.width = 4 * o / 5,
                    r.height = r.texture.textureHeight / r.texture.textureWidth * r.width,
                    r.x = o / 10,
                    r.y = c - 128 - r.height
            }
            ,
            n.prototype.resetSex = function() {
                var t = this.sexLayers
                    , e = t.boy
                    , n = t.girl
                    , a = t.confirm
                    , r = t.content
                    , i = t.title
                    , o = t.boySelect
                    , c = t.girlSelect
                    , s = t.frame
                    , u = t.boyTip
                    , f = t.girlTip
                    , h = this.layers.mask
                    , l = this.originStage
                    , d = l.stageWidth
                    , g = l.stageHeight;
                e.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelectBoy, this),
                    n.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelectGirl, this),
                    a.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelectBoy, this),
                    e.touchEnabled = !0,
                    n.touchEnabled = !0,
                    a.touchEnabled = !0,
                    h.texture = RES.getRes("elements.white-mask"),
                    e.texture = RES.getRes("elements.sex-boy"),
                    n.texture = RES.getRes("elements.sex-girl"),
                    a.texture = RES.getRes("elements.confirm"),
                    o.texture = RES.getRes("elements.sex-icon-no"),
                    c.texture = RES.getRes("elements.sex-icon-no"),
                    u.texture = RES.getRes("elements.sex-icon-boy"),
                    f.texture = RES.getRes("elements.sex-icon-girl"),
                    s.texture = RES.getRes("elements.sex-icon-frame"),
                    i.text = "请选择性别",
                    r.text = "只可以选择一次哦！",
                    h.width = d,
                    h.height = h.texture.textureHeight / h.texture.textureWidth * h.width,
                    h.x = 0,
                    h.y = g - h.height,
                    i.width = d,
                    i.size = 42,
                    i.textAlign = egret.HorizontalAlign.CENTER,
                    i.y = 0,
                    r.width = d,
                    r.size = 18,
                    r.textAlign = egret.HorizontalAlign.CENTER,
                    r.y = i.size + 16;
                var y = d / 28;
                e.width = 9 * y,
                    e.height = e.texture.textureHeight / e.texture.textureWidth * e.width,
                    e.x = 4 * y,
                    e.y = r.y + 48,
                    n.width = e.width,
                    n.height = e.height,
                    n.x = e.width + 6 * y,
                    n.y = e.y,
                    o.width = e.width / 6,
                    o.height = o.texture.textureHeight / o.texture.textureWidth * o.width,
                    o.anchorOffsetX = o.width / 2,
                    o.anchorOffsetY = o.height / 2,
                    o.x = e.x + e.width / 2,
                    o.y = e.y + e.height - 128,
                    c.width = o.width,
                    c.height = o.height,
                    c.anchorOffsetX = o.anchorOffsetX,
                    c.anchorOffsetY = o.anchorOffsetY,
                    c.x = n.x + n.width / 2,
                    c.y = o.y,
                    u.width = e.width / 4,
                    u.height = u.texture.textureHeight / u.texture.textureWidth * u.width,
                    u.anchorOffsetX = u.width / 2,
                    u.anchorOffsetY = u.height / 2,
                    u.x = e.x + e.width / 2,
                    u.y = e.y + e.height - 256,
                    f.width = u.width,
                    f.height = u.height,
                    f.anchorOffsetX = u.anchorOffsetX,
                    f.anchorOffsetY = u.anchorOffsetY,
                    f.x = n.x + n.width / 2,
                    f.y = u.y,
                    s.width = e.width + 36,
                    s.height = s.texture.textureHeight / s.texture.textureWidth * s.width,
                    s.anchorOffsetX = s.width / 2,
                    s.anchorOffsetY = s.height / 2,
                    s.x = o.x,
                    s.y = 80 + e.height / 2,
                    a.width = d / 3,
                    a.height = a.texture.textureHeight / a.texture.textureWidth * a.width,
                    a.x = d / 3,
                    a.y = e.y + e.height + 24,
                    this.layers.sex.x = 0,
                    this.layers.sex.y = (g - (a.y + a.height)) / 2
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Title = e,
        __reflect(e.prototype, "GAL.Title")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n(n, a, r, i, o, c, s, u) {
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            void 0 === c && (c = 30),
            void 0 === s && (s = !0),
            void 0 === u && (u = !0);
            var f = e.call(this) || this;
            return f.showSize = "middle",
                f.position = {
                    x: 0,
                    y: 0
                },
                f.nextAlpha = 1,
                f.direction = {
                    direction: "right",
                    duration: 600
                },
                f.modified = {
                    pos: !1,
                    face: !1
                },
                f.active = !1,
                f.animator = new t.Animator,
                f.transition = {
                    duration: 500,
                    type: "fade"
                },
                f.faceTransActor = new t.Transition,
                f.posTransActor = new t.Transition,
                f.sayWithShow = !1,
                f.reset = function() {
                    f.active = !1,
                        f.animation = null
                }
                ,
                f.draw = function() {
                    f.scene.layers.chars.setChildIndex(f, 10),
                    f.multiPos && f.modified.pos && (f.modified.pos = !1,
                        f.modified.face = !0,
                        f.active && f.animator.check() ? (f.prePos = f.posImg,
                            f.posImg = new egret.Bitmap,
                            f.posImg.texture = RES.getRes(f.resKey + "-" + f.posName + ".body"),
                            f.posTransActor.start(f.prePos, f.posImg, f, 1)) : f.posImg.texture = RES.getRes(f.resKey + "-" + f.posName + ".body")),
                    f.multiFace && f.modified.face && (f.modified.face = !1,
                        f.active && f.animator.check() ? (f.preFace = f.faceImg,
                            f.faceImg = new egret.Bitmap,
                            f.faceImg.texture = RES.getRes(f.resKey + "-" + f.posName + "." + f.faceName),
                            f.faceTransActor.start(f.preFace, f.faceImg, f, 3)) : f.faceImg.texture = RES.getRes(f.resKey + "-" + f.posName + "." + f.faceName)),
                    f.multiPos || f.multiFace || (f.posImg.texture = RES.getRes("" + f.resKey));
                    var e = t.CHAR_SIZE_LUT.scale[f.showSize];
                    f.anchorOffsetX = .5 * f.posImg.width;
                    var n = f.stage.stageWidth * f.position.x / t.MAX_GRID
                        , a = f.stage.stageHeight * f.position.y / t.MAX_GRID + t.CHAR_SIZE_LUT.yOffset[f.showSize];
                    return f.animation ? (f.animator.init(f.animation, f),
                        f.animator.start({
                            scaleX: e,
                            scaleY: e,
                            x: n,
                            y: a,
                            alpha: f.nextAlpha
                        }),
                        f.animation = null) : (f.scaleX = e,
                        f.scaleY = e,
                        f.x = n,
                        f.y = a,
                        f.alpha = f.nextAlpha),
                        f.active = !0,
                        {
                            check: f.checkAnimation,
                            exec: f.endAnimation
                        }
                }
                ,
                f.checkAnimation = function() {
                    return f.animator.check() && f.faceTransActor.check() && f.posTransActor.check()
                }
                ,
                f.endAnimation = function() {
                    f.animator.check() || f.animator.end(),
                    f.faceTransActor.check() || f.faceTransActor.end(),
                    f.posTransActor.check() || f.posTransActor.end(),
                        f.animation = null
                }
                ,
                f.name = a,
                f.resKey = n,
                f.charName = a,
                t.CHAR_ATTRS[f.resKey] = {
                    name: a,
                    nameColor: i,
                    wordsColor: o,
                    bgPath: "dialog." + r + "-s",
                    bgThinkPath: "dialog." + r + "-t",
                    cps: c
                },
                f.multiPos = s,
                f.multiFace = u,
                f.addEventListener(egret.Event.REMOVED_FROM_STAGE, f.reset, f),
                f
        }

        return __extends(n, e),
            n.prototype.addToScene = function(t) {
                this.scene = t,
                    this.posImg = new egret.Bitmap,
                    this.faceImg = new egret.Bitmap,
                    this.prePos = new egret.Bitmap,
                    this.preFace = new egret.Bitmap,
                    this.addChild(this.posImg),
                    this.addChild(this.faceImg),
                    this.faceTransActor.init(this.transition),
                    this.posTransActor.init(this.transition),
                    this.active = !1
            }
            ,
            n.prototype.rename = function(e) {
                return void 0 !== e ? t.CHAR_ATTRS[this.resKey].name = e : t.CHAR_ATTRS[this.resKey].name = this.charName,
                    this
            }
            ,
            n.prototype.say = function(t) {
                if (this.sayWithShow) {
                    var e = this.show()
                        , n = this.scene.dialog.say(this.resKey, t);
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.check() || e.exec(),
                            n.check() || n.exec()
                        }
                    }
                }
                return this.active && this.scene.layers.chars.setChildIndex(this, 10),
                    this.scene.dialog.say(this.resKey, t)
            }
            ,
            n.prototype.think = function(t) {
                if (this.sayWithShow) {
                    var e = this.show()
                        , n = this.scene.dialog.think(this.resKey, t);
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.check() || e.exec(),
                            n.check() || n.exec()
                        }
                    }
                }
                return this.active && this.scene.layers.chars.setChildIndex(this, 10),
                    this.scene.dialog.think(this.resKey, t)
            }
            ,
            n.prototype.withShow = function(t) {
                return void 0 === t && (t = !0),
                    this.sayWithShow = t,
                    this
            }
            ,
            n.prototype.show = function() {
                if (!this.active) {
                    this.scene.layers.chars.addChild(this);
                    var e = this.position.x
                        , n = this.position.y;
                    "left" === this.direction.direction ? this.position.x -= t.CHAR_SIZE_LUT.initFromOffset[this.showSize] : "right" === this.direction.direction ? this.position.x += t.CHAR_SIZE_LUT.initFromOffset[this.showSize] : "top" === this.direction.direction ? this.position.y -= t.CHAR_SIZE_LUT.initFromOffset[this.showSize] : "bottom" === this.direction.direction && (this.position.y += t.CHAR_SIZE_LUT.initFromOffset[this.showSize]),
                        this.opacity(0).draw(),
                        "left" === this.direction.direction || "right" === this.direction.direction ? this.position.x = e : this.position.y = n,
                        this.opacity(1).animate(this.direction.duration)
                }
                return this.draw()
            }
            ,
            n.prototype.hide = function() {
                var e = this
                    , n = this.position.x
                    , a = this.position.y;
                "left" === this.direction.direction ? n += t.CHAR_SIZE_LUT.initFromOffset[this.showSize] : "right" === this.direction.direction ? n -= t.CHAR_SIZE_LUT.initFromOffset[this.showSize] : "top" === this.direction.direction ? a += t.CHAR_SIZE_LUT.initFromOffset[this.showSize] : "bottom" === this.direction.direction && (a -= t.CHAR_SIZE_LUT.initFromOffset[this.showSize]);
                var r = this.stage.stageWidth * n / t.MAX_GRID
                    , i = this.stage.stageHeight * a / t.MAX_GRID + t.CHAR_SIZE_LUT.yOffset[this.showSize];
                return this.animate(this.direction.duration),
                    this.animator.init(this.animation, this, function() {
                        e.scene.layers.chars.removeChild(e),
                            e.reset()
                    }),
                    this.animator.start({
                        x: r,
                        y: i,
                        alpha: 0
                    }),
                    {
                        check: this.checkAnimation,
                        exec: this.endAnimation
                    }
            }
            ,
            n.prototype.posture = function(t) {
                return this.modified.pos = this.posName !== t,
                    this.posName = t,
                    this
            }
            ,
            n.prototype.face = function(t) {
                return this.modified.face = this.faceName !== t,
                    this.faceName = t,
                    this
            }
            ,
            n.prototype.size = function(t) {
                return void 0 === t && (t = "middle"),
                    this.showSize = t,
                    this
            }
            ,
            n.prototype.at = function(t, e) {
                return this.position.x = t,
                "number" == typeof e && (this.position.y = e),
                    this
            }
            ,
            n.prototype.opacity = function(t) {
                return this.nextAlpha = t,
                    this
            }
            ,
            n.prototype.from = function(t, e) {
                return void 0 === e && (e = 600),
                    this.direction.direction = t,
                e && (this.direction.duration = e),
                    this
            }
            ,
            n.prototype["with"] = function(t, e) {
                return void 0 === t && (t = 800),
                void 0 === e && (e = "fade"),
                    this.transition = {
                        duration: t,
                        type: e
                    },
                    this.faceTransActor.init(this.transition),
                    this.posTransActor.init(this.transition),
                    this
            }
            ,
            n.prototype.animate = function(t, e) {
                return void 0 === t && (t = 500),
                void 0 === e && (e = function(t) {
                        return t
                    }
                ),
                    this.animation = {
                        duration: t,
                        func: e
                    },
                    this
            }
            ,
            n.prototype.behind = function(t) {
                return this
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Character = e,
        __reflect(e.prototype, "GAL.Character")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var n = e.call(this) || this;
            n.layers = {
                restart: new egret.Bitmap,
                letter: new egret.Bitmap,
                share: new egret.Bitmap,
                movie: new egret.Bitmap
            },
                n.onShare = null,
                n.onLetter = null,
                n.onRestart = null,
                n.onMovie = null,
                n.shareInfo = "《七夕之恋 - Double;7》：你又会邂逅谁呢？",
                n.handleShare = function() {
                    n.onShare(n.shareInfo),
                        n.shareDom.click()
                }
                ,
                n.handleLetter = function() {
                    n.onLetter()
                }
                ,
                n.handleMovie = function() {
                    n.onMovie()
                }
                ,
                n.handleRestart = function() {
                    n.onRestart()
                }
                ,
                n.init = function() {
                    var e = n.originStage
                        , a = e.stageWidth
                        , r = e.stageHeight
                        , i = n.layers
                        , o = i.restart
                        , c = i.letter
                        , s = i.share
                        , u = i.movie
                        , f = 0 === t.config.user.sex ? "g" : "b";
                    c.texture = RES.getRes("elements.letter-" + f),
                        s.texture = RES.getRes("elements.share"),
                        u.texture = RES.getRes("elements.movie"),
                        o.texture = RES.getRes("elements.restart");
                    var h = 140;
                    c.height = h,
                        c.width = c.texture.textureWidth / c.texture.textureHeight * c.height,
                        c.x = 0,
                        c.y = r - h - 24,
                        s.height = h,
                        s.width = s.texture.textureWidth / s.texture.textureHeight * s.height,
                        s.x = c.width + 64,
                        s.y = c.y,
                        u.height = h,
                        u.width = u.texture.textureWidth / u.texture.textureHeight * u.height,
                        u.x = s.x + s.width + 64,
                        u.y = c.y,
                        n.height = h,
                        n.width = u.x + u.width,
                        n.x = (a - n.width) / 2,
                        n.y = 0,
                        o.height = 48,
                        o.width = o.texture.textureWidth / o.texture.textureHeight * o.height,
                        o.x = a - n.x - o.width - 24,
                        o.y = 24;
                    var l = n.y;
                    n.alpha = 0,
                        n.y += 32;
                    var d = document.getElementsByTagName("canvas")[0]
                        , g = parseInt(d.style.width, 10)
                        , y = parseInt(d.style.height, 10)
                        , m = g / a
                        , w = y / r;
                    egret.Tween.get(n).to({
                        alpha: 1,
                        y: l
                    }, 800, egret.Ease.quadInOut).call(function() {
                        n.friendDom.style.display = "block",
                            n.friendDom.href = t.config.domain.letter + "/" + t.config.friend.id,
                            n.movieDom.style.display = "block",
                            n.movieDom.href = t.config.domain.movie,
                            window.innerWidth < window.innerHeight ? (n.friendDom.style.left = (n.x + c.x) * m + "px",
                                n.friendDom.style.top = c.y * w + "px",
                                n.friendDom.style.width = c.width * m + "px",
                                n.friendDom.style.height = c.height * w + "px",
                                n.movieDom.style.left = (n.x + u.x) * m + "px",
                                n.movieDom.style.top = u.y * w + "px",
                                n.movieDom.style.width = u.width * m + "px",
                                n.movieDom.style.height = u.height * w + "px") : (n.friendDom.style.bottom = (n.x + c.x) * m + "px",
                                n.friendDom.style.left = c.y * w + "px",
                                n.friendDom.style.height = c.width * m + "px",
                                n.friendDom.style.width = c.height * w + "px",
                                n.movieDom.style.bottom = (n.x + u.x) * m + "px",
                                n.movieDom.style.left = u.y * w + "px",
                                n.movieDom.style.height = u.width * m + "px",
                                n.movieDom.style.width = u.height * w + "px")
                    })
                }
            ;
            var a = n.layers
                , r = a.restart
                , i = a.letter
                , o = a.share
                , c = a.movie;
            return r.name = "restart",
                i.name = "letter",
                o.name = "share",
                c.name = "movie",
                o.touchEnabled = !0,
                o.addEventListener(egret.TouchEvent.TOUCH_END, n.handleShare, n),
                i.touchEnabled = !0,
                i.addEventListener(egret.TouchEvent.TOUCH_END, n.handleLetter, n),
                r.touchEnabled = !0,
                r.addEventListener(egret.TouchEvent.TOUCH_END, n.handleRestart, n),
                c.touchEnabled = !0,
                c.addEventListener(egret.TouchEvent.TOUCH_END, n.handleMovie, n),
                n.addChild(i),
                n.addChild(o),
                n.addChild(c),
                n.addChild(r),
                window.addEventListener("load", function() {
                    n.shareDom = document.createElement("div"),
                        n.shareDom.id = "share",
                        n.shareDom.style.display = "none",
                        document.body.appendChild(n.shareDom),
                        n.friendDom = document.createElement("a"),
                        n.friendDom.href = "",
                        n.friendDom.target = "_blank",
                        n.friendDom.id = "letter",
                        n.friendDom.style.position = "fixed",
                        n.friendDom.style.display = "none",
                        n.friendDom.style.zIndex = "999",
                        n.friendDom.style.opacity = "0",
                        n.friendDom.addEventListener("click", function() {
                            t.report("letter", 0 === t.config.user.sex ? "boy" : "girl")
                        }),
                        document.body.appendChild(n.friendDom),
                        n.movieDom = document.createElement("a"),
                        n.movieDom.href = "",
                        n.movieDom.target = "_blank",
                        n.movieDom.id = "movie",
                        n.movieDom.style.position = "fixed",
                        n.movieDom.style.display = "none",
                        n.movieDom.style.zIndex = "999",
                        n.movieDom.style.opacity = "0",
                        n.movieDom.addEventListener("click", function() {
                            t.report("movie", 0 === t.config.user.sex ? "boy" : "girl")
                        }),
                        document.body.appendChild(n.movieDom),
                        $("document").ready(function() {
                            n.updateMessage()
                        })
                }),
                n
        }

        return __extends(n, e),
            n.prototype.addToStage = function(t) {
                this.originStage = t,
                    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)
            }
            ,
            n.prototype.updateMessage = function() {
                if (t.config.user && t.config.friend)
                    if ("999999999999999" === t.config.user.path.join(""))
                        ;
                    else {
                        var e = t.config.friend.name
                            , n = 0 === t.config.user.sex ? "少女" : "少年";
                        t.config.comment ? this.shareInfo = "我在“七夕之恋 - Double;7”的故事中遇见了" + n + e + "，留下了留言：\n  「" + t.config.comment + "」\n  一起来旅途终点的星空留言吧！" : this.shareInfo = "我在“七夕之恋 - Double;7”的故事中遇见了" + n + e + "，一起来旅途终点的星空留言吧！"
                    }
                else
                    ;$("#share").off("click").biliShareMobile({
                    share: {
                        title: "《七夕之恋 - Double;7》",
                        desc: this.shareInfo,
                        link: t.config.sharePage,
                        pics: t.config.shareImage
                    }
                }),
                    $(window).biliShareMobile("setShareContent", {
                        title: "《七夕之恋 - Double;7》",
                        desc: this.shareInfo,
                        link: t.config.sharePage,
                        pics: t.config.shareImage
                    })
            }
            ,
            n.prototype.show = function(t, e, n, a) {
                void 0 === t && (t = function() {}
                ),
                void 0 === e && (e = function() {}
                ),
                void 0 === n && (n = function() {}
                ),
                void 0 === a && (a = function() {}
                ),
                    this.onShare = t,
                    this.onLetter = e,
                    this.onRestart = n,
                    this.onMovie = a,
                    this.originStage.addChild(this)
            }
            ,
            n.prototype.close = function() {
                var t = this.layers;
                t.restart,
                    t.letter,
                    t.share;
                this.originStage.removeChild(this),
                    this.friendDom.style.display = "none",
                    this.movieDom.style.display = "none"
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Share = e,
        __reflect(e.prototype, "GAL.Share")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function() {
        function t() {
            this.scripts = [],
                this.preRes = null,
                this.preScripts = [],
                this.preOffset = []
        }

        return t.prototype.exec = function() {
            this.preRes = this.scripts[this.pointer]() || null
        }
            ,
            t.prototype.load = function(t, e, n) {
                e ? this.preScripts.push(e) : this.scripts.length && this.preScripts.push(this.scripts),
                    n ? this.preOffset.push(n) : this.scripts.length && this.preOffset.push(this.pointer),
                    this.scripts = t,
                    this.pointer = -1
            }
            ,
            t.prototype.next = function() {
                if (this.preRes && this.preRes.check && this.preRes.exec) {
                    if (!this.preRes.check())
                        return void this.preRes.exec();
                    this.preRes = null
                }
                this.pointer < this.length - 1 ? (this.pointer += 1,
                    this.exec()) : this.preScripts.length && (this.scripts = this.preScripts.pop(),
                    this.pointer = this.preOffset.pop(),
                    this.next())
            }
            ,
            t.prototype["goto"] = function(t) {
                t >= this.length ? this.pointer = this.length : this.pointer = t,
                    this.exec()
            }
            ,
            Object.defineProperty(t.prototype, "current", {
                get: function() {
                    return this.pointer
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "length", {
                get: function() {
                    return this.scripts.length
                },
                enumerable: !0,
                configurable: !0
            }),
            t
    }();
    t.Interpreter = e,
        __reflect(e.prototype, "GAL.Interpreter")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = location.href.replace("http", "https")
        , n = function() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || "0", 10)]
        }
        return [-1, -1, -1]
    }
        , a = function(t) {
        var e = t || navigator.userAgent
            , n = e.match(/Android\s([0-9\.]*)/);
        return n ? parseFloat(n[1]) : 4
    }
        , r = /Android/.test(navigator.userAgent)
        , i = /iPad|iPhone|iPod/.test(navigator.userAgent)
        , o = /TBS/.test(navigator.userAgent);
    t.config = {
        plat: "pc",
        galaxy: {
            maxScale: 3,
            minScale: 1,
            pinchDistance: 1e3
        },
        user: null,
        friend: null,
        selectedMaps: [],
        defaultCps: 30,
        domain: {
            info: "//www.bilibili.com/activity/qixi/info",
            sex: "//www.bilibili.com/activity/qixi/sex",
            match: "//www.bilibili.com/activity/qixi/loop",
            login: "//passport.bilibili.com/login?gourl=" + encodeURIComponent(e),
            submit: "//www.bilibili.com/activity/likes/add/text",
            comments: "//www.bilibili.com/activity/likes/list/10150",
            addComment: "//www.bilibili.com/activity/likes/add/text/10150",
            checkComment: "//www.bilibili.com/activity/filter",
            letter: "//space.bilibili.com",
            movie: "//www.bilibili.com/blackboard/topic/activity-yourname1708-m.html"
        },
        comment: "",
        shareImage: location.protocol + "//activity.hdslb.com/blackboard/double7/images/m682n67vr8.png",
        sharePage: location.protocol + "//www.bilibili.com/blackboard/double7.html",
        isIos: i,
        isIOS8: 8 === n()[0],
        isAndroid4: r && a(navigator.userAgent) < 5,
        isQQ: o
    };
    var c = function(e) {
        e && null !== e.alpha && (t.config.plat = "h5"),
            window.removeEventListener("deviceorientation", c, !1)
    };
    window.addEventListener("deviceorientation", c, !1)
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n(n) {
            var a = e.call(this) || this;
            return a.mode = "ADV",
                a.bgName = "bg_default",
                a.position = {
                    x: 0,
                    y: 0
                },
                a.mainPosition = {
                    x: 0,
                    y: 0
                },
                a.offset = {
                    x: 0,
                    y: 0
                },
                a.bgScale = 1,
                a.animator = new t.Animator,
                a.createDone = !1,
                a.direction = "left",
                a.transition = {
                    duration: 1200,
                    type: "normal"
                },
                a.moveWithChar = !1,
                a.callback = null,
                a.updateBg = function(t) {
                    var e = a.position
                        , n = e.x
                        , r = e.y;
                    a.bgName = "bg_" + t,
                        a.bg.texture = RES.getRes(a.bgName),
                        a.bg.width = a.layers.bg.width = a.bg.texture.textureWidth,
                        a.bg.height = a.layers.bg.height = a.bg.texture.textureHeight,
                        a.offset = {
                            x: (a.stage.stageWidth - a.bg.width) / 2,
                            y: (a.stage.stageHeight - a.bg.height) / 2
                        },
                        a.layers.bg.anchorOffsetX = -a.offset.x,
                        a.layers.bg.anchorOffsetY = -a.offset.y,
                        a.layers.bg.x = n,
                        a.layers.bg.y = r,
                        a.layers.bg.scaleX = a.bgScale,
                        a.layers.bg.scaleY = a.bgScale,
                        a.main.x = 0,
                        a.main.y = 0
                }
                ,
                a.handleTouch = function() {
                    a.interpreter.next()
                }
                ,
                a.interpreter = n,
                a.addEventListener(egret.Event.ADDED_TO_STAGE, a.onAddToStage, a),
                a
        }

        return __extends(n, e),
            n.prototype.onAddToStage = function() {
                this.width = this.stage.stageWidth,
                    this.height = this.stage.stageHeight,
                    this.layers = {
                        bg: new egret.DisplayObjectContainer,
                        text: new egret.DisplayObjectContainer,
                        dialog: new egret.DisplayObjectContainer,
                        chars: new egret.DisplayObjectContainer,
                        branch: new egret.DisplayObjectContainer
                    },
                    this.transitionMask = new egret.Bitmap,
                    this.transitionMask.visible = !1,
                    this.transitionMask.texture = RES.getRes("transition"),
                    this.layer = new egret.DisplayObjectContainer,
                    this.main = new egret.DisplayObjectContainer,
                    this.bg = new egret.Bitmap,
                    this.layer.name = "layer",
                    this.transitionMask.name = "transition",
                    this.main.name = "main",
                    this.layers.bg.name = "bg",
                    this.layers.chars.name = "chars",
                    this.layers.text.name = "text",
                    this.layers.dialog.name = "dialog",
                    this.layers.branch.name = "branch",
                    this.layers.bg.addChild(this.bg),
                    this.main.addChild(this.layers.bg),
                    this.main.addChild(this.layers.chars),
                    this.main.addChild(this.layers.text),
                    this.layer.addChild(this.main),
                    this.layer.addChild(this.layers.branch),
                    this.layer.addChild(this.layers.dialog),
                    this.addChild(this.transitionMask),
                    this.addChild(this.layer)
            }
            ,
            n.prototype.show = function() {
                var t = this
                    , e = this.callback || function() {}
                ;
                this.dialog.hide();
                var n = this.position.x
                    , a = this.position.y
                    , r = this.layers.bg
                    , i = {
                    x: n,
                    y: a,
                    scaleX: this.bgScale,
                    scaleY: this.bgScale
                };
                return this.moveWithChar && (n = this.mainPosition.x,
                    a = this.mainPosition.y,
                    r = this.main,
                    i = {
                        x: n,
                        y: a
                    }),
                    this.animation ? (this.animator.init(this.animation, r, function() {
                        t.animation = null,
                            e()
                    }),
                        this.animator.start(i),
                        {
                            check: this.animator.check,
                            exec: function() {
                                t.animator.end(),
                                    t.animation = null,
                                    e()
                            }
                        }) : (this.moveWithChar ? (this.main.x = n,
                        this.main.y = a) : (this.layers.bg.x = n,
                        this.layers.bg.y = a),
                        void e())
            }
            ,
            n.prototype.then = function(t) {
                return void 0 === t && (t = null),
                    this.callback = t,
                    this
            }
            ,
            n.prototype.toMode = function(e) {
                return this.layers.dialog.contains(this.dialog) && this.layers.dialog.removeChild(this.dialog),
                    this.mode = e,
                    "ADV" === this.mode ? this.dialog = new t.ADVDialog : "NVL" === this.mode && (this.dialog = new t.NVLDialog),
                    this.layers.dialog.addChild(this.dialog),
                    this
            }
            ,
            n.prototype.create = function(t) {
                var e = this
                    , n = this.callback || function() {}
                ;
                return this.createDone = !1,
                    "normal" === this.transition.type ? ("left" === this.direction ? this.transitionMask.x = this.stage.width : this.transitionMask.x = -this.transitionMask.width,
                        this.transitionMask.texture = RES.getRes("transition"),
                        this.transitionMask.visible = !0,
                        this.setChildIndex(this.transitionMask, 5),
                        this.animate(this.transition.duration, egret.Ease.quadInOut),
                        this.animator.init(this.animation, this.transitionMask, function() {
                            e.clear(),
                                e.updateBg(t),
                                e.animator.init(e.animation, e.transitionMask, function() {
                                    e.setChildIndex(e.transitionMask, 0),
                                        e.createDone = !0,
                                        e.animation = null,
                                        e.toMode(e.mode),
                                        n()
                                });
                            var a = 0;
                            a = "left" === e.direction ? -e.transitionMask.width : e.stage.width,
                                e.animator.start({
                                    x: a
                                })
                        }),
                        this.animator.start({
                            x: -100
                        })) : "fade" === this.transition.type ? (this.transitionMask.texture = RES.getRes("transition-w"),
                        this.transitionMask.visible = !0,
                        this.transitionMask.x = 0,
                        this.transitionMask.y = 0,
                        this.animate(this.transition.duration, egret.Ease.quadInOut),
                        this.animator.init(this.animation, this.layer, function() {
                            e.clear(),
                                e.updateBg(t),
                                e.animator.init(e.animation, e.layer, function() {
                                    e.createDone = !0,
                                        e.animation = null,
                                        e.toMode(e.mode),
                                        n()
                                }),
                                e.animator.start({
                                    alpha: 1
                                })
                        }),
                        this.animator.start({
                            alpha: 0
                        })) : "dissolve" === this.transition.type ? (this.transitionMask.visible = !1,
                        this.animate(this.transition.duration, egret.Ease.quadInOut),
                        this.animator.init(this.animation, this.layer, function() {
                            e.clear(),
                                e.updateBg(t),
                                e.animator.init(e.animation, e.layer, function() {
                                    e.createDone = !0,
                                        e.animation = null,
                                        e.toMode(e.mode),
                                        n()
                                }),
                                e.animator.start({
                                    alpha: 1
                                })
                        }),
                        this.animator.start({
                            alpha: 0
                        })) : "none" === this.transition.type && (this.clear(),
                        this.updateBg(t),
                        this.createDone = !0,
                        this.animation = null,
                        this.toMode(this.mode),
                        n()),
                    {
                        check: function() {
                            return e.createDone
                        },
                        exec: function() {}
                    }
            }
            ,
            n.prototype.scale = function(t) {
                return this.bgScale = t,
                    this
            }
            ,
            n.prototype.at = function(t, e, n) {
                return void 0 !== n ? this.moveWithChar = n : this.moveWithChar = !1,
                    this.moveWithChar ? (this.mainPosition.x = -t,
                    "number" == typeof e && (this.mainPosition.y = -e)) : (this.position.x = -t,
                    "number" == typeof e && (this.position.y = -e)),
                    this
            }
            ,
            n.prototype.animate = function(t, e) {
                return void 0 === t && (t = 500),
                void 0 === e && (e = function(t) {
                        return t
                    }
                ),
                    this.animation = {
                        duration: t,
                        func: e
                    },
                    this
            }
            ,
            n.prototype.from = function(t) {
                return this.direction = t,
                    this
            }
            ,
            n.prototype["with"] = function(t, e) {
                return void 0 === t && (t = 1200),
                void 0 === e && (e = "normal"),
                    this.transition = {
                        duration: t,
                        type: e
                    },
                    this
            }
            ,
            n.prototype.hideDialog = function() {
                this.dialog && this.dialog.hide()
            }
            ,
            n.prototype.clear = function() {
                this.layers.chars.removeChildren(),
                    this.hideDialog();
                for (var t = this.layers.branch.numChildren, e = 0; t > e; e += 1)
                    this.layers.text.getChildAt(e).clear();
                t = this.layers.branch.numChildren;
                for (var e = 0; t > e; e += 1)
                    this.layers.branch.getChildAt(e).close();
                return this
            }
            ,
            n.prototype.bindTouchEvent = function() {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouch, this)
            }
            ,
            n.prototype.unbindTouchEvent = function() {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouch, this)
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Scene = e,
        __reflect(e.prototype, "GAL.Scene")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var n = null !== e && e.apply(this, arguments) || this;
            return n.direction = {
                direction: "bottom",
                duration: 600,
                offset: 24,
                scaleOffset: 0
            },
                n.animator = new t.Animator,
                n.callback = null,
                n
        }

        return __extends(n, e),
            n.prototype.addToScene = function(t) {
                this.scene = t,
                    this.texts = [],
                    this.targets = [],
                    this.scene.layers.text.addChild(this)
            }
            ,
            n.prototype.from = function(t, e, n, a) {
                return void 0 === e && (e = 600),
                void 0 === n && (n = 24),
                void 0 === a && (a = 0),
                    this.direction.direction = t,
                    this.direction.duration = e,
                    this.direction.offset = n,
                    this.direction.scaleOffset = a,
                    this
            }
            ,
            n.prototype.update = function(t) {
                return this.texts = t,
                    this
            }
            ,
            n.prototype.then = function(t) {
                return void 0 === t && (t = null),
                    this.callback = t,
                    this
            }
            ,
            n.prototype.draw = function() {
                var t = this
                    , e = this.scene.stage
                    , n = e.stageWidth
                    , a = e.stageHeight;
                this.texts.forEach(function(e) {
                    var r = e.text
                        , i = __rest(e, ["text"])
                        , o = new egret.DisplayObjectContainer
                        , c = new egret.TextField;
                    if (c.text = r,
                            c.size = i.size || 16,
                            c.width = i.width,
                            c.textAlign = i.textAlign || "center",
                            c.lineSpacing = i.lineSpacing || 8,
                            c.textColor = i.color || 16777215,
                        "number" == typeof i.strokeColor && (c.stroke = 1,
                            c.strokeColor = i.strokeColor),
                        "number" == typeof i.glowColor) {
                        var s = i.glowColor
                            , u = .8
                            , f = 2
                            , h = 2
                            , l = 2
                            , d = 3
                            , g = !1
                            , y = !1
                            , m = new egret.GlowFilter(s,u,f,h,l,d,g,y);
                        c.filters = [m]
                    }
                    c.anchorOffsetX = c.width / 2,
                        c.anchorOffsetY = c.height / 2,
                        "number" == typeof i.x ? (o.x = i.x,
                            o.x += c.anchorOffsetX) : i.x === egret.HorizontalAlign.CENTER ? o.x = (n - c.width) / 2 : void 0 === i.x && (o.x = n / 2),
                        i.y < 0 ? o.y = a - c.height + i.y : o.y = i.y,
                        o.y += c.anchorOffsetY,
                        c.rotation = i.rotation || 0,
                        c.x = 0,
                        c.y = 0,
                        c.alpha = 0,
                        t.targets.push(c),
                        o.addChild(c),
                        t.addChild(o)
                })
            }
            ,
            n.prototype.show = function() {
                var t = this.callback || function() {}
                    , e = this.direction
                    , n = e.duration
                    , a = e.offset
                    , r = e.direction
                    , i = e.scaleOffset;
                return this.removeChildren(),
                    this.targets = [],
                    this.draw(),
                    this.targets.forEach(function(t) {
                        "left" === r ? t.x = -a : "right" === r ? t.x = a : "top" === r ? t.y = -a : "bottom" === r && (t.y = a),
                        i && (t.scaleX = 1 - i,
                            t.scaleY = t.scaleX)
                    }),
                    this.animator.init({
                        duration: n,
                        func: function(t) {
                            return t
                        }
                    }, this.targets, function() {
                        t()
                    }),
                    this.animator.start({
                        x: 0,
                        y: 0,
                        alpha: 1,
                        scaleX: 1,
                        scaleY: 1
                    }),
                    {
                        check: this.animator.check,
                        exec: this.animator.end
                    }
            }
            ,
            n.prototype.hide = function() {
                var t = this
                    , e = this.callback || function() {}
                    , n = this.direction
                    , a = n.duration
                    , r = n.offset
                    , i = n.direction
                    , o = n.scaleOffset
                    , c = 0
                    , s = 0
                    , u = 1;
                return "left" === i ? c = r : "right" === i ? c = -r : "top" === i ? s = r : "bottom" === i && (s = -r),
                o && (u = 1 + o),
                    this.animator.init({
                        duration: a,
                        func: function(t) {
                            return t
                        }
                    }, this.targets, function() {
                        t.removeChildren(),
                            t.targets = [],
                            e()
                    }),
                    this.animator.start({
                        x: c,
                        y: s,
                        alpha: 0,
                        scaleX: u,
                        scaleY: u
                    }),
                    {
                        check: this.animator.check,
                        exec: this.animator.end
                    }
            }
            ,
            n.prototype.clear = function() {
                this.removeChildren()
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Text = e,
        __reflect(e.prototype, "GAL.Text")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var n = e.call(this) || this;
            n.layers = {
                bg: new egret.Bitmap,
                title: new egret.TextField,
                content: new egret.TextField,
                confirm: new egret.Bitmap,
                cancel: new egret.Bitmap
            },
                n.onConfirm = null,
                n.onCancel = null,
                n.isEnd = !1,
                n.loading = !1,
                n.handleConfirm = function() {
                    if (!n.loading) {
                        var e = n.layers.content;
                        if ("最多十五字哦~" === e.text)
                            return void alert("星空无法理解空白的信息呢~");
                        if (e.text.length > 15)
                            return void alert("星空没有足够的空间去承载超过十五字的内容哦~");
                        n.loading = !0,
                            t.get(t.config.domain.checkComment, {
                                msg: e.text
                            }).then(function(t) {
                                var a = t.data
                                    , r = a.code
                                    , i = a.data;
                                return 0 !== r ? (alert("留言出现了问题，请重试哦~"),
                                    void (n.loading = !1)) : i.level > 10 ? (alert("留言中有不和谐的用语哦，想必对方也不喜欢吧。"),
                                    void (n.loading = !1)) : (n.onConfirm(e.text),
                                    void (n.loading = !1))
                            })["catch"](function(t) {
                                alert("留言出现了问题，请重试哦~"),
                                    n.loading = !1
                            })
                    }
                }
                ,
                n.handleCancel = function() {
                    n.loading || n.close(function() {
                        return n.onCancel()
                    })
                }
                ,
                n.init = function() {
                    var e = n.originStage
                        , a = e.stageWidth
                        , r = e.stageHeight
                        , i = n.layers
                        , o = i.bg
                        , c = i.title
                        , s = i.content
                        , u = i.confirm
                        , f = i.cancel
                        , h = 0 === t.config.user.sex ? "她" : "他";
                    o.texture = RES.getRes("elements.comment"),
                        u.texture = RES.getRes("elements.confirm"),
                        f.texture = RES.getRes("elements.cancel"),
                        c.text = "在星空上对" + h + "说点什么吧！",
                    singleton.galaxy.count && (c.text += "\n已有" + singleton.galaxy.count + "颗星被点亮"),
                        o.width = a / 5 * 4,
                        o.height = o.texture.textureHeight / o.texture.textureWidth * o.width,
                        n.width = o.width,
                        n.height = o.height,
                        n.x = a / 10,
                        n.y = (r - n.height) / 2,
                        c.width = n.width,
                        c.textAlign = egret.HorizontalAlign.CENTER,
                        c.y = 112,
                        c.textColor = 0,
                        c.size = 25,
                        c.lineSpacing = 8,
                        s.type = egret.TextFieldType.INPUT,
                        s.width = 334,
                        s.height = 90,
                        s.x = (n.width - s.width) / 2,
                        s.y = 192,
                        s.size = 26,
                        s.textColor = 6710886,
                        s.text = "最多十五字哦~",
                        s.maxChars = 15,
                        s.multiline = !0,
                        u.width = 160,
                        u.height = u.texture.textureHeight / u.texture.textureWidth * u.width,
                        u.x = 36,
                        u.y = 320,
                        f.width = u.width,
                        f.height = u.height,
                        f.x = n.width - f.width - 36,
                        f.y = u.y;
                    var l = n.y;
                    n.alpha = 0,
                        n.y += 32,
                        egret.Tween.get(n).to({
                            alpha: 1,
                            y: l
                        }, 800, egret.Ease.quadInOut)
                }
            ;
            var a = n.layers
                , r = a.bg
                , i = a.title
                , o = a.content
                , c = a.confirm
                , s = a.cancel;
            return r.name = "bg",
                i.name = "title",
                o.name = "content",
                c.name = "confirm",
                s.name = "cancel",
                o.touchEnabled = !0,
                o.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
                    "最多十五字哦~" === o.text && (o.text = ""),
                        o.setFocus()
                }, n),
                c.touchEnabled = !0,
                c.addEventListener(egret.TouchEvent.TOUCH_BEGIN, n.handleConfirm, n),
                s.touchEnabled = !0,
                s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, n.handleCancel, n),
                n.addChild(r),
                n.addChild(i),
                n.addChild(o),
                n.addChild(c),
                n.addChild(s),
                n
        }

        return __extends(n, e),
            n.prototype.addToStage = function(t) {
                this.originStage = t,
                    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)
            }
            ,
            n.prototype.show = function(t, e) {
                var n = this;
                return void 0 === t && (t = function() {}
                ),
                void 0 === e && (e = function() {}
                ),
                    this.isEnd = !1,
                    this.onConfirm = t,
                    this.onCancel = e,
                    this.originStage.addChild(this),
                    {
                        check: function() {
                            return n.isEnd
                        },
                        exec: function() {}
                    }
            }
            ,
            n.prototype.close = function(t) {
                var e = this;
                void 0 === t && (t = function() {}
                );
                var n = this.layers
                    , a = n.confirm
                    , r = n.cancel;
                this.loading = !1,
                    egret.Tween.get(this).to({
                        alpha: 0,
                        y: this.y - 32
                    }, 800, egret.Ease.quadInOut).call(function() {
                        a.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, e.handleConfirm, e),
                            r.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, e.handleCancel, e),
                            e.layers.content.text = "最多十五字哦~",
                        e.originStage.contains(e) && (e.originStage.removeChild(e),
                            e.isEnd = !0,
                            t())
                    })
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Comment = e,
        __reflect(e.prototype, "GAL.Comment")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = 12
        , n = 16777215
        , a = 18
        , r = 16777215
        , i = 8947848
        , o = 7
        , c = 7
        , s = 570
        , u = 170
        , f = o >> 1
        , h = o >> 1
        , l = function() {
        function l() {
            var e = this;
            this.position = null,
                this.touchDistance = 0,
                this.touchEnable = !1,
                this.orientationManager = new egret.DeviceOrientation,
                this.orientation = {
                    alpha: 0,
                    gamma: 0,
                    beta: 0
                },
                this.starsList = [],
                this.starsContainerTable = {},
                this.startsEnable = !1,
                this.layers = {
                    "char": new egret.Bitmap,
                    meteor: new egret.Bitmap,
                    moon: new egret.Bitmap,
                    bridge: new egret.Bitmap,
                    comments: new egret.DisplayObjectContainer
                },
                this.next = function() {}
                ,
                this.ws = new t.WS,
                this.count = 0,
                this.updateStar = function(n) {
                    var a = n.uname
                        , r = n.msg;
                    if (a !== t.config.user.name) {
                        var i = e.layer
                            , f = i.x
                            , h = i.y
                            , l = i.anchorOffsetX
                            , d = i.anchorOffsetY
                            , g = (-f + l) / s + 1
                            , y = (-h + d) / u + 2
                            , m = 1
                            , w = 5;
                        g = ~~(g + (Math.random() - .5) * m),
                            y = ~~(y + (Math.random() - .5) * w),
                            g >= o ? g = o - 1 : 0 > g && (g = 0),
                            y >= c ? y = c - 1 : 0 > y && (y = 0);
                        var p = e.starsContainerTable[g + "-" + y];
                        return p ? void egret.Tween.get(p).to({
                            scaleX: 0,
                            alpha: 0
                        }, 200, egret.Ease.quadInOut).call(function() {
                            e.layers.comments.removeChild(p),
                                e.drawStar({
                                    h: g,
                                    v: y,
                                    x: g * s,
                                    y: y * u,
                                    user: a,
                                    content: r
                                }, 0, egret.Ease.quadInOut)
                        }) : void e.drawStar({
                            h: g,
                            v: y,
                            x: g * s,
                            y: y * u,
                            user: a,
                            content: r
                        }, 0, egret.Ease.quadInOut)
                    }
                }
                ,
                this.handlePreWatch = function(t) {
                    var n = (t.alpha,
                        t.beta)
                        , a = t.gamma;
                    e.orientation = {
                        alpha: 180,
                        beta: n,
                        gamma: a
                    }
                }
                ,
                this.resetPC = function(t) {
                    e.position.x = t.clientX || t.pageX,
                        e.position.y = t.clientY || t.pageY
                }
                ,
                this.updatePCXY = function(t) {
                    var n = t.clientX || t.pageX
                        , a = t.clientY || t.pageY;
                    if (!e.position)
                        return void (e.position = {
                            x: n,
                            y: a
                        });
                    var r = e.layer.x + (n - e.position.x) / 5
                        , i = e.layer.y + (a - e.position.y) / 5;
                    e.position.x = n,
                        e.position.y = a;
                    var o = e.bound
                        , c = o.l
                        , s = o.r
                        , u = o.t
                        , f = o.b;
                    r >= c * e.layer.scaleX + e.layer.anchorOffsetX && r <= s + e.layer.anchorOffsetX && (e.layer.x = r),
                    i >= u * e.layer.scaleX + e.layer.anchorOffsetY && i <= f + e.layer.anchorOffsetY && (e.layer.y = i)
                }
                ,
                this.updatePCZ = function(n) {
                    n.preventDefault(),
                        n.stopPropagation();
                    var a = 0;
                    n.wheelDelta ? a = n.wheelDelta / 3e3 : n.detail && (a = -n.detail / 600);
                    var r = e.layer.scaleX + a;
                    r >= t.config.galaxy.minScale && r <= t.config.galaxy.maxScale && (e.layer.scaleX = r,
                        e.layer.scaleY = r)
                }
                ,
                this.updateH5XY = function(t) {
                    var n = t.alpha
                        , a = t.beta
                        , r = (t.gamma,
                        e.angleToFactor(n, "alpha"))
                        , i = e.angleToFactor(a, "beta")
                        , o = e.bound
                        , c = o.l
                        , s = o.t;
                    e.layer.x = (r * c + e.layer.anchorOffsetX) * e.layer.scaleX,
                        e.layer.y = (i * s + e.layer.anchorOffsetY) * e.layer.scaleX
                }
                ,
                this.updateH5Z = function(n, a) {
                    void 0 === a && (a = !1);
                    var r = n.distance;
                    if (!e.touchEnable)
                        return e.touchDistance = r,
                            void (e.touchEnable = !0);
                    clearTimeout(e.timeoutId);
                    var i = (r - e.touchDistance) / t.config.galaxy.pinchDistance
                        , o = e.layer.scaleX + i;
                    e.touchDistance = r,
                    o >= t.config.galaxy.minScale && o <= t.config.galaxy.maxScale && (e.layer.scaleX = o,
                        e.layer.scaleY = o),
                        e.timeoutId = setTimeout(function() {
                            e.touchEnable = !1
                        }, 200)
                }
        }

        return l.prototype.addToScene = function(t) {
            this.scene = t,
                this.layer = t.layers.bg,
                this.layers.meteor.name = "meteor",
                this.layers.moon.name = "moon",
                this.layers["char"].name = "char",
                this.layers.bridge.name = "bridge",
                this.layers.comments.name = "comments"
        }
            ,
            l.prototype.init = function() {
                this.layer.addChild(this.layers.bridge),
                    this.layer.addChild(this.layers.meteor),
                    this.layer.addChild(this.layers.moon),
                    this.layer.addChild(this.layers["char"]),
                    this.layer.addChild(this.layers.comments);
                var t = this.scene.bg.texture.textureWidth
                    , e = this.scene.bg.texture.textureHeight
                    , n = this.scene.stage.stageWidth
                    , a = this.scene.stage.stageHeight;
                this.bound = {
                    l: n - t,
                    t: a - e,
                    r: 0,
                    b: 0
                }
            }
            ,
            l.prototype.show = function(t) {
                void 0 === t && (t = function() {}
                ),
                    this.init();
                var e = this.scene.bg.texture.textureWidth
                    , n = this.scene.bg.texture.textureHeight;
                this.scene.stage.stageWidth,
                    this.scene.stage.stageHeight;
                this.next = t;
                var a = this.layers
                    , r = a["char"]
                    , i = a.meteor
                    , o = a.moon
                    , c = a.bridge;
                c.texture = RES.getRes("cg.bridge"),
                    r.texture = RES.getRes("cg.2233"),
                    i.texture = RES.getRes("cg.meteor"),
                    o.texture = RES.getRes("cg.moon");
                var s = 2160;
                return c.width = 4 * s / 5 + 200,
                    c.height = c.texture.textureHeight / c.texture.textureWidth * c.width,
                    c.x = (e - c.width) / 2 + 150,
                    c.y = (n - c.height) / 2 + 50,
                    r.width = s / 4,
                    r.height = r.texture.textureHeight / r.texture.textureWidth * r.width,
                    r.x = e / 2,
                    r.y = n / 2,
                    i.width = s / 2,
                    i.height = i.texture.textureHeight / i.texture.textureWidth * i.width,
                    i.x = e / 2,
                    i.y = 300,
                    o.width = s / 4 + 100,
                    o.height = o.texture.textureHeight / o.texture.textureWidth * o.width,
                    o.x = e / 2,
                    o.y = n / 2 - 200,
                    this.animate0(),
                    this
            }
            ,
            l.prototype.animate0 = function() {
                var t = this
                    , e = this.layers
                    , n = e["char"]
                    , a = e.meteor
                    , r = e.moon
                    , i = e.bridge
                    , o = this.scene.bg.texture.textureWidth
                    , c = this.scene.bg.texture.textureHeight;
                n.alpha = 1,
                    r.alpha = 0,
                    a.alpha = 0,
                    i.alpha = 0;
                var s = 2500
                    , u = egret.Tween.get(this.layer)
                    , f = egret.Tween.get(n)
                    , h = egret.Tween.get(a)
                    , l = egret.Tween.get(i)
                    , d = egret.Tween.get(r);
                this.scene.unbindTouchEvent(),
                    u.to({
                        x: 0
                    }, 2e3, egret.Ease.quadInOut).to({
                        scaleX: 3,
                        scaleY: 3,
                        x: -2e3,
                        y: -800
                    }, 3e3, egret.Ease.quadInOut).to({
                        scaleX: 1.5,
                        scaleY: 1.5,
                        x: -750,
                        y: -200
                    }, 4e3, egret.Ease.quadInOut).to({
                        scaleX: 1,
                        scaleY: 1,
                        x: -350,
                        y: 0
                    }, 3e3, egret.Ease.quadInOut).call(function() {
                        t.next()
                    }).wait(s - 1e3).call(function() {
                        t.next(),
                            t.scene.bindTouchEvent()
                    }),
                    l.to({
                        alpha: 1
                    }, 2e3, egret.Ease.quadInOut).wait(1e3).to({
                        x: i.x + 100,
                        y: i.y - 150
                    }, 6e3, function(t) {
                        return t
                    }),
                    d.to({
                        alpha: 1
                    }, 2e3, egret.Ease.quadInOut).wait(1e3).to({
                        x: r.x + 50,
                        y: r.y - 50
                    }, 6e3, function(t) {
                        return t
                    }),
                    f.to({
                        x: 1 * o / 2 + 150,
                        y: c / 2 - 200
                    }, 8e3, function(t) {
                        return t
                    }),
                    h.to({
                        alpha: 1
                    }, 2e3, egret.Ease.quadInOut),
                    egret.Tween.get({}).wait(1e3).call(function() {
                        return t.next()
                    }).wait(s).call(function() {
                        return t.next()
                    }).wait(s).call(function() {
                        return t.next()
                    }).wait(s).call(function() {
                        return t.next()
                    }).wait(s).call(function() {
                        return t.next()
                    })
            }
            ,
            l.prototype.stars = function(e) {
                var n = this;
                void 0 === e && (e = function() {}
                ),
                    this.startsEnable = !1;
                var a = this.layers
                    , r = a["char"]
                    , i = (a.meteor,
                    a.moon)
                    , s = a.bridge
                    , u = egret.Tween.get(this.layer)
                    , f = egret.Tween.get(r)
                    , h = egret.Tween.get(s)
                    , l = egret.Tween.get(i)
                    , d = [];
                return f.to({
                    y: r.y + 200
                }, 1e3, egret.Ease.quadInOut),
                    h.to({
                        y: s.y + 250
                    }, 1e3, egret.Ease.quadInOut),
                    l.to({
                        y: i.y + 200
                    }, 1e3, egret.Ease.quadInOut),
                    u.to({
                        y: 500
                    }, 1500, egret.Ease.quadInOut).call(function() {
                        t.get(t.config.domain.comments, {
                            page: 1,
                            pagesize: o * c,
                            state: 1,
                            order: "ctime"
                        }).then(function(t) {
                            var a = t.data
                                , r = a.code
                                , i = a.data;
                            if (0 !== r)
                                return n.mockStars(d),
                                    void n.drawStars(e);
                            if (n.count = i.count,
                                    d = i.list.map(function(t) {
                                        return {
                                            user: t.owner.name,
                                            content: t.message
                                        }
                                    }),
                                n.starsList.length <= c * o)
                                n.mockStars(d);
                            else {
                                var s = void 0;
                                if (s = window.crypto ? window.crypto.getRandomValues(new Uint8Array([1]))[0] : 255 * Math.random(),
                                    s >= 240)
                                    return n.starsList = n.starsList.slice(0, c * o - 30),
                                        n.mockStars(d),
                                        void n.drawStars(e);
                                n.parseStars(d)
                            }
                            n.drawStars(e)
                        })["catch"](function(t) {
                            n.mockStars(d),
                                n.drawStars(e)
                        })
                    }),
                    {
                        check: function() {
                            return n.startsEnable
                        },
                        exec: function() {}
                    }
            }
            ,
            l.prototype.mockStars = function(t) {
                var e = t.length
                    , n = c * o - e;
                this.starsList = this.parseStars(t.concat([{
                    user: "H光大小姐",
                    content: "本大小姐世界第一可爱！"
                }, {
                    user: "はやみ",
                    content: "风车的转动，意外有些命运的意味呢~"
                }, {
                    user: "由岐",
                    content: "夏日大三角，伴随着偏在转生的轮回。"
                }, {
                    user: "樱乃",
                    content: "我只要成为哥哥的空气就好了吧~"
                }, {
                    user: "夜刀",
                    content: "不会放弃，只因森罗万象之中你最美丽！"
                }, {
                    user: "樱",
                    content: "1095的忧郁之后，初雪，恭喜毕业！"
                }, {
                    user: "水银",
                    content: "直到我认同的结局到来——"
                }, {
                    user: "优子",
                    content: "天使也需要休息呢~"
                }, {
                    user: "亮",
                    content: "晚安，Sion。"
                }, {
                    user: "桔世",
                    content: "夫君，这朝色，是不是有些美呢？"
                }, {
                    user: "月海",
                    content: "我懂的啊，阿基米德原理什么，所以！"
                }, {
                    user: "凶真",
                    content: "欺骗世界，欺骗自己，只为——"
                }, {
                    user: "拓已",
                    content: "我就是，我自己！"
                }, {
                    user: "拓留",
                    content: "我，就是情报弱者啊！"
                }, {
                    user: "悠太",
                    content: "求求你们，请让我，成为英雄吧！"
                }, {
                    user: "太一",
                    content: "还有人活着吗——我为您祈祷。"
                }, {
                    user: "历",
                    content: "连自己的青春都拯救不了，这种事我绝不能允许！"
                }, {
                    user: "萤",
                    content: "雨，何时能停。"
                }, {
                    user: "凯伊姆",
                    content: "人生不如意，十有八九。"
                }, {
                    user: "朋也",
                    content: "渚，这一次我不会再放开了！"
                }, {
                    user: "往人",
                    content: "旅者的归宿，就这样也不错吧。"
                }, {
                    user: "尼尔",
                    content: "如果守护不了，不就什么意义都没有了吗？"
                }, {
                    user: "卓司",
                    content: "我啊，即为世界——"
                }, {
                    user: "篝",
                    content: "演算的终点，是爱啊。"
                }, {
                    user: "我",
                    content: "四叠半房间之外的世界，更令人雀跃不已。"
                }, {
                    user: "咩咩",
                    content: "放弃...成为人类吧。"
                }, {
                    user: "当麻",
                    content: "傲慢的神明，让我来粉碎你们的幻想！"
                }, {
                    user: "干也",
                    content: "我没有什么愿望，只想平静地观察这个世界。"
                }].slice(0, n)))
            }
            ,
            l.prototype.parseStars = function(t) {
                for (var e = t.length, n = new Array(e), a = 0, r = 0; c > r; r += 1) {
                    var i = r + h;
                    i > c - 1 && (i -= c);
                    for (var l = i * u, d = 0; o > d; d += 1) {
                        var g = d + f;
                        g > o - 1 && (g -= o);
                        var y = g * s;
                        if (g !== f || i !== h) {
                            if (a >= e)
                                return n;
                            n[a] = {
                                h: g,
                                v: i,
                                x: y,
                                y: l,
                                user: t[a].user,
                                content: t[a].content
                            },
                                a += 1
                        }
                    }
                }
                return n
            }
            ,
            l.prototype.drawStars = function(t) {
                var e = this;
                void 0 === t && (t = function() {}
                ),
                    this.starsContainerTable = {},
                    0 === this.starsList.length ? (this.startsEnable = !0,
                        t()) : this.starsList.forEach(function(n, a) {
                        e.drawStar(n, a),
                        a >= e.starsList.length - 2 && (e.startsEnable || t(),
                            e.startsEnable = !0)
                    }),
                    this.ws.open(this.updateStar)
            }
            ,
            l.prototype.drawStar = function(t, o, c) {
                void 0 === c && (c = egret.Ease.backInOut);
                var f = t.h
                    , h = t.v
                    , l = t.x
                    , d = t.y
                    , g = t.user
                    , y = t.content
                    , m = new egret.DisplayObjectContainer
                    , w = new egret.Shape
                    , p = new egret.TextField
                    , x = new egret.Shape
                    , b = new egret.Bitmap;
                b.texture = RES.getRes("cg.star"),
                    b.width = e,
                    b.height = e,
                    w.graphics.lineStyle(1, n),
                    w.graphics.beginFill(n, 1),
                    w.graphics.drawCircle(e / 2, e / 2, e / 2),
                    w.graphics.endFill(),
                    w.alpha = .4;
                var v = 1
                    , A = g + "：" + y;
                A.length > 31 && (A += "…"),
                A.length > 14 && (p.width = 14 * a,
                    v = 2),
                    p.size = a,
                    p.textColor = r,
                    p.textAlign = egret.HorizontalAlign.LEFT,
                    p.lineSpacing = 4,
                    p.text = g + "：" + y,
                    p.x = e + 12 + 20,
                    2 === v ? p.y = -p.height / 4 : p.y = 0,
                    x.x = e + 8,
                    x.y = p.y - 8,
                    x.graphics.lineStyle(1, i),
                    x.graphics.beginFill(i, 1),
                    x.graphics.moveTo(0, p.height / 2 + 8),
                    x.graphics.lineTo(20, 0),
                    x.graphics.lineTo(p.x + p.width, 0),
                    x.graphics.lineTo(p.x + p.width, p.height + 16),
                    x.graphics.lineTo(20, p.height + 16),
                    x.graphics.lineTo(0, p.height / 2 + 8),
                    x.graphics.endFill(),
                    x.alpha = .3,
                    m.addChild(w),
                    m.addChild(b),
                    m.addChild(x),
                    m.addChild(p),
                    m.x = l + Math.random() * (s - p.width),
                    m.y = d + Math.random() * (u - p.height),
                    m.name = p.text;
                var S = .5 * Math.random() + .75;
                return m.scaleX = 0,
                    m.scaleY = S,
                    this.layers.comments.addChild(m),
                    99 !== o ? egret.Tween.get(m).wait(50 * o).to({
                        scaleX: S
                    }, 400, c) : m.scaleX = S,
                    this.starsContainerTable[f + "-" + h] = m,
                    m
            }
            ,
            l.prototype.addStar = function(e, n, a) {
                void 0 === a && (a = function() {}
                );
                var r = f * s
                    , i = h * u
                    , o = this.drawStar({
                    h: f,
                    v: h,
                    x: r,
                    y: i,
                    user: e,
                    content: n
                }, 99);
                o.alpha = 0,
                    o.y = i + 50,
                    o.scaleX = 1.2,
                    o.scaleY = 1.2;
                var c = egret.Tween.get(this.layer)
                    , l = egret.Tween.get(o);
                c.to({
                    x: 50,
                    y: 600
                }, 800, egret.Ease.quadInOut),
                    l.wait(800).to({
                        alpha: 1
                    }, 600, egret.Ease.quadIn).call(function() {
                        return a(n)
                    }),
                    t.post(t.config.domain.addComment, {
                        message: n
                    })
            }
            ,
            l.prototype.reset = function() {
                this.stop(),
                    this.ws.close(),
                    this.starsList = [],
                    this.starsContainerTable = {},
                    this.startsEnable = !1,
                    this.layer.scaleX = 1,
                    this.layer.scaleY = 1,
                    this.layer.x = 0,
                    this.layer.y = 0,
                    this.layers.comments.removeChildren(),
                    this.layer.removeChild(this.layers.meteor),
                    this.layer.removeChild(this.layers.bridge),
                    this.layer.removeChild(this.layers.moon),
                    this.layer.removeChild(this.layers["char"]),
                    this.layer.removeChild(this.layers.comments)
            }
            ,
            l.prototype.preWatch = function() {
                return "h5" === t.config.plat && (this.orientationManager.addEventListener(egret.OrientationEvent.CHANGE, this.handlePreWatch, this),
                    this.orientationManager.start()),
                    this
            }
            ,
            l.prototype.watch = function() {
                var e = this;
                if ("pc" === t.config.plat)
                    document.addEventListener("mousemove", this.updatePCXY),
                        document.addEventListener("mousewheel", this.updatePCZ),
                        document.addEventListener("mouseenter", this.resetPC),
                        document.addEventListener("DOMMouseScroll", this.updatePCZ);
                else {
                    this.orientationManager.stop(),
                        this.orientationManager.removeEventListener(egret.OrientationEvent.CHANGE, this.handlePreWatch, this),
                        this.orientationManager.addEventListener(egret.OrientationEvent.CHANGE, this.updateH5XY, this),
                        this.orientationManager.start();
                    var n = document.getElementsByTagName("canvas")[0];
                    this.zingTouch = new ZingTouch.Region(n),
                        this.zingTouch.bind(n, "pinch", function(t) {
                            var n = t.detail;
                            return e.updateH5Z(n)
                        }, !1),
                        this.zingTouch.bind(n, "expand", function(t) {
                            var n = t.detail;
                            return e.updateH5Z(n, !0)
                        }, !1)
                }
            }
            ,
            l.prototype.getOrientation = function() {
                return this.orientation
            }
            ,
            l.prototype.angleToFactor = function(e, n) {
                var a = "alpha" === n ? 360 : 60
                    , r = e;
                "beta" === n && 0 > e && (r = 360 + e);
                var i = (r - this.orientation[n]) / a;
                return "beta" === n && t.config.isIos && !t.config.isQQ && (i = -i),
                i > .5 && (i = .5),
                -.5 > i && (i = -.5),
                    "beta" === n && t.config.isIos && !t.config.isQQ ? .5 + i : .5 - i
            }
            ,
            l.prototype.stop = function() {
                "pc" === t.config.plat ? (document.removeEventListener("mousemove", this.updatePCXY),
                    document.removeEventListener("mousewheel", this.updatePCZ),
                    document.removeEventListener("mouseenter", this.resetPC),
                    document.removeEventListener("DOMMouseScroll", this.updatePCZ)) : (this.orientationManager.stop(),
                    this.orientationManager.removeEventListener(egret.OrientationEvent.CHANGE, this.updateH5XY, this),
                    this.zingTouch.unbind(document.getElementsByTagName("canvas")[0]))
            }
            ,
            l
    }();
    t.Galaxy = l,
        __reflect(l.prototype, "GAL.Galaxy")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.bg = new egret.Shape,
                e.progress = new egret.DisplayObjectContainer,
                e.pgBg = new egret.Shape,
                e.pgFg = new egret.Shape,
                e.loaded = !1,
                e.callback = function() {}
                ,
                e.addEventListener(egret.Event.ADDED_TO_STAGE, e.createView, e),
                e.addEventListener(egret.Event.REMOVED_FROM_STAGE, e.clear, e),
                e
        }

        return __extends(e, t),
            e.prototype.createView = function() {
                var t = this.stage
                    , e = t.stageWidth
                    , n = t.stageHeight;
                this.bg.width = e,
                    this.bg.height = n,
                    this.bg.graphics.beginFill(0, 1),
                    this.bg.graphics.drawRect(0, 0, e, n),
                    this.bg.graphics.endFill(),
                    this.progress.width = 150 * e / 540,
                    this.progress.height = 2,
                    this.progress.x = (e - this.progress.width) / 2,
                    this.progress.y = (n - this.progress.height) / 2 + 100,
                    this.pgBg.width = this.progress.width,
                    this.pgBg.height = this.progress.height / 2,
                    this.pgBg.x = 0,
                    this.pgBg.y = 0,
                    this.pgBg.graphics.beginFill(4806245, 1),
                    this.pgBg.graphics.drawRect(0, 0, this.pgBg.width, this.pgBg.height),
                    this.pgBg.graphics.endFill(),
                    this.pgFg.width = this.pgBg.width,
                    this.pgFg.height = this.progress.height,
                    this.pgFg.x = this.pgBg.x,
                    this.pgFg.y = -this.progress.height / 4,
                    this.progress.addChild(this.pgBg),
                    this.progress.addChild(this.pgFg),
                    this.addChild(this.bg),
                    this.addChild(this.progress)
            }
            ,
            e.prototype.addToStage = function(t) {
                this.originStage = t,
                    this.originStage.addChild(this)
            }
            ,
            e.prototype.setProgress = function(t, e) {
                var n = ~~(t / e * this.pgFg.width);
                this.pgFg.graphics.beginFill(16777215, 1),
                    this.pgFg.graphics.drawRoundRect(0, 0, n, this.pgFg.height, 1, 1),
                    this.pgFg.graphics.endFill()
            }
            ,
            e.prototype.onItemLoadError = function(t) {
                console.warn("Url:" + t.resItem.url + " has failed to load")
            }
            ,
            e.prototype.onResourceLoadError = function(t) {
                console.warn("Group:" + t.groupName + " has failed to load"),
                    this.endFirst()
            }
            ,
            e.prototype.onResourceProgress = function(t) {
                this.setProgress(t.itemsLoaded, t.itemsTotal)
            }
            ,
            e.prototype.startFirst = function(t) {
                this.callback = t,
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.endFirst, this),
                    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
                    RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
                    RES.loadGroup("preload")
            }
            ,
            e.prototype.endFirst = function() {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.endFirst, this),
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
                    document.getElementById("loading").style.display = "none",
                    this.visible = !1,
                    this.callback()
            }
            ,
            e.prototype.startSecond = function(t) {
                var e = this;
                return void 0 === t && (t = function() {}
                ),
                    this.loaded ? void t() : (this.visible = !0,
                        this.loaded = !1,
                        this.callback = t,
                        this.originStage.setChildIndex(this, 10),
                        document.getElementById("loading").style.display = "block",
                        this.pgFg.graphics.clear(),
                        this.bg.alpha = .7,
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.endSecond, this),
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
                        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
                        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
                        RES.loadGroup("resources"),
                        {
                            check: function() {
                                return e.loaded
                            },
                            exec: function() {}
                        })
            }
            ,
            e.prototype.endSecond = function() {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.endSecond, this),
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
                    this.visible = !1,
                    this.originStage.removeChild(this),
                    this.loaded = !0,
                    this.callback()
            }
            ,
            e.prototype.clear = function() {
                document.body.removeChild(document.getElementById("loading"))
            }
            ,
            e
    }(egret.Sprite);
    t.LoadingUI = e,
        __reflect(e.prototype, "GAL.LoadingUI")
}(GAL || (GAL = {}));
var GAL;
!function(t) {
    var e = function(t) {
        function e() {
            var e = t.call(this) || this;
            e.layers = {
                bg: new egret.Shape,
                tv: new egret.Bitmap,
                logo: new egret.Bitmap,
                pan: new egret.Bitmap,
                lPin: new egret.Bitmap,
                sPin: new egret.Bitmap
            },
                e.initDone = !1,
                e.callback = null,
                e.prepare = null,
                e.animationEnd = !1,
                e.init = function() {
                    var t = e.layers
                        , n = t.bg
                        , a = t.tv
                        , r = t.pan
                        , i = t.logo
                        , o = t.lPin
                        , c = t.sPin
                        , s = e.originStage
                        , u = s.stageWidth
                        , f = s.stageHeight;
                    return e.initDone || (a.texture = RES.getRes("npc.tv"),
                        r.texture = RES.getRes("elements.clock-pan"),
                        i.texture = RES.getRes("elements.clock-logo"),
                        o.texture = RES.getRes("elements.clock-pin-l"),
                        c.texture = RES.getRes("elements.clock-pin-s"),
                        n.width = u,
                        n.height = f,
                        n.x = 0,
                        n.y = 0,
                        n.graphics.beginFill(0, 1),
                        n.graphics.drawRect(0, 0, n.width, n.height),
                        n.graphics.endFill(),
                        a.width = 2 * u / 3,
                        a.height = a.texture.textureHeight / a.texture.textureWidth * a.width,
                        a.anchorOffsetX = a.width / 2,
                        a.anchorOffsetY = a.height / 2,
                        a.x = u / 2,
                        a.y = f / 2 - 204,
                        a.rotation = -10,
                        a.alpha = .6,
                        r.width = 2 * u / 3,
                        r.height = r.texture.textureHeight / r.texture.textureWidth * r.width,
                        r.x = (u - r.width) / 2,
                        r.y = (f - r.height) / 2,
                        i.width = 3 * r.width / 5,
                        i.height = i.texture.textureHeight / i.texture.textureWidth * i.width,
                        i.x = (u - i.width) / 2,
                        i.y = (f - i.height) / 2,
                        o.height = r.height,
                        o.width = o.texture.textureWidth / o.texture.textureHeight * o.height,
                        o.anchorOffsetX = o.width / 2,
                        o.anchorOffsetY = o.height / 2,
                        o.x = u / 2,
                        o.y = f / 2,
                        c.height = 4 * r.height / 5,
                        c.width = c.texture.textureWidth / c.texture.textureHeight * c.height,
                        c.anchorOffsetX = c.width / 2,
                        c.anchorOffsetY = c.height / 2,
                        c.x = o.x,
                        c.y = o.y,
                        e.initDone = !0),
                        e.alpha = 0,
                        o.rotation = 0,
                        c.rotation = 0,
                        e.prepare(),
                        e.animate(),
                        {
                            check: function() {
                                return e.animationEnd
                            },
                            exec: function() {}
                        }
                }
            ;
            var n = e.layers
                , a = n.bg
                , r = n.tv
                , i = n.pan
                , o = n.logo
                , c = n.lPin
                , s = n.sPin;
            return a.name = "bg",
                r.name = "tv",
                i.name = "pan",
                o.name = "logo",
                c.name = "lPin",
                s.name = "sPin",
                e.addChild(a),
                e.addChild(i),
                e.addChild(o),
                e.addChild(c),
                e.addChild(s),
                e.addChild(r),
                e
        }

        return __extends(e, t),
            e.prototype.addToStage = function(t) {
                this.originStage = t,
                    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)
            }
            ,
            e.prototype.animate = function() {
                var t = this
                    , e = egret.Tween.get(this)
                    , n = egret.Tween.get(this.layers.lPin)
                    , a = egret.Tween.get(this.layers.sPin);
                e.to({
                    alpha: 1
                }, 1e3, egret.Ease.quadInOut).wait(1500).to({
                    alpha: 0
                }, 500, egret.Ease.quadInOut).call(function() {
                    t.close()
                }),
                    n.to({
                        rotation: -2160
                    }, 3e3, egret.Ease.quadOut),
                    a.to({
                        rotation: -210
                    }, 3e3, egret.Ease.quadOut)
            }
            ,
            e.prototype.show = function(t, e) {
                var n = this;
                return void 0 === t && (t = function() {}
                ),
                void 0 === e && (e = function() {}
                ),
                    this.animationEnd = !1,
                    this.callback = t,
                    this.prepare = e,
                    this.originStage.addChild(this),
                    {
                        check: function() {
                            return n.animationEnd
                        },
                        exec: function() {}
                    }
            }
            ,
            e.prototype.close = function() {
                this.callback(),
                    this.originStage.removeChild(this),
                    this.animationEnd = !0
            }
            ,
            e
    }(egret.DisplayObjectContainer);
    t.Samsara = e,
        __reflect(e.prototype, "GAL.Samsara")
}(GAL || (GAL = {}));
var singleton;
!function(t) {
    var e = GAL.config.defaultCps;
    t.loading = new GAL.LoadingUI,
        t.interpreter = new GAL.Interpreter,
        t.scene = new GAL.Scene(t.interpreter),
        t.branch = new GAL.Branch,
        t.bgm = new GAL.Audio(!1,!0),
        t.text = new GAL.Text,
        t.galaxy = new GAL.Galaxy,
        t.title = new GAL.Title,
        t.comment = new GAL.Comment,
        t.share = new GAL.Share,
        t.samsara = new GAL.Samsara,
        t.altair = new GAL.Character("altair","33","altair",13770201,13770201,e),
        t.vega = new GAL.Character("vega","22","vega",24831,24831,e),
        t.boy = new GAL.Character("npc.boy","少年","boy",30884,30884,e,!1,!1),
        t.girl = new GAL.Character("npc.girl","少女","girl",16740027,16740027,e,!1,!1),
        t.fff = new GAL.Character("npc.fff","F^3","fff",12320768,12320768,e,!1,!1),
        t.tv = new GAL.Character("npc.tv","迷之生物","npc",1796608,1796608,e,!1,!1),
        t.six = new GAL.Character("npc.six","66","npc",1796608,1796608,e,!1,!1),
        t.nine = new GAL.Character("npc.nine","99","npc",1796608,1796608,e,!1,!1),
        t.rem = new GAL.Character("npc.rem","萌王","npc",1796608,1796608,e,!1,!1),
        t.yato = new GAL.Character("npc.yato","燃王","npc",1796608,1796608,e,!1,!1),
        t.tvh = new GAL.Character("npc.tv-h","河神","npc",1796608,1796608,e,!1,!1),
        t.up = new GAL.Character("npc.up","UP评审团","npc",1796608,1796608,e,!1,!1),
        t.cow = new GAL.Character("npc.cow","牛","npc",1796608,1796608,e,!1,!1)
}(singleton || (singleton = {}));
var GAL;
!function(t) {
    function e(t, e, n) {
        void 0 === t && (t = r),
        void 0 === e && (e = i),
        void 0 === n && (n = "#fff");
        var a = o.join(";")
            , c = new Image;
        c.src = t,
            c.onload = function() {
                console.log("%c", "background: " + n + " url('" + t + "') center center / cover no-repeat; color: transparent; padding: 100px 100px; line-height: 240px");
                var r = e.split("\n");
                r.forEach(function(t) {
                    return console.log("%c" + t, a)
                })
            }
    }

    axios.defaults.withCredentials = !0,
        t.getCookie = function(t) {
            if (!t)
                return "";
            var e = "" + document.cookie
                , n = e.indexOf(t + "=");
            if (-1 === n)
                return "";
            var a = e.indexOf(";", n);
            return -1 === a && (a = e.length),
                decodeURIComponent(e.substring(n + t.length + 1, a))
        }
        ,
        t.qsStringify = function(t) {
            if (!t)
                return "";
            var e = Object.keys(t).map(function(e) {
                return e + "=" + t[e]
            });
            return e.join("&")
        }
        ,
        t.get = function(e, n, a) {
            void 0 === a && (a = !0);
            var r = n || "";
            return a && (r = t.qsStringify(n)),
                axios.get(e + "?" + r)
        }
        ,
        t.post = function(e, n, a) {
            void 0 === a && (a = !0);
            var r = n;
            return r.token = t.getCookie("bili_jct"),
            a && (r = t.qsStringify(n)),
                axios.post(e, r)
        }
        ,
        t.parsePath = function(t) {
            return t.split("").map(function(t) {
                return parseInt(t)
            })
        }
    ;
    var n = "888.17."
        , a = function(t, e, n) {
        void 0 === n && (n = "");
        var a = {
            loginId: "000017" + (new Date).getTime(),
            url: encodeURIComponent(window.location.href),
            spmId: t,
            targetUrl: e,
            timestamp: (new Date).getTime(),
            screenX: "",
            screenY: "",
            browserResolution: (window.innerWidth || document.body.clientWidth) + "x" + (window.innerHeight || document.body.clientHeight),
            ptype: (window.innerWidth || document.body.clientWidth) < 750 ? 2 : 1,
            msg: n
        };
        return "https://data.bilibili.com/log/web?" + a.loginId + a.url + "|" + a.spmId + "|" + a.targetUrl + "|" + a.timestamp + "|" + a.screenX + "|" + a.screenY + "|" + a.browserResolution + "|" + a.ptype + "|" + a.msg
    };
    t.report = function(t, e, r) {
        void 0 === e && (e = ""),
        void 0 === r && (r = "");
        var i = "" + n + t + ".1"
            , o = a(i, r, e);
        axios.get(o)
    }
        ,
        t.reportPV = function(t) {
            void 0 === t && (t = "");
            var e = document.referrer
                , a = {
                loginId: "000014" + (new Date).getTime(),
                url: encodeURIComponent(window.location.href),
                referUrl: e ? encodeURIComponent(e) : "",
                spmId: n + "0.0",
                timestamp: (new Date).getTime(),
                fts: "",
                browserResolution: (window.innerWidth || document.body.clientWidth) + "x" + (window.innerHeight || document.body.clientHeight),
                ptype: (window.innerWidth || document.body.clientWidth) < 750 ? 2 : 1,
                msg: t
            }
                , r = "https://data.bilibili.com/log/web?" + a.loginId + a.url + "|" + a.referUrl + "|" + a.spmId + "|" + a.timestamp + "|" + a.fts + "|" + a.browserResolution + "|" + a.ptype + "|" + a.msg;
            axios.get(r)
        }
        ,
        t.getUserInfo = function() {
            return t.get(t.config.domain.info).then(function(e) {
                var n = e.data
                    , a = n.code
                    , r = n.data;
                if (0 === a) {
                    var i = t.parsePath(r.path);
                    t.config.user = {
                        id: String(r.mid),
                        name: r.uname,
                        sex: r.gamesex,
                        path: i,
                        firstPath: r.path
                    },
                        t.report("uv_sex", 1 === t.config.user.sex ? "girl" : "boy")
                }
            })["catch"](function(t) {})
        }
    ;
    var r = t.config.shareImage
        , i = "\n如果看到这里，说明您对二次元和技术都有着相当的热爱。\n既然如此，尝试一下从单纯的消费者到创造者一员的转型也不错？\n不妨加入我们，用最新的技术来为这个虚拟却现实的世界添砖加瓦——\n可以发送邮件到H光大小姐的邮箱(daitianyu@bilibili.com)，获得内推机会。\n  "
        , o = ["fons-size: 13px"];
    t.logEgg = e,
        e()
}(GAL || (GAL = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        e.maps = function() {
            var e = 0 === t.config.user.sex ? "b" : "g"
                , n = ["B", "C", "D"].filter(function(e) {
                return -1 === t.config.selectedMaps.indexOf(e)
            }).map(function(n) {
                return "B" === n ? {
                    content: "",
                    callback: function() {
                        t.branch.from("right"),
                            t.config.selectedMaps.push("B"),
                            t.report("map", "1"),
                            t.interpreter.load(t[e].map1),
                            t.interpreter.next()
                    },
                    bg: "elements.s1"
                } : "C" === n ? {
                    content: "",
                    callback: function() {
                        t.branch.from("right"),
                            t.config.selectedMaps.push("C"),
                            t.report("map", "2"),
                            t.interpreter.load(t[e].map2),
                            t.interpreter.next()
                    },
                    bg: "elements.s2"
                } : "D" === n ? {
                    content: "",
                    callback: function() {
                        t.branch.from("right"),
                            t.config.selectedMaps.push("D"),
                            t.report("map", "3"),
                            t.interpreter.load(t[e].map3),
                            t.interpreter.next()
                    },
                    bg: "elements.s3"
                } : void 0
            });
            return n.length <= 2 && n.push({
                content: "",
                callback: function() {
                    t.branch.from("right"),
                        t.report("te", 0 === t.config.user.sex ? "boy" : "girl"),
                        t.interpreter.load(t[e].te),
                        t.interpreter.next()
                },
                bg: "elements.s4"
            }),
                t.branch.from("bottom", 24).open(n, !0, {
                    width: 460,
                    x: egret.HorizontalAlign.CENTER
                })
        }
    }(e = t.branches || (t.branches = {}))
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    t.loading = singleton.loading,
        t.altair = singleton.altair,
        t.vega = singleton.vega,
        t.boy = singleton.boy,
        t.girl = singleton.girl,
        t.fff = singleton.fff,
        t.tv = singleton.tv,
        t.six = singleton.six,
        t.nine = singleton.nine,
        t.rem = singleton.rem,
        t.yato = singleton.yato,
        t.tvh = singleton.tvh,
        t.up = singleton.up,
        t.cow = singleton.cow,
        t.scene = singleton.scene,
        t.bgm = singleton.bgm,
        t.branch = singleton.branch,
        t.text = singleton.text,
        t.interpreter = singleton.interpreter,
        t.galaxy = singleton.galaxy,
        t.title = singleton.title,
        t.comment = singleton.comment,
        t.share = singleton.share,
        t.samsara = singleton.samsara,
        t.config = GAL.config,
        t.report = GAL.report,
        t.checkAngle = function(t, e) {
            if (Math.abs(e) > 160)
                return Math.abs(t) > 160;
            var n = t - e;
            return 0 > n && n >= -20 || n > 0 && 20 >= n
        }
        ,
        t.loadAndNext = function(e, n, a, r) {
            setTimeout(function() {
                if (t.interpreter.load(e),
                        t.interpreter.next(),
                    "number" == typeof n && "number" == typeof a) {
                    var i = r || 0;
                    t.config.user.path[n + i] = a
                }
            }, 0)
        }
        ,
        t.next = function() {
            setTimeout(function() {
                t.interpreter.next()
            }, 0)
        }
        ,
        t.login = function() {
            alert("请先登录哦~"),
                window.location.href = t.config.domain.login
        }
        ,
        t.matchFriend = function() {
            var e = t.config.user.path.join("");
            return GAL.post(t.config.domain.match, {
                path: e
            }).then(function(e) {
                var n = e.data
                    , a = n.code
                    , r = n.data
                    , i = n.msg;
                return 0 !== a ? (alert("出问题啦，" + i + "，请重试哦~"),
                    t.matchFriend()) : (t.config.friend = {
                    id: r.mid,
                    name: r.name
                },
                    void t.next())
            })["catch"](function(e) {
                alert("网络出问题啦，请重试哦~"),
                    t.matchFriend()
            }),
                {
                    check: function() {
                        return !!t.config.friend
                    },
                    exec: function() {}
                }
        }
        ,
        t.restart = function() {
            location.reload(!1),
                t.config.selectedMaps = [],
                t.config.friend = null,
                t.galaxy.reset(),
                t.share.close(),
                t.altair.withShow(!1),
                t.vega.withShow(!1),
                t.boy.withShow(!1).rename("少年"),
                t.girl.withShow(!1).rename("少女"),
                t.fff.withShow(!1),
                t.loadAndNext(t.intro)
        }
        ,
        t.sendLetter = function() {
            t.report("letter", 0 === t.config.user.sex ? "boy" : "girl")
        }
        ,
        t.doShare = function() {
            t.report("share", 0 === t.config.user.sex ? "boy" : "girl")
        }
        ,
        t.jumpMovie = function() {
            t.report("movie", 0 === t.config.user.sex ? "boy" : "girl")
        }
        ,
        t.mapCoords = {
            map1: {
                scale: 1,
                gate: [-700, -900],
                rc: [300, -900],
                tent: [-400, -200],
                ice: [600, 300],
                fw: [-200, 200]
            },
            map2: {
                gate: [1e3, 1e3],
                love: [300, 200],
                peace: [900, 400],
                reception: [50, 800],
                anteroom: [600, -500]
            },
            map3: {
                entry: [1e3, -1e3],
                brige: [-500, -400],
                river: [0, -800],
                tree: [-600, -900],
                room: [150, 200],
                yard: [700, 500],
                well: [650, -350]
            }
        }
}(scenario || (scenario = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var t = e.call(this) || this;
            return t.visible = !1,
                t.addEventListener(egret.Event.ADDED_TO_STAGE, t.onAddToStage, t),
                t
        }

        return __extends(n, e),
            n.prototype.onAddToStage = function() {
                this.touchIcon = new egret.Bitmap,
                    this.touchIcon.name = "touch",
                    this.touchIcon.texture = RES.getRes(t.DIALOG_SIZE_LUT.touchIcon.bg),
                    this.touchIcon.width = t.DIALOG_SIZE_LUT.touchIcon.width,
                    this.touchIcon.height = this.touchIcon.width * this.touchIcon.texture.textureHeight / this.touchIcon.texture.textureWidth;
                var e = this.stage
                    , n = e.stageWidth
                    , a = e.stageHeight
                    , r = this.width > n ? n : this.width
                    , i = this.height > a ? a : this.height;
                this.touchIcon.x = r - this.touchIcon.width - t.DIALOG_SIZE_LUT.touchIcon.right,
                    this.touchIcon.y = i - this.touchIcon.height - t.DIALOG_SIZE_LUT.touchIcon.bottom,
                    this.addChild(this.touchIcon)
            }
            ,
            n.prototype.say = function(t, e) {
                return {
                    exec: function() {},
                    check: function() {
                        return !0
                    }
                }
            }
            ,
            n.prototype.think = function(t, e) {
                return {
                    exec: function() {},
                    check: function() {
                        return !0
                    }
                }
            }
            ,
            n.prototype.hide = function() {
                this.visible = !1
            }
            ,
            n.prototype.resume = function() {
                this.visible = !0
            }
            ,
            n
    }(egret.DisplayObjectContainer);
    t.Dialog = e,
        __reflect(e.prototype, "GAL.Dialog")
}(GAL || (GAL = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        var n = t.mapCoords.map3
            , a = n.entry
            , r = n.brige
            , i = n.river
            , o = n.tree
            , c = n.room
            , s = n.yard
            , u = n.well
            , f = "";
        e.map3 = [function() {
            return t.scene.then(function() {
                return t.interpreter.next()
            }).at(a[0], a[1])["with"]().create("outskirts")
        }
            , function() {
                return t.girl.say("如果是要躲避追捕，人烟稀少的地方应该比较合适吧。")
            }
            , function() {
                return t.altair.withShow().posture("普通").face("微笑").size("middle").from("right").at(3).say("有道理。")
            }
            , function() {
                return t.scene.at(a[0] - 200, a[1] + 100).animate().show()
            }
            , function() {
                return t.scene.at(a[0] + 200, a[1] + 100).animate(1e3).show()
            }
            , function() {
                return t.scene.at(a[0], a[1]).animate().show()
            }
            , function() {
                return t.altair.face("腹黑").say("喔……这里的环境和哔哩哔哩星球挺像嘛。")
            }
            , function() {
                return t.altair.size("large").face("腹黑").say("改天请你去我和22的家做客吧——食宿自理哦。")
            }
            , function() {
                return t.altair.face("伤心").say("那个家伙没什么方向感，不会遇到F^3小电视吧……我们现在去哪？")
            }
            , function() {
                return t.branch.open([{
                    content: "先往河边走看看吧",
                    callback: function() {
                        return t.loadAndNext(e.d1, 0, 1, 10)
                    }
                }, {
                    content: "去前面的小屋问问",
                    callback: function() {
                        return t.loadAndNext(e.d2, 0, 2, 10)
                    }
                }])
            }
        ],
            e.d1 = [function() {
                return t.scene.clear().at(i[0], i[1]).animate(800).show()
            }
                , function() {
                    return t.altair.size("middle").face("微笑").say("说起来，我和22就是在河边第一次遇上的。")
                }
                , function() {
                    return t.altair.face("腹黑").say("嘿嘿嘿……其实她那时还在洗澡——不用那么看着我！")
                }
                , function() {
                    return t.girl.say("难道是牛郎织女……")
                }
                , function() {
                    return t.altair.size("large").face("惊讶").say("嗯？牛郎织女？并不是哦，大概只是巧合吧。")
                }
                , function() {
                    return t.altair.face("微笑").say("好了，还是先找到22……她大概会对这故事很感兴趣吧。")
                }
                , function() {
                    return t.branch.open([{
                        content: "等等，树上似乎画了东西？",
                        callback: function() {
                            return f = "tree",
                                t.loadAndNext(e.d3, 1, 1, 10)
                        }
                    }, {
                        content: "咦，水井边有奇怪的记号？",
                        callback: function() {
                            return f = "well",
                                t.loadAndNext(e.d4, 1, 2, 10)
                        }
                    }])
                }
            ],
            e.d2 = [function() {
                return t.scene.clear().at(c[0], c[1]).animate(800).show()
            }
                , function() {
                    return t.altair.size("middle").face("紧张").from("right").at(3).face("紧张").say("你好！——诶？屋子没锁，不过似乎也没人。")
                }
                , function() {
                    return t.altair.face("疑惑").say("院子既然养着牛，应该是有人住的吧。")
                }
                , function() {
                    return t.altair.face("腹黑").say("我和22也养了一只牛。看起来比它好吃哟——")
                }
                , function() {
                    return t.girl.say("难道是牛郎织女……")
                }
                , function() {
                    return t.altair.face("惊讶").say("嗯？牛郎织女？……是这个星球的传说么？")
                }
                , function() {
                    return t.altair.size("large").face("微笑").say("只是巧合吧。现在不是聊这些的时候哦。")
                }
                , function() {
                    return t.branch.open([{
                        content: "先去院子看看",
                        callback: function() {
                            return t.loadAndNext(e.d14, 1, 1, 10)
                        }
                    }, {
                        content: "进屋再说好了",
                        callback: function() {
                            return t.loadAndNext(e.d15, 1, 2, 10)
                        }
                    }])
                }
            ],
            e.d3 = [function() {
                return t.scene.clear().at(o[0], o[1]).animate().show()
            }
                , function() {
                    return t.altair.face("惊讶").from("left").at(3).size("middle").say("这是——22留的标记，我不会认错的。")
                }
                , function() {
                    return t.altair.face("微笑").say("这个形状是我第一次送她的发簪。")
                }
                , function() {
                    return t.altair.face("黑线").say("送、送牛头形状的发簪有什么关系！……还不是看她喜欢牛。")
                }
                , function() {
                    return t.altair.face("面瘫").say("下面画的是……路线图？")
                }
                , function() {
                    return t.branch.open([{
                        content: "感觉可疑，先不管它",
                        callback: function() {
                            return t.loadAndNext(e.d5, 2, 1, 10)
                        }
                    }, {
                        content: "研究标记下的路线图",
                        callback: function() {
                            return t.loadAndNext(e.d6, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d4 = [function() {
                return t.scene.clear().at(u[0], u[1]).animate().show()
            }
                , function() {
                    return t.altair.face("疑惑").from("right").at(3).size("middle").say("似乎刻了什么古文？应该和22或者F^3没什么关系吧。")
                }
                , function() {
                    return t.altair.size("large").face("黑线").say("还有奇怪的……斧子图案？")
                }
                , function() {
                    return t.altair.face("面瘫").say("不会是恶作剧吧。还要继续调查一下水井吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "有点好奇，往井口看看",
                        callback: function() {
                            return t.loadAndNext(e.d11, 2, 1, 10)
                        }
                    }, {
                        content: "既然不认识还是别靠近",
                        callback: function() {
                            return t.loadAndNext(e.d5, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d5 = [function() {
                return t.altair.size("middle").face("紧张").say("嗯，应该谨慎点。F^3们恐怕也不会很远……")
            }
                , function() {
                    return t.altair.face("伤心").say("22这家伙，不会先遇上它们吧。")
                }
                , function() {
                    return t.altair.face("惊讶").say("等等，那是——桥上有人在招手？")
                }
                , function() {
                    return t.altair.face("紧张").say("是冲着我们吗？听不清她的话……")
                }
                , function() {
                    return t.branch.open([{
                        content: "过去问问，说不定知道些什么",
                        callback: function() {
                            return t.loadAndNext(e.d9, 3, 1, 10)
                        }
                    }, {
                        content: "不要接近陌生人为好，往回走",
                        callback: function() {
                            return t.loadAndNext(e.d10, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d6 = [function() {
                return t.altair.size("middle").face("紧张").say("沿着这个就能找到22？总觉得太简单了……")
            }
                , function() {
                    return t.altair.face("微笑").say("不过既然是她自己留的记号，至少22还是安全的吧。")
                }
                , function() {
                    return t.altair.face("惊讶").say("对哦……说不定F^3小电视也会看到这个。")
                }
                , function() {
                    return t.altair.size("large").face("面瘫").say("路线已经记下了。这个记号呢？")
                }
                , function() {
                    return t.branch.open([{
                        content: "把记号和路线销毁",
                        callback: function() {
                            return t.loadAndNext(e.d7, 3, 1, 10)
                        }
                    }, {
                        content: "留下给22的讯息",
                        callback: function() {
                            return t.loadAndNext(e.d8, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d7 = [function() {
                return t.altair.size("middle").face("面瘫").say("嗯。小心为好，F^3们不会轻易放过我和22的。")
            }
                , function() {
                    return t.altair.face("疑惑").say("不过……已经走了这么久，快到路线的终点了吧？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("答——对啦！能顺利找到这里真是太了不起了～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3！？你们在这里做什么？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("咦~不是专程来找我们的吗？真不客气呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("难道那些记号和路线是……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("啊，那可是22的亲笔大作！我们不过在下面加了点小小的创意～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("你们这些黑漆漆的无赖！22在哪？？")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘿嘿嘿，这就接你去见她哟～是不是又欠了我们一份人情？")
                }
                , function() {
                    return t.altair.face("激动").say("放——放开我！卑鄙！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d8 = [function() {
                return t.altair.size("middle").face("微笑").say("换上我的记号的话，就算22回到那里也会知道我去过吧。")
            }
                , function() {
                    return t.altair.face("疑惑").say("不过走了这么久，似乎沿着路线图绕了很多路？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).say("NO~没有走错哟，能顺利找到这里真是太了不起了！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3！？你们在这里做什么？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("咦~不是专程来找我们的吗？真不客气呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("难道那些记号和路线是……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("啊，那可是22的亲笔大作！我们不过在下面加了点小小的创意～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("你们这些黑漆漆的无赖！22在哪？？")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘿嘿嘿，这就接你去见她哟～是不是又欠了我们一份人情？")
                }
                , function() {
                    return t.altair.face("激动").say("放——放开我！卑鄙！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d9 = [function() {
                return t.scene.clear().at(r[0], r[1]).animate().show()
            }
                , function() {
                    return t.girl.say("你是……？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.withShow().at(-1).from("left").say("你是33吧？22和我说起过你的样子——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("middle").face("惊讶").at(3).from("right").say("22！？她现在在哪？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.say("我们原本在找你，但在这附近遇到了F^3，22被……")
                }
                , function() {
                    return t.boy.say("我是来警告你的！你们不该出现在这里，快躲到其他地方去！")
                }
                , function() {
                    return t.scene.at(-700, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(-5).from("left").say("嘻嘻~怎么能让33离开22到过的地方呢~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.think("糟糕！！F^3果然还没走远，桥上太显眼了吗……")
                }
                , function() {
                    return t.altair.face("激动").say("这群怪物——把22还给我！！")
                }
                , function() {
                    return t.fff.at(2).animate().say("真吓人~还提这么过分的要求——不如先跟我们去叙叙旧吧哈哈！")
                }
                , function() {
                    return t.altair.face("激动").say("放开我！！你们这群黑地瓜！！ ")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d10 = [function() {
                "well" === f ? t.scene.at(u[0], u[1] - 100).animate().show() : "tree" === f ? t.scene.at(o[0] + 100, o[1] + 100).animate().show() : t.scene.at(s[0] - 100, s[1]).animate().show()
            }
                , function() {
                    return t.girl.say("等——等等！不可以往那个方向走！！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(9).from("right").say("回答……正确！这个方向会遇到名为F^3吉祥物哟～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("紧张").say("F^3小电视！什么时候靠近的……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("真是的，连热心的小姐姐都拦不住你和22奔向我们呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("22？你们把22怎么样了？")
                }
                , function() {
                    return t.fff.at(4).animate().say("怎么样了？我们可以再演示一遍哟，放弃抵抗吧～")
                }
                , function() {
                    return t.altair.face("激动").say("放开我！！你们把22藏哪了！！ ")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d11 = [function() {
                return t.scene.at(u[0] + 100, u[1] + 50).animate().show()
            }
                , function() {
                    return t.altair.size("middle").face("疑惑").say("哼——往里看也没什么啊，你看到什么了么？")
                }
                , function() {
                    return t.altair.size("small").face("惊讶").at(3, 2).say("井底似乎有个反光的……")
                }
                , function() {
                    return t.altair.size("exSmall").face("激动").at(3, 3).say("好、好滑——啊啊啊啊！（扑通）")
                }
                , function() {
                    return t.scene.at(0, 0)["with"](400, "fade").create("black")
                }
                , function() {
                    return t.girl.think("诶诶诶？不是吧，33掉下去了！？")
                }
                , function() {
                    return t.girl.think("但完全没有其他声音传来……消失了？")
                }
                , function() {
                    return t.scene.at(u[0], u[1])["with"](400, "fade").create("outskirts")
                }
                , function() {
                    return t.tvh.withShow().at(3, -1).from("bottom").say("HOHOHO～平凡的少女啊，你是不是丢失了伙伴？")
                }
                , function() {
                    return t.girl.say("…………………………")
                }
                , function() {
                    return t.girl.say("等等等等这是什么啊？？？")
                }
                , function() {
                    return t.tvh.say("HOHOHO～少女哟，那么你丢失的是这个肌肉33，女装33，还是邻家33？")
                }
                , function() {
                    return t.tvh.say("HOHO……你这是什么表情？神仙也有很多爱好的哟。")
                }
                , function() {
                    return t.branch.open([{
                        content: "丢失了肌肉33",
                        callback: function() {
                            return t.loadAndNext(e.d12, 3, 1, 10)
                        }
                    }, {
                        content: "丢失了女装33",
                        callback: function() {
                            return t.loadAndNext(e.d12, 3, 2, 10)
                        }
                    }, {
                        content: "丢失了邻家33",
                        callback: function() {
                            return t.loadAndNext(e.d13, 3, 3, 10)
                        }
                    }])
                }
            ],
            e.d12 = [function() {
                return t.tvh.say("HOHOHO，贪心的少女哟，说谎会令你失去宝贵的真实……")
            }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(11).from("right").say("邻家！卡密萨马！我们在找邻家那个！")
                }
                , function() {
                    return t.tvh.say("那么，我只能把33交给它们了……")
                }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("middle").face("惊讶").at(9, 0).from("bottom").say("F^3小电视！为什么它们也出现在这——")
                }
                , function() {
                    return t.altair.face("黑线").say("不过……邻家又是什么？不要随便套用滥俗的设定啊！！")
                }
                , function() {
                    return t.fff.at(10).animate().say("嘿嘿嘿，还是我们了解你哟33酱，乖乖跟我们走吧～")
                }
                , function() {
                    return t.altair.face("黑线").say("等等，还是让我掉回井里去好了——")
                }
                , function() {
                    return t.altair.face("激动").say("放开我！你们这些觍着脸的怪物！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d13 = [function() {
                return t.tvh.say("HOHOHO，诚实的少年，你会得到原本的33。")
            }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("middle").face("紧张").at(9, 0).from("bottom").say("呼——要是这么没了命就太丢人了……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.tvh.say("HOHOHO，作为奖励，把这些迷路的异乡人也领走吧。")
                }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(11).from("right").say("啊～～得救了呢，谢谢神仙大人！还以为这下完蛋了的说。")
                }
                , function() {
                    return t.altair.face("惊讶").say("是F^3？难道它们也……")
                }
                , function() {
                    return t.altair.face("黑线").say("喂，老头，别把掉进井里的脏东西随便送人啊！！")
                }
                , function() {
                    return t.fff.at(10).animate().say("哈哈哈真是转运呢，竟然还能这么逮到33，束手就擒吧～")
                }
                , function() {
                    return t.altair.face("激动").say("放手！你们这些阴魂不散的怪物！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d14 = [function() {
                return t.scene.clear().at(s[0], s[1]).animate().show()
            }
                , function() {
                    return t.altair.size("middle").face("面瘫").at(3).from("left").say("仔细看起来……这个星球的牛没有天线吗？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.cow.withShow().size("middle").at(8, 3).from("right").say("哞~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("微笑").say("22看到这家伙眼睛都会亮吧。")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.cow.say("哞！哞——哞！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("喂，忽然看起来很不安的样子？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.cow.say("哞～哞——哞——哞——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("腹黑").say("嘘……太吵会被煮了吃哦。")
                }
                , function() {
                    return t.branch.open([{
                        content: "会引来F^3的，进屋吧",
                        callback: function() {
                            return t.loadAndNext(e.d16, 2, 1, 10)
                        }
                    }, {
                        content: "像是警告，赶快离开这",
                        callback: function() {
                            return t.loadAndNext(e.d5, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d15 = [function() {
                return t.scene.clear().at(c[0] - 100, c[1] - 50).animate().show()
            }
                , function() {
                    return t.altair.size("middle").face("紧张").at(3).from("right").say("有人吗！我们进来咯……里面有点暗啊。")
                }
                , function() {
                    return t.altair.face("惊讶").say("摆在桌子旁的那个是——这个星球也有织机？")
                }
                , function() {
                    return t.altair.face("面瘫").say("这屋子……总觉得有点熟悉。似乎与我和22有着什么联系。")
                }
                , function() {
                    return t.altair.size("large").face("疑惑").say("如果是这样，她恐怕也会来到这儿。我应该留点东西让她知道……")
                }
                , function() {
                    return t.branch.open([{
                        content: "相信自己的直觉！",
                        callback: function() {
                            return t.loadAndNext(e.d19, 2, 1, 10)
                        }
                    }, {
                        content: "万一被F^3利用？",
                        callback: function() {
                            return t.loadAndNext(e.d20, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d16 = [function() {
                return t.scene.clear().at(c[0] - 100, c[1] - 50).animate().show()
            }
                , function() {
                    return t.altair.size("middle").face("紧张").at(3).from("right").say("里面有点暗啊……咦，这是——这个星球也有织机？")
                }
                , function() {
                    return t.altair.face("微笑").say("真怀念啊……无忧无虑在家鼓捣这东西的日子。")
                }
                , function() {
                    return t.altair.face("面瘫").say("虽然22那家伙老学不会这个，宁可和牛遛上半天。")
                }
                , function() {
                    return t.girl.say("织女也会放牛？")
                }
                , function() {
                    return t.altair.face("疑惑").say("你看起来很意外？因为我说的话么。")
                }
                , function() {
                    return t.branch.open([{
                        content: "为什么觉得哪里倒过来了",
                        callback: function() {
                            return t.loadAndNext(e.d17, 3, 1, 10)
                        }
                    }, {
                        content: "没什么，听起来很幸福呢",
                        callback: function() {
                            return t.loadAndNext(e.d18, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d17 = [function() {
                return t.altair.face("微笑").say("有哪里不对么，22的服饰可都是我亲手做的。")
            }
                , function() {
                    return t.altair.face("惊讶").say("等等，这铃声是……我送给22的铃铛！是院子那儿吗？")
                }
                , function() {
                    return t.scene.clear().at(s[0], s[1]).animate().show()
                }
                , function() {
                    return t.altair.size("middle").face("紧张").at(3).from("left").say("可恶——是幻觉吗？22不在这儿……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("啊～来自恋人贴身物品的声音，真是天籁呢～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3小电视！22身上的铃为什么在你们这儿？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈哈哈，看起来很不错就顺手拿过来了嘛。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("你们……把22怎么样了！？")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘻嘻，别着急，我们这不是来找你好好聊了吗~")
                }
                , function() {
                    return t.altair.face("激动").say("放——放开我！你们这些怪物！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d18 = [function() {
                return t.altair.size("middle").face("微笑").say("我可是花了不少时间和22的犟牛和平共处。")
            }
                , function() {
                    return t.altair.face("腹黑").say("还给22和它都做了铃铛，真是难收买的家伙——")
                }
                , function() {
                    return t.altair.face("惊讶").say("等等，这铃声是……我送给22的铃铛！是院子那儿吗？")
                }
                , function() {
                    return t.scene.clear().at(s[0], s[1]).animate().show()
                }
                , function() {
                    return t.altair.face("紧张").say("可恶——是幻觉吗？22不在这儿……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("啊～来自恋人贴身物品的声音，真是天籁呢～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3小电视！22身上的铃为什么在你们这儿？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈哈哈，看起来很不错就顺手拿过来了嘛。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("你们……把22怎么样了！？")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘻嘻，别着急，我们这不是来找你好好聊了吗~")
                }
                , function() {
                    return t.altair.face("激动").say("放——放开我！你们这些怪物！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d19 = [function() {
                return t.altair.size("middle").face("伤心").say("我把22送的笛子留在这里……如果22到了这，应该会明白。")
            }
                , function() {
                    return t.altair.face("微笑").say("有点怀念啊……无忧无虑在家鼓捣织机的日子。")
                }
                , function() {
                    return t.altair.size("large").face("面瘫").say("虽然22那家伙老学不会这个，宁可和牛遛上半天。")
                }
                , function() {
                    return t.altair.face("疑惑").say("你看起来很意外？因为我说的话么。")
                }
                , function() {
                    return t.branch.open([{
                        content: "纳尼，织布的不该是22吗",
                        callback: function() {
                            return t.loadAndNext(e.d17, 3, 1, 10)
                        }
                    }, {
                        content: "没什么，听起来很幸福呢",
                        callback: function() {
                            return t.loadAndNext(e.d18, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d20 = [function() {
                return t.altair.size("middle").face("生气").say("也对……哼，这些到哪都纠缠不清的家伙。")
            }
                , function() {
                    return t.altair.face("面瘫").say("如果不是因为F^3，我应该还在家无忧无虑地鼓捣织机吧。")
                }
                , function() {
                    return t.altair.size("large").face("面瘫").say("虽然22那家伙老学不会这个，宁可和牛遛上半天。")
                }
                , function() {
                    return t.altair.face("疑惑").say("你看起来很意外？因为我说的话么。")
                }
                , function() {
                    return t.branch.open([{
                        content: "纳尼，织布的不该是22吗",
                        callback: function() {
                            return t.loadAndNext(e.d17, 3, 1, 10)
                        }
                    }, {
                        content: "没什么，听起来很幸福呢",
                        callback: function() {
                            return t.loadAndNext(e.d18, 3, 2, 10)
                        }
                    }])
                }
            ]
    }(e = t.g || (t.g = {}))
}(scenario || (scenario = {}));
var Main = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.bg = new egret.Shape,
            e.onOrientationchange = function(t) {
                alert("游戏过程中修改横竖屏，可能会造成不可预知的渲染错误。若确实要更改，请刷新~")
            }
            ,
            GAL.reportPV(),
            egret.ImageLoader.crossOrigin = "anonymous",
            GAL.getUserInfo(),
            e.addEventListener(egret.Event.ADDED_TO_STAGE, e.onAddToStage, e),
            window.addEventListener("orientationchange", e.onOrientationchange),
        GAL.config.isAndroid4 && alert("您的手机系统版本过低，可能会出现不可预知的错误，建议升级系统哦~"),
            e
    }

    return __extends(e, t),
        e.prototype.onAddToStage = function(t) {
            var e = this.stage
                , n = e.stageWidth
                , a = e.stageHeight;
            this.bg.name = "bg",
                this.bg.width = n,
                this.bg.height = a,
                this.bg.graphics.beginFill(0, 1),
                this.bg.graphics.drawRect(0, 0, n, a),
                this.bg.graphics.endFill(),
                singleton.loading.addToStage(this.stage),
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
                devMode ? RES.loadConfig("resource/default.res.json", "resource/") : RES.loadConfig("//activity.hdslb.com/blackboard/activity6044/resource/default.res.json", "//activity.hdslb.com/blackboard/activity6044/resource/")
        }
        ,
        e.prototype.onConfigComplete = function(t) {
            var e = this;
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
                singleton.loading.startFirst(function() {
                    return e.createGameScene()
                })
        }
        ,
        e.prototype.createGameScene = function() {
            this.stage.addChild(this.bg),
                this.stage.addChild(singleton.scene),
                singleton.altair.addToScene(singleton.scene),
                singleton.vega.addToScene(singleton.scene),
                singleton.boy.addToScene(singleton.scene),
                singleton.girl.addToScene(singleton.scene),
                singleton.fff.addToScene(singleton.scene),
                singleton.tv.addToScene(singleton.scene),
                singleton.six.addToScene(singleton.scene),
                singleton.nine.addToScene(singleton.scene),
                singleton.rem.addToScene(singleton.scene),
                singleton.yato.addToScene(singleton.scene),
                singleton.tvh.addToScene(singleton.scene),
                singleton.up.addToScene(singleton.scene),
                singleton.cow.addToScene(singleton.scene),
                singleton.branch.addToScene(singleton.scene),
                singleton.text.addToScene(singleton.scene),
                singleton.galaxy.addToScene(singleton.scene),
                singleton.title.addToStage(this.stage),
                singleton.comment.addToStage(this.stage),
                singleton.share.addToStage(this.stage),
                singleton.samsara.addToStage(this.stage),
                singleton.scene.bindTouchEvent(),
                singleton.interpreter.load(scenario.intro),
                singleton.interpreter.next()
        }
        ,
        e
}(egret.DisplayObjectContainer);
__reflect(Main.prototype, "Main");
var scenario;
!function(t) {
    var e;
    !function(e) {
        e.be = [function() {
            return t.scene.clear().toMode("NVL"),
                t.girl.think("等等，就这么让它们把人带走？")
        }
            , function() {
                return t.girl.think("就这样……结束了吗？")
            }
            , function() {
                return t.girl.think("如果没有来这儿……如果我不那么选择………")
            }
            , function() {
                return t.scene.then(function() {
                    return t.interpreter.next()
                }).at(0, 0)["with"](800, "fade").create("black")
            }
            , function() {
                return t.girl.think("可恶，忽然什么都看不清——")
            }
            , function() {
                return t.girl.think("这也是F^3小电视搞的鬼吗？")
            }
            , function() {
                return t.loadAndNext(e.re)
            }
        ],
            e.re = [function() {
                return t.scene.toMode("ADV"),
                    t.tv.withShow().size("small").from("top", 800).at(3).say("这么说，如果有机会，你愿意再次帮助2233？")
            }
                , function() {
                    return t.girl.say("谁！？")
                }
                , function() {
                    return t.tv.withShow().size("small").from("top", 800).at(3).say("我？我是和你一样来帮助他们的。")
                }
                , function() {
                    return t.tv.say("那么，你真的想回去再选择一次？")
                }
                , function() {
                    return t.tv.say("尽快决定哟，我只能帮你回到那儿……")
                }
                , function() {
                    return t.samsara.show(function() {
                        t.loadAndNext(e.ree)
                    }, function() {
                        t.scene.then().at(0, 0)["with"](0, "none").create("black")
                    })
                }
            ],
            e.ree = [function() {
                return t.scene.then(function() {
                    return t.next()
                }).at(0, 0)["with"](300, "dissolve").create("home")
            }
                , function() {
                    return t.altair.posture("普通").face("腹黑").size("large").at(3, 0).from("left", 1).show(),
                        t.branches.maps()
                }
            ],
            e.te = [function() {
                return t.matchFriend()
            }
                , function() {
                    return t.altair.withShow().face("面瘫").say("那是什么表情，我可没有逼你跟着哦。")
                }
                , function() {
                    return t.altair.face("微笑").say("22的事我自己搞定就好。打扰了！")
                }
                , function() {
                    return t.branch.open([{
                        content: "请相信我，无论怎样结局都是……",
                        callback: function() {
                            return t.interpreter.next()
                        }
                    }, {
                        content: "请无视我，我说不定只会坏事……",
                        callback: function() {
                            return t.interpreter.next()
                        }
                    }])
                }
                , function() {
                    return t.altair.face("黑线").say("喂，都说了这是我自己的事……不用说些奇怪的话吧。")
                }
                , function() {
                    return t.altair.face("微笑").say("承蒙照顾，告辞咯。")
                }
                , function() {
                    return t.scene.toMode("NVL").at(0, 0)["with"](600, "fade").create("black")
                }
                , function() {
                    return t.girl.think("就这么放弃……真的好吗？")
                }
                , function() {
                    return t.girl.think("这样的话3322就只能……")
                }
                , function() {
                    return t.girl.think("但再选择出去了，也只是重蹈覆辙吧？")
                }
                , function() {
                    return t.girl.think("早知道如此，什么都不做也一样……")
                }
                , function() {
                    return t.girl.think("可恶……总觉得有点不甘心啊。")
                }
                , function() {
                    return t.branch.open([{
                        content: "追出门寻找33",
                        callback: function() {
                            return t.loadAndNext(e.te1)
                        }
                    }, {
                        content: "继续留在屋里",
                        callback: function() {
                            return t.loadAndNext(e.te2)
                        }
                    }])
                }
            ],
            e.te1 = [function() {
                return t.scene.toMode("ADV")["with"](800, "normal").create("street")
            }
                , function() {
                    return t.vega.withShow().posture("普通").face("脸红").at(3).from("right").say("那个，请问——")
                }
                , function() {
                    return t.vega.face("惊讶").say("咦——你知道我是22？……33！？你见过他了？")
                }
                , function() {
                    return t.vega.face("担心").say("我是被F^3追到这里的。33之前也在这儿的话，或许还没走远。")
                }
                , function() {
                    return t.vega.face("微笑").say("你……真的要和我一起去？在这个星球遇到很多好人呢。")
                }
                , function() {
                    return t.loadAndNext(e.te3)
                }
            ],
            e.te2 = [function() {
                return t.scene.toMode("ADV")["with"](800, "normal").create("home")
            }
                , function() {
                    return t.vega.withShow().posture("普通").face("紧张").at(3).from("left").say("你好——有人吗？")
                }
                , function() {
                    return t.vega.face("脸红").say("打扰了！我是22，我……在门口捡到了33的坠子。33来过这里吗？")
                }
                , function() {
                    return t.vega.face("惊讶").say("诶，33果然来过这里？他说了去哪吗？")
                }
                , function() {
                    return t.vega.face("担心").say("但是……好不容易摆脱F^3才找到这里……")
                }
                , function() {
                    return t.vega.face("微笑").say("嗯？你真的愿意帮我找33吗？谢谢……希望33还没碰到F^3们。")
                }
                , function() {
                    return t.loadAndNext(e.te3)
                }
            ],
            e.te3 = [function() {
                return t.scene["with"](800, "normal").create("street")
            }
                , function() {
                    return t.scene.at(-300, 0, !0).animate().show()
                }
                , function() {
                    var e = t.altair.withShow().size("middle").at(1).from("left").show()
                        , n = t.boy.withShow().at(-2).from("left").show();
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.exec(),
                                n.exec()
                        }
                    }
                }
                , function() {
                    return t.altair.face("惊讶").say("22！你原来也在这吗？这家伙不是之前的——")
                }
                , function() {
                    return t.boy.say("22！太好了，你没被F^3追到……")
                }
                , function() {
                    return t.scene.at(0, 0).animate().show()
                }
                , function() {
                    return t.branch.open([{
                        content: "问33：你怎么回来了？",
                        callback: function() {
                            return t.loadAndNext(e.te4)
                        }
                    }, {
                        content: "问陌生人：你又是……？",
                        callback: function() {
                            return t.loadAndNext(e.te4)
                        }
                    }])
                }
            ],
            e.te4 = [function() {
                return t.scene.at(-370, 0, !0).animate().show()
            }
                , function() {
                    return t.boy.say("其实……我原来和22在一起，但为了躲避F^3分开了。回头找她时遇到了33。")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("微笑").say("所以我们沿着22之前跑的方向找回了这里。")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("大笑").at(4).say("太好了！我还担心33会撞上F^3小电视呢，幸好能遇到你们~")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("还担心别人……竟然一个人乱跑！麻烦你们照顾这个家伙了。")
                }
                , function() {
                    return t.scene.at(-370, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.say("没什么啦。莫名其妙轮回这么多次，总算遇到了转机……")
                }
                , function() {
                    return t.boy.say("诶？？你说什么！？你也经历了类似的……所以你也见到了白色小电视？")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("白色小电视？？")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("白色小电视？？")
                }
                , function() {
                    return t.branch.open([{
                        content: "说起来，白色小电视的来历是？",
                        callback: function() {
                            return t.loadAndNext(e.te5)
                        }
                    }, {
                        content: "说起来，F^3小电视现在在哪？",
                        callback: function() {
                            return t.loadAndNext(e.te5)
                        }
                    }])
                }
            ],
            e.te5 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.fff.withShow().at(8, 0).from("right").say("哈哈哈，异乡伸来援手的陌生人和下落不明的侣伴，真是万金油的情节啊~")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("F^3小电视！找到这里来了么……")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("真是死缠烂打……这次不会让你们接近33了！")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("别生气嘛，我们可是被“那个人”派来考验你们俩的哟。对了，其实我就是……")
                }
                , function() {
                    return t.fff.opacity(0).at(8, -2).animate().say("魔·法·天——等等，串戏了orz……其实我还是——")
                }
                , function() {
                    var e = t.fff.hide()
                        , n = t.tv.withShow().at(8, 1).from("top").say("白色的！！嘿嘿，意不意外？");
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.exec(),
                                n.exec()
                        }
                    }
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("考验？所以这一切都只是……")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.tv.say("喂！这失望的表情是什么意思？这可是很严肃的考验！")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("微笑").say("仔细看的话，似乎把这些家伙煮了吃也不错呢。")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.tv.say("等，等等！我们可是还会黑化的哟！通过考验不是应该心怀感激吗！？")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("微笑").say("那么……大家都没事了？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("微笑").at(3).animate().say("嗯……终于……")
                }
                , function() {
                    return t.branch.open([{
                        content: "别擅自卷进其他人来啊！",
                        callback: function() {
                            return t.next()
                        }
                    }, {
                        content: "这是什么腹黑的考验啊！",
                        callback: function() {
                            return t.next()
                        }
                    }])
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.tv.say("嘿嘿，我有说这只是对2233的考验吗？")
                }
                , function() {
                    return t.loadAndNext(e.te6)
                }
            ];
        var n = 28
            , a = 24;
        e.te6 = [function() {
            return t.scene.then(function() {
                return t.next()
            }).scale(.5).at(-400, -180)["with"](1e3, "fade").create("galaxy")
        }
            , function() {
                return t.galaxy.show(function() {
                    return t.next()
                })
            }
            , function() {
                return t.text.then().from("bottom", 600, 12, .1).update([{
                    text: "小电视们不知不觉聚到2233身边\n为他们搭起了一座白色的桥",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "原案\nH光大小姐",
                    y: -24,
                    width: 192,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "那情景\n就像是梦里的景致一般",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "编剧\ncheng\n\n演出\nH光大小姐",
                    y: -24,
                    width: 192,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "我忽然发觉自己也和他们一样\n在寻找着什么寻找着某个人",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "美术\nero\nNyon\n\n设计\nApril",
                    y: -24,
                    width: 192,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "你会在哪呢……\n又过着什么样的生活",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "程序\nH光大小姐\n比利\n\n制作进行\n葵\nH光大小姐",
                    y: -24,
                    width: 240,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "无论你在这个世界上的什么地方\n我都一定会再去见你",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "出品\nb i l i b i l i",
                    y: -36,
                    width: 192,
                    height: 24,
                    size: 28,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.next()
                }).hide()
            }
            , function() {
                return "12540568" === t.config.user.id && "58698" === t.config.friend.id ? t.loadAndNext(e.tegz) : t.loadAndNext(e.te6d5)
            }
        ],
            e.te6d5 = [function() {
                return t.boy.withShow(!1).say("那个……我好像在哪里见过你。")
            }
                , function() {
                    return t.branch.open([{
                        content: "不会吧？",
                        callback: function() {
                            return t.loadAndNext(e.te7)
                        }
                    }, {
                        content: "我也是。",
                        callback: function() {
                            return t.loadAndNext(e.te8)
                        }
                    }])
                }
            ],
            e.tegz = [function() {
                return t.scene.toMode("NVL"),
                    t.boy.withShow(!1).say("那个……我好像在哪里见过你。")
            }
                , function() {
                    return t.girl.withShow(!1).say("是不是……有一种……在梦里，我们似乎……")
                }
                , function() {
                    return t.boy.say("是恋人吗？")
                }
                , function() {
                    return t.girl.say("你也有这种感觉？嗯，这阵子我一直在做一个梦，梦见我和一个男孩子在某个世界度过着二人的时光——")
                }
                , function() {
                    return t.girl.say("在那个世界里，我一开始称呼你为光光，你称呼我为……")
                }
                , function() {
                    return t.boy.rename("光光").say("朱朱？")
                }
                , function() {
                    return t.girl.rename("朱朱").say("果然呢！刚见到你的时候我还在疑惑——怎么会有这种巧合！")
                }
                , function() {
                    return t.boy.say("我也是啊！没想到真的能在这里见到你！")
                }
                , function() {
                    return t.girl.say("嗯……那个，既然如此，我们要不要……")
                }
                , function() {
                    return t.boy.say("嗯？要什么？")
                }
                , function() {
                    return t.girl.say("是不是应该……像在另一个世界中的5月30号那样，牵……牵……")
                }
                , function() {
                    return t.boy.say("咳咳……来。")
                }
                , function() {
                    return t.girl.say("笨，笨蛋！变态！你干嘛！")
                }
                , function() {
                    return t.boy.say("哼，明明是你要的！")
                }
                , function() {
                    return t.girl.say("我不管，变态！")
                }
                , function() {
                    return t.boy.say("疼疼疼，别打了（怎么和另一个世界的我们一模一样）……")
                }
                , function() {
                    return t.girl.say("小声嘀咕什么呢！不过……人生中第一次牵到妹子的手，感觉怎么样啊？")
                }
                , function() {
                    return t.boy.say("软软的……热热的……感觉很不错（扑通扑通）")
                }
                , function() {
                    return t.girl.say("是嘛，我也……嗯（扑通扑通）")
                }
                , function() {
                    return t.boy.say("祝我们在另一个世界，也能像现在这样幸福，并一直走到世界的尽头——")
                }
                , function() {
                    return t.girl.say("直到白头，努力到达那个由梦构成的箱庭之中。")
                }
                , function() {
                    return t.loadAndNext(e.tee)
                }
            ],
            e.te7 = [function() {
                return t.boy.say("也是……那时我们并不相识，简直就像是做了一个很长的梦。")
            }
                , function() {
                    return t.boy.say("不过~在这种日子东奔西跑，你该不会没有另一半吧？")
                }
                , function() {
                    return t.loadAndNext(e.te9)
                }
            ],
            e.te8 = [function() {
                return t.boy.say("你也有这种感觉？话说回来——")
            }
                , function() {
                    return t.boy.say("嘿嘿~在这种日子东奔西跑，该不会没有另一半吧~")
                }
                , function() {
                    return t.loadAndNext(e.te9)
                }
            ],
            e.te9 = [function() {
                return t.branch.open([{
                    content: "才不是没有，我只是不谈而已！",
                    callback: function() {
                        return t.next()
                    }
                }, {
                    content: "你才是！我只是比较热心罢了！",
                    callback: function() {
                        return t.next()
                    }
                }])
            }
                , function() {
                    return t.boy.say("是嘛~")
                }
                , function() {
                    return t.boy.say("嗯，我的名字是" + t.config.friend.name + "，你呢？")
                }
                , function() {
                    return t.branch.open([{
                        content: "诶？我？我叫" + t.config.user.name.substring(0, 8) + "……",
                        callback: function() {
                            return t.loadAndNext(e.te10)
                        }
                    }])
                }
            ],
            e.te10 = [function() {
                return t.boy.rename(t.config.friend.name).say("记下啦~或许，只是或许——我们还会遇见吧？")
            }
                , function() {
                    return t.loadAndNext(e.tee)
                }
            ],
            e.tee = [function() {
                return t.scene.hideDialog(),
                    t.galaxy.stars(function() {
                        return t.next()
                    })
            }
                , function() {
                    return t.comment.show(function(e) {
                        t.comment.close(function() {
                            t.galaxy.addStar(t.config.user.name, e, function() {
                                return t.config.comment = e,
                                    t.share.updateMessage(),
                                    t.next()
                            })
                        })
                    }, function() {
                        return t.share.updateMessage(),
                            t.next()
                    })
                }
                , function() {
                    return t.share.show(function() {
                        t.doShare()
                    }, function() {
                        t.sendLetter()
                    }, function() {
                        t.restart()
                    }, function() {
                        t.jumpMovie()
                    }),
                        t.galaxy.preWatch(),
                        "pc" === GAL.config.plat ? (t.galaxy.watch(),
                            void t.branch.close()) : t.branch.open([{
                            content: "抬头仰望星空",
                            callback: function() {
                                var e = t.galaxy.getOrientation()
                                    , n = (e.alpha,
                                    e.beta)
                                    , a = e.gamma;
                                return t.config.isIos && !t.config.isQQ && t.checkAngle(n, 45) && t.checkAngle(a, 180) ? (alert("现在可以观测啦，原地转圈或上下摆动手机可调整视角，双指可进行缩放~"),
                                    t.galaxy.watch(),
                                    t.branch.close()) : t.checkAngle(n, 135) && t.checkAngle(a, 0) ? (alert("现在可以观测啦，原地转圈或上下摆动手机可调整视角，双指可进行缩放~"),
                                    t.galaxy.watch(),
                                    t.branch.close()) : void alert("仰望星空需要调整姿势哦，请将手机保持竖屏，HOME键向下，举过头顶调整到合适角度，用其背面对向天空~")
                            }
                        }], !1)
                }
            ]
    }(e = t.g || (t.g = {}))
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        e.intro = [function() {
            return t.scene["with"](600, "fade").then(function() {
                return t.next()
            }).toMode("NVL").at(370).create("home")
        }
            , function() {
                return t.girl.think("好困（￣O￣)~……欸欸欸，不会又一觉睡到下午了吧？")
            }
            , function() {
                return t.girl.think("……仔细想起来，好像又到那个不怀好意的节日了？")
            }
            , function() {
                return t.girl.think("……决定了！为了庆祝七夕，一整天宅在屋里都愉快地刷手机吧！")
            }
            , function() {
                return t.branch.open([{
                    content: "点开手机里的“bilibili”",
                    callback: function() {
                        t.interpreter.next()
                    }
                }, {
                    content: "点开手机里的“相亲APP”",
                    callback: function() {
                        t.interpreter.load([function() {
                            return t.girl.think("系统公告：因开发者失恋，本应用即日起进入不限期停服状态，建议您使用其他大型多人在线分区跨性别交友平台。")
                        }
                            , function() {
                                return t.branch.open([{
                                    content: "跳转至“bilibili”",
                                    callback: function() {
                                        t.interpreter.next()
                                    }
                                }])
                            }
                        ])
                    }
                }])
            }
            , function() {
                return t.girl.think("今天的首页是……诶？《你的名字。》电影上线了！？")
            }
            , function() {
                return t.girl.think("哼，隐约感受到恶意啊——等等，似乎还有个GALGAME？")
            }
            , function() {
                return t.girl.think("“你独自在七夕将至的日子醒来，默默打开手机打发时间……”")
            }
            , function() {
                return t.girl.think("“你点开一个不怀好意的活动，正想摔手机，忽然注意到房中出现了一个陌生人……”")
            }
            , function() {
                return t.girl.think("——这都是什么鬼嘛！")
            }
            , function() {
                return t.branch.open([{
                    content: "感到恶意，生气地摔下手机",
                    callback: function() {
                        t.scene["with"]().toMode("ADV"),
                            t.interpreter.next()
                    }
                }, {
                    content: "受到感召，决定出门装现充",
                    callback: function() {
                        t.scene["with"]().toMode("ADV"),
                            t.interpreter.next()
                    }
                }])
            }
            , function() {
                return t.altair.withShow(!1).say("喂……这是什么地方？")
            }
            , function() {
                return t.girl.say("嗯？似乎有什么声音，而且似乎是个可爱的男孩子？")
            }
            , function() {
                return t.girl.say("不不不，怎么可能，一定是错觉，不过我居然已经寂寞到这种程度了吗...")
            }
            , function() {
                return t.girl.think("忽然有些心痛。")
            }
            , function() {
                return t.altair.say("不是错觉，背后。")
            }
            , function() {
                return t.girl.think("背后？")
            }
            , function() {
                return t.scene.then(function() {
                    return t.interpreter.next()
                }).at(-370).animate(800).show()
            }
            , function() {
                return t.altair.withShow().posture("普通").face("紧张").size("large").from("left").at(3).show()
            }
            , function() {
                return t.girl.say("哇！")
            }
            , function() {
                return t.altair.size("middle").face("面瘫").say("吓到你了么？胆小的家伙呢——不过我也不清楚自己怎么到的这儿。")
            }
            , function() {
                return t.altair.face("微笑").say("初次见面，我是33，来自哔哩哔哩星球。那儿是我和22的故乡。")
            }
            , function() {
                return t.altair.face("生气").say("几天前，一群叫“F^3”的小电视生物忽然出现，开始抓走哔哩哔哩星的情侣。")
            }
            , function() {
                return t.altair.face("生气").say("22和我逃了出来，但路过这个星球时被F^3伏击了。")
            }
            , function() {
                return t.altair.face("紧张").say("我们在躲避时走散了……但我能感觉到22就在这附近。")
            }
            , function() {
                return t.altair.face("腹黑").say("怎么样——要不要做我的向导？拖后腿的那种可不行哦。")
            }
            , function() {
                return t.girl.think("诶诶诶，这设定是什么情况？")
            }
            , function() {
                return t.girl.think("不过反正也没什么事做，这么帅气的男孩子让我怎么……")
            }
            , function() {
                return t.girl.think("我想想，确实有几个地方可以去看看——")
            }
            , t.branches.maps]
    }(e = t.g || (t.g = {}))
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        var n = t.mapCoords.map1
            , a = n.gate
            , r = n.rc
            , i = n.tent
            , o = n.ice
            , c = n.fw
            , s = n.scale;
        e.map1 = [function() {
            return t.scene.then(function() {
                return t.interpreter.next()
            }).scale(s).at(a[0], a[1])["with"]().create("ap")
        }
            , function() {
                return t.girl.say("游乐园人比较多，33在的概率也比较大。")
            }
            , function() {
                return t.altair.withShow().posture("普通").face("微笑").size("middle").from("right").at(3).say("有那么些道理，那就从这开始吧。")
            }
            , function() {
                return t.fff.withShow().size("exSmall").at(-3, 3).say("嘿嘿嘿，虽然是被派来搜人的，但这个叫“游乐场”的地方意外地适合度假呢……")
            }
            , function() {
                return t.scene.at(-400, 0, !0).animate().show()
            }
            , function() {
                return t.fff.say("那么从哪开始玩，咳，找起呢？")
            }
            , function() {
                return t.scene.at(0, 0, !0).animate().show()
            }
            , function() {
                return t.altair.face("惊讶").size("large").say("F^3小电视！可恶……竟然一来就看到这群怪物。")
            }
            , function() {
                return t.altair.face("面瘫").say("嘁——先离开这里？不过要是22那个笨蛋在这儿……")
            }
            , function() {
                return t.branch.open([{
                    content: "还是趁没被发现躲开它们吧",
                    callback: function() {
                        t.fff.at(0, 0),
                            t.loadAndNext(e.b1, 0, 1)
                    }
                }, {
                    content: "偷偷跟着，可能有22的线索",
                    callback: function() {
                        t.fff.at(0, 0).hide(),
                            t.loadAndNext(e.b2, 0, 2)
                    }
                }])
            }
        ],
            e.b1 = [function() {
                return t.altair.size("middle").face("面瘫").say("哼，要不是这些怪物成群结队的，22又下落不明……")
            }
                , function() {
                    return t.altair.face("生气").say("真是从不让人省心的女人。")
                }
                , function() {
                    return t.altair.face("腹黑").say("嗯？看你的表情……不会还没有对象吧？")
                }
                , function() {
                    return t.altair.face("微笑").say("好啦好啦，开玩笑嘿嘿。我们现在去哪儿？")
                }
                , function() {
                    return t.branch.open([{
                        content: "直接从大门折返吧",
                        callback: function() {
                            return t.loadAndNext(e.b3, 1, 1)
                        }
                    }, {
                        content: "混进那边的队伍吧",
                        callback: function() {
                            return t.loadAndNext(e.b4, 1, 2)
                        }
                    }])
                }
            ],
            e.b2 = [function() {
                return t.altair.face("微笑").say("嘿——不错哦，你也是个大胆的家伙呢。")
            }
                , function() {
                    return t.altair.face("腹黑").say("说不定能碰上落单的F^3，哼哼。先跟着这几个……")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("small").at(-3, 1).from("left").say("诶嘿嘿～有忽然到了桃源的感觉，能玩的去处太多也让人困扰啊。")
                }
                , function() {
                    return t.altair.face("黑线").say("不过这些家伙根本就是来游玩的吧，完全忘了我和22啊。")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("这是——雪糕！？是传说中的那个梦幻食物吗？")
                }
                , function() {
                    return t.fff.say("D组负责去弄一打回来~一会和我们在前面那个帐篷汇合！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("……贪玩并且贪吃，毫无气势的反派啊。我们去哪边？")
                }
                , function() {
                    return t.branch.open([{
                        content: "不管买雪糕的，跟到帐篷里去",
                        callback: function() {
                            return t.loadAndNext(e.b15, 1, 1)
                        }
                    }, {
                        content: "雪糕站应该安全些，跟过去吧",
                        callback: function() {
                            return t.loadAndNext(e.b16, 1, 2)
                        }
                    }])
                }
            ],
            e.b3 = [function() {
                return t.scene.clear().at(a[0] + 100, a[1] - 100).animate().show()
            }
                , function() {
                    return t.fff.withShow(!1).say("让我们补票？开什么玩笑！我生起气来连大门都烧哦！！")
                }
                , function() {
                    return t.scene.clear().at(350, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("middle").from("right").at(7).withShow().say("那边两个家伙明明也没有拿着票啊！——咦，这不是33嘛！？")
                }
                , function() {
                    return t.fff.say("哈哈哈竟然大摇大摆地从门口出来，你们都不玩潜行游戏的吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("紧张").at(2).from("left").say("该死……门口居然已经被这些家伙堵住了。")
                }
                , function() {
                    return t.altair.face("生气").say("这地方到底塞了多少F^3啊！！")
                }
                , function() {
                    return t.branch.open([{
                        content: "向周围人群呼救！",
                        callback: function() {
                            return t.loadAndNext(e.b6, 2, 1)
                        }
                    }, {
                        content: "大声呼叫保安员！",
                        callback: function() {
                            return t.loadAndNext(e.b6, 2, 2)
                        }
                    }])
                }
            ],
            e.b4 = [function() {
                return t.scene.clear().at(r[0], r[1]).animate().show()
            }
                , function() {
                    return t.altair.face("疑惑").from("left").at(3).say("喂，看起来排进了奇怪的队伍啊，这些家伙在兴奋什么？")
                }
                , function() {
                    return t.altair.size("large").face("紧张").say("过山车？？……就是刚才那个从头顶飞过去的自杀轨道车吗？")
                }
                , function() {
                    return t.girl.say("我在这排着，你可以去前边先看看。")
                }
                , function() {
                    return t.altair.face("面瘫").say("……")
                }
                , function() {
                    return t.altair.size("middle").at(2, 1).animate().show()
                }
                , function() {
                    return t.altair.size("small").at(4, 2).animate().show()
                }
                , function() {
                    return t.altair.face("激动").size("middle").at(3, 0).animate().say("开什么玩笑！我可不想躲过F^3却在这种东西上送命。")
                }
                , function() {
                    return t.branch.open([{
                        content: "回头会可疑，硬着头皮上",
                        callback: function() {
                            return t.loadAndNext(e.b9, 2, 1)
                        }
                    }, {
                        content: "躲在发车的地方见机行事",
                        callback: function() {
                            return t.loadAndNext(e.b10, 2, 2)
                        }
                    }])
                }
            ],
            e.b6 = [function() {
                return t.scene.clear().at(-300, 0, !0).animate().show()
            }
                , function() {
                    return t.fff.size("small").from("left").at(-1, 3).say("哟嗬～请游客们不要喧哗或者推搡哟，我们是文明园区哟——")
                }
                , function() {
                    return t.fff.say("啊嘞？这不是33吗！？真有效率啊伙伴们~逮到目标了也不告诉我！")
                }
                , function() {
                    return t.fff.say("……闭嘴！真是不想承认认识你啊。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("喂喂喂！为什么连这个地方的工作人员都是你们！？")
                }
                , function() {
                    return t.scene.at(-300, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("middle").at(-1, 0).say("啊，那个，其实是因为刚好看到招工启示，最近又有点窘迫……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("我和22竟然是被这些可悲的生物追着无家可归……")
                }
                , function() {
                    return t.branch.open([{
                        content: "提出资助F^3们来换取自由",
                        callback: function() {
                            return t.loadAndNext(e.b8, 3, 1)
                        }
                    }, {
                        content: "威胁举报F^3保安骚扰游客",
                        callback: function() {
                            return t.loadAndNext(e.b8, 3, 2)
                        }
                    }])
                }
            ],
            e.b8 = [function() {
                return t.scene.at(-300, 0, !0).animate().show()
            }
                , function() {
                    return t.fff.say("你这家伙……不要看不起反派啊！我可是有梦想的打工仔！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.at(2).animate().say("闭嘴！！回去就把你从组织开除——把33带走！")
                }
                , function() {
                    return t.altair.face("激动").say("滚开！——别碰我，你们这群寒酸龌龊的黑麻薯！")
                }
                , function() {
                    return t.fff.say("嘴硬吧嘿嘿，只要再找到22……都说了我们是反派！不要再提补门票了！！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b9 = [function() {
                return t.scene.at(0, 0)["with"](800, "fade").create("black")
            }
                , function() {
                    return t.altair.withShow(!1).say("停、停下！啊啊啊啊啊啊啊啊啊啊！！")
                }
                , function() {
                    return t.scene.at(r[0], r[1])["with"](800, "fade").create("ap")
                }
                , function() {
                    return t.altair.withShow().size("large").face("面瘫").say("哼……无聊的游戏，一群弱——")
                }
                , function() {
                    return t.altair.size("middle").face("黑线").say("呕！！嘁，我竟然会被这种唬人的设施弄吐……呕！")
                }
                , function() {
                    return t.fff.size("small").at(-3).from("left").say("呕！！！可恶……明明已经是第二次下来了……呕！")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("喂，喂，这不是33吗！呕……真是蠢啊，竟敢跑来坐这个……呕！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3！什么时候……呕！——这几个家伙难道也在车上。")
                }
                , function() {
                    return t.altair.size("large").face("黑线").say("听着……我这样已经逃不了了，请你找到22并帮助她——快跑！")
                }
                , function() {
                    return t.branch.open([{
                        content: "冷静下来，先留下33独自逃离",
                        callback: function() {
                            return t.loadAndNext(e.b11, 3, 1)
                        }
                    }, {
                        content: "坚持留下，趁对方虚弱一决高下",
                        callback: function() {
                            return t.loadAndNext(e.b12, 3, 2)
                        }
                    }])
                }
            ],
            e.b10 = [function() {
                return t.altair.size("middle").face("紧张").say("虽然没有上去送死……不过呆在这里也很危险。")
            }
                , function() {
                    return t.altair.face("惊讶").say("上一班过山车停下来了——等等，那几个身影是！？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("small").at(-3, 0).from("left").say("呕……为什么游乐场会有这种可怕的设施……这星球住的都是怪物吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("large").face("面瘫").say("是几个不知死活的F^3小电视——需要对付它们吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "混入离场的人群走回去",
                        callback: function() {
                            return t.loadAndNext(e.b13, 3, 1)
                        }
                    }, {
                        content: "干脆趁机拷问22的消息",
                        callback: function() {
                            return t.loadAndNext(e.b14, 3, 2)
                        }
                    }])
                }
            ],
            e.b11 = [function() {
                return t.fff.size("middle").at(2).animate().say("哈哈哈，果然还是只会考虑自己啊~")
            }
                , function() {
                    return t.altair.size("middle").face("激动").say("放开我！你们这些纵火犯！别以为22也会被你们……")
                }
                , function() {
                    return t.fff.say("嗯？22小姐已经在接受我们的款待了哟，虽然你们是见不到了哈哈~")
                }
                , function() {
                    return t.altair.face("惊讶").say("什么，22已经——哼！满口胡言！！")
                }
                , function() {
                    return t.fff.say("嘴犟的家伙呢，乖乖接受现实和我们走不就好了~呕……")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b12 = [function() {
                return t.scene.at(-400, 0, !0).animate().show()
            }
                , function() {
                    return t.fff.size("middle").say("一脸菜色还想着反抗吗，好好看看周围……呕！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("middle").face("黑线").say("恐怕它是对的……就算搞定它们，现在的我也难以躲开外面那些F^3。")
                }
                , function() {
                    return t.fff.at(2).animate().say("哈哈一早放弃不就好了，枉费我们派出那么多人手~把他带走！")
                }
                , function() {
                    return t.altair.face("激动").say("给我退下！别以为我会就这么……放开我！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b13 = [function() {
                return t.altair.face("生气").say("哼！如果不是外面还有其他F^3……总之先想办法离开这儿。")
            }
                , function() {
                    return t.scene.clear().at(r[0] - 200, r[1] + 100).animate().show()
                }
                , function() {
                    return t.fff.size("middle").from("left").at(0).say("嘻嘻～C组的那群白痴说这是最恐怖的项目，真是我团的耻辱——")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).show()
                }
                , function() {
                    return t.fff.say("别挤啊！下一班过山车被我们F^3承包了嘿嘿。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).show()
                }
                , function() {
                    return t.altair.face("紧张").say("新来的F^3？竟然来了更多……")
                }
                , function() {
                    return t.fff.at(3).animate().say("咦？这不是33么哈哈哈，是不是也想加入我们？")
                }
                , function() {
                    return t.altair.face("激动").say("你们……放手！仗着人多算什么！滚开！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b14 = [function() {
                return t.scene.at(-400, 0, !0).show()
            }
                , function() {
                    return t.fff.size("middle").say("呕……33！？竟然就这么自己——伙计们！33在这儿！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).show()
                }
                , function() {
                    return t.altair.face("惊讶").say("什么，另一边竟然还埋伏了其他F^3？是陷阱吗……")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).show()
                }
                , function() {
                    return t.fff.at(3).animate().say("咳！我们可不是不敢上车才蹲在一旁哟~既然送上门来嘿嘿……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).show()
                }
                , function() {
                    return t.altair.face("激动").say("住手！你们这些纵火犯，放开我！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b15 = [function() {
                return t.scene.clear().at(i[0], i[1]).animate(800).show()
            }
                , function() {
                    return t.altair.face("面瘫").say("这些F^3闯进这个黑乎乎的地方做什么……")
                }
                , function() {
                    return t.altair.face("惊讶").say("这海报是——“今日特别剧目”？这里还有个剧场吗。")
                }
                , function() {
                    return t.altair.face("疑惑").say("哼，我才不信这些单细胞的F^3会有兴致看剧。")
                }
                , function() {
                    return t.branch.open([{
                        content: "调查清楚，靠近台前观察吧",
                        callback: function() {
                            return t.loadAndNext(e.b20, 2, 1)
                        }
                    }, {
                        content: "有点可疑，混在后排人群里",
                        callback: function() {
                            return t.loadAndNext(e.b20, 2, 2)
                        }
                    }])
                }
            ],
            e.b16 = [function() {
                return t.scene.clear().at(o[0], o[1]).animate(800).show()
            }
                , function() {
                    return t.altair.face("惊讶").from("left").at(3).say("这些家伙竟然老老实实排了队？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("small").at(9).from("right").say("哟，老板～我们是代表宇宙和平的F^3萌团，可以募捐一打雪糕吗？")
                }
                , function() {
                    return t.fff.say("我们的团员生了奇怪的病，要吃雪糕才能下床≖‿≖✧")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("果然……这些家伙。")
                }
                , function() {
                    return t.altair.face("生气").say("喂，喂，老板乐呵呵地答应了啊，也太淳朴了点吧！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("诶嘿～谢谢老板！来一打蒜蓉味儿的！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("——越来越让人听不下去了啊！这到底是什么奇怪的雪糕站！！")
                }
                , function() {
                    return t.branch.open([{
                        content: "别为无聊的事暴露自己！",
                        callback: function() {
                            return t.loadAndNext(e.b17, 2, 1)
                        }
                    }, {
                        content: "有必要叫上保安肃清它们",
                        callback: function() {
                            return t.loadAndNext(e.b6, 2, 2)
                        }
                    }])
                }
            ],
            e.b17 = [function() {
                return t.altair.face("生气").say("……嘁。暂且饶过这些异端。")
            }
                , function() {
                    return t.altair.face("疑惑").say("咦，好像没有打算回头去之前的帐篷？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("听说这是情侣的人气地点？嘻嘻，真是个臭气熏天的地方～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("不会有什么鬼吧，F^3直接坐上到摩天轮了？")
                }
                , function() {
                    return t.branch.open([{
                        content: "大概只是在顾自游玩而已",
                        callback: function() {
                            return t.loadAndNext(e.b19, 3, 1)
                        }
                    }, {
                        content: "这些F^3或许有什么阴谋",
                        callback: function() {
                            return t.loadAndNext(e.b19, 3, 2)
                        }
                    }])
                }
            ],
            e.b19 = [function() {
                return t.scene.clear().at(c[0], c[1]).animate(800).show()
            }
                , function() {
                    return t.altair.face("紧张").at(3).from("right").say("还是放心不下坐了上来啊。这个距离真的不会被看到？")
                }
                , function() {
                    return t.altair.face("黑线").say("22那个不讲道理的家伙，要是看到我和其他人在这大概会赌气吧。")
                }
                , function() {
                    return t.altair.face("伤心").say("不过一路都没有发现她的痕迹……应该是好消息还是坏消息？")
                }
                , function() {
                    return t.fff.size("middle").at(-3, 0).from("left").say("哈哈哈，想要22的消息可以向我们打听哦~")
                }
                , function() {
                    return t.altair.face("惊讶").say("这群F^3！？什么时候发现我们了吗？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("有一个坏消息哟，摩天轮已经停下来啦！你跑不掉了嘿嘿。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("紧张").say("糟糕，只放松了一会就……")
                }
                , function() {
                    return t.fff.at(1).animate().say("好消息是，我们会把你救出来的～所以不用费心呼救了哈哈哈——")
                }
                , function() {
                    return t.altair.face("激动").say("你们想做什么——走开！你们这群黑洞怪！！ ")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b20 = [function() {
                return t.altair.size("middle").face("微笑").say("嗯？要开始了。还煞有介事地打起了光呢——")
            }
                , function() {
                    return t.altair.face("腹黑").say("别是什么少儿不宜的剧目吧……")
                }
                , function() {
                    return t.boy.say("锵锵～LADIES AND GENTLEMEN！今天的特别演出即将开场！")
                }
                , function() {
                    return t.boy.say("今天带来表演的嘉宾来自一个遥远的星球，倾诉着她对爱人的预示。")
                }
                , function() {
                    return t.altair.face("伤心").say("不会这么巧吧……")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.say("（小声）快，就现在！唉……总觉得不该陪你演这出……")
                }
                , function() {
                    return t.vega.withShow().posture("普通").face("微笑").at(-3).from("left").size("exSmall").say("这狂暴的快乐，预示着狂暴的结局；正如火药和亲吻，在最欢愉的刹那烟消云散——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("那是……22！她为什么出现在台上？")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("small").face("伤心").say("告诉我，你怎么会到这儿来？要是我家里的人瞧见你在这儿，他们一定不让你活命——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("这笨蛋……快下来！F^3一定也在这！")
                }
                , function() {
                    return t.branch.open([{
                        content: "别管她！肯定是陷阱",
                        callback: function() {
                            return t.loadAndNext(e.b33, 3, 1)
                        }
                    }, {
                        content: "让她下来！F^3也在",
                        callback: function() {
                            return t.loadAndNext(e.b23, 3, 2)
                        }
                    }])
                }
            ],
            e.b23 = [function() {
                return t.altair.face("激动").say("22！这儿有F^3小电视！快下去！！")
            }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("黑线").say("这个榆木脑袋——小心！！它们在你背后啊！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("middle").at(9, 0).from("right").say("哈哈哈，两个人都自己跳了出来，真是happy ending啊～")
                }
                , function() {
                    return t.fff.say("各自临危又互相拯救，为什么这么感人55555——")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("33是个笨蛋！刚才直接跑还来得及的！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("鬼才听得懂嘞！……放开22，你们这群脏兮兮的海苔卷！！")
                }
                , function() {
                    return t.fff.at(0).animate().say("555太感人了——快！两个都带走！5555……")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b33 = [function() {
                return t.altair.face("生气").say("事到如今……怎么能让她一个人傻站着！")
            }
                , function() {
                    return t.altair.face("生气").say("虽然不明白22在做什么，我必须阻止她！")
                }
                , function() {
                    return t.loadAndNext(e.b23)
                }
            ]
    }(e = t.g || (t.g = {}))
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        var n = t.mapCoords.map2
            , a = n.gate
            , r = n.love
            , i = n.peace
            , o = n.reception
            , c = n.anteroom;
        e.map2 = [function() {
            return t.scene.then(function() {
                return t.interpreter.next()
            }).at(a[0], a[1])["with"]().create("ilidilid")
        }
            , function() {
                return t.girl.say("找起来应该能方便点吧...")
            }
            , function() {
                return t.girl.say("这边同好比较多，也算是个死宅能说上话的地方。")
            }
            , function() {
                return t.altair.withShow().posture("普通").face("微笑").size("middle").from("right").at(3).say("嗯？有道理。")
            }
            , function() {
                return t.altair.say("看起来似乎确实是个不错的地方。")
            }
            , function() {
                return t.altair.face("面瘫").say("不过我可没时间游玩了——这里会有可以帮忙的家伙吗？")
            }
            , function() {
                return t.scene.clear().at(o[0], o[1]).animate().show()
            }
            , function() {
                return t.scene.at(-500, 0, !0).animate().show()
            }
            , function() {
                var e = t.six.rename("66 & 99").withShow().at(-5).from("left").show()
                    , n = t.nine.withShow().at(-1).from("left").show();
                return {
                    check: function() {
                        return e.check() && n.check()
                    },
                    exec: function() {
                        e.exec(),
                            n.exec()
                    }
                }
            }
            , function() {
                return t.six.say("欢迎！这里是ilidilid总部~有什么我们可以为您做的吗？")
            }
            , function() {
                return t.six.rename("66"),
                    t.scene.at(0, 0, !0).animate().show()
            }
            , function() {
                return t.altair.face("腹黑").say("既然这么问了……不如帮我把F^3小电视都送进黑洞？")
            }
            , function() {
                return t.branch.open([{
                    content: "先在这打听消息吧",
                    callback: function() {
                        return t.loadAndNext(e.c1, 0, 1, 5)
                    }
                }, {
                    content: "寻找帮手比较实际",
                    callback: function() {
                        return t.loadAndNext(e.c2, 0, 2, 5)
                    }
                }])
            }
        ],
            e.c1 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("哟嗬~我叫66，是ilidilid总部的八卦部长兼接待员！两位有什么需要问询的么？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("面瘫").say("开玩笑吧，这是真实的职务吗……什么消息都能打听到？")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("嘿嘿~不管是天气预报还是都市传说，不管是99的三围尺寸还是……")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.nine.say("啊哈哈哈哈总之什么都可以就是了！！请不用反复确认，尽管问他就好！！")
                }
                , function() {
                    return t.branch.open([{
                        content: "我们在寻找一个叫22的人……",
                        callback: function() {
                            return t.loadAndNext(e.c3, 1, 1, 5)
                        }
                    }, {
                        content: "有关于F^3小电视的情报吗？",
                        callback: function() {
                            return t.loadAndNext(e.c4, 1, 2, 5)
                        }
                    }])
                }
            ],
            e.c2 = [function() {
                return t.scene.at(-400, 0, !0).animate().show()
            }
                , function() {
                    return t.nine.say("可以提供帮助的人——忽然这么问起来，一时半会也说不上谁呢。")
                }
                , function() {
                    return t.nine.say("那个方向就是我们的公共休息室，试着问问房间里面的人吧~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("不是很可靠的样子……这里真会有厉害的家伙吗。")
                }
                , function() {
                    return t.altair.face("疑惑").say("而且——有两扇门？我们应该选哪个房间。")
                }
                , function() {
                    return t.branch.open([{
                        content: "门牌写着“LOVE”的房间",
                        callback: function() {
                            return t.loadAndNext(e.c13, 1, 1, 5)
                        }
                    }, {
                        content: "门牌写着”PEACE”的房间",
                        callback: function() {
                            return t.loadAndNext(e.c14, 1, 2, 5)
                        }
                    }])
                }
            ],
            e.c3 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("诶，是叫22吧？真是奇怪，刚有其他人来问关于她的事。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("咦？22和我都是第一次来这个星球，该不会是F^3那些家伙……")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("对方看起来也挺着急的样子呢。22听起来是个很受欢迎的女孩哟~")
                }
                , function() {
                    return t.six.say("对了，那人还没有离开哦。两位要去接待室见一见TA吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("large").face("疑惑").say("如何，去不去看看？")
                }
                , function() {
                    return t.branch.open([{
                        content: "不能错过机会，去见一面",
                        callback: function() {
                            return t.loadAndNext(e.c5, 2, 1, 5)
                        }
                    }, {
                        content: "很可能是F^3，躲过它们",
                        callback: function() {
                            return t.loadAndNext(e.c6, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c4 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("啊！你是说那些黑乎乎圆滚滚又特别有礼貌的小家伙么~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("小……家伙？你那语气是在逗我吗。")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("咦，一上来就送了我火把做见面礼呢，难道不是很可爱嘛！")
                }
                , function() {
                    return t.six.say("还因为长得太萌被逐出自己的星球，流落到这儿——太过分了！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("large").face("黑线").say("喂！这种厚脸皮的故事就不要买账了吧！！")
                }
                , function() {
                    return t.altair.face("生气").say("可恶——F^3竟然已经来过这里了，这家伙还被骗得团团转。")
                }
                , function() {
                    return t.branch.open([{
                        content: "不能让它们得逞，必须拆穿谎话",
                        callback: function() {
                            return t.loadAndNext(e.c9, 2, 1, 5)
                        }
                    }, {
                        content: "66似乎很喜欢它们，先打听下去",
                        callback: function() {
                            return t.loadAndNext(e.c10, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c5 = [function() {
                return t.scene.clear().at(c[0], c[1]).animate().show()
            }
                , function() {
                    return t.altair.size("middle").face("面瘫").at(3).from("right").say("哼……不是F^3，你为什么打听22的事？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.withShow().size("small").at(8).from("right").say("……你们是？22的朋友吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("回答我的问题！你怎么会认识她？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.size("middle").say("啊！！！你一定是33吧？22也在找你！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("你……还知道我？22现在人呢？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.say("其实——22在找你时被F^3带走了，我是……我是来这里求助的。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("large").face("伤心").say("怎么会！那个笨蛋又自己瞎闯了吗？")
                }
                , function() {
                    return t.altair.size("middle").face("激动").say("不行，绝不能让F^3就这么得逞，现在就去追他们！！")
                }
                , function() {
                    return t.branch.open([{
                        content: "阻止33，这样只是自投罗网",
                        callback: function() {
                            return t.loadAndNext(e.c7, 3, 1, 5)
                        }
                    }, {
                        content: "说不定还能找回22，一起去",
                        callback: function() {
                            return t.loadAndNext(e.c8, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c6 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("从刚才起就听到你们提到F^3呢——你们也认识这些好玩的家伙？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("疑惑").say("好玩？？？你见到的大概是假的F^3……")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("它们早些时候也来找人，说因为朋友间的误会和2233走散了？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("开什么玩笑！谁会和这群罪魁祸首有什么误会啊！！")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("咦，它们明明很有礼貌，还给带了许多火把做礼物，特别有意思呢~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("large").face("生气").say("这个笨蛋完全被F^3圈粉了……该怎么和他说？")
                }
                , function() {
                    return t.branch.open([{
                        content: "你被F^3耍得团团转，醒醒吧！",
                        callback: function() {
                            return t.loadAndNext(e.c11, 3, 1, 5)
                        }
                    }, {
                        content: "算是事实吧，请帮我们一个忙！",
                        callback: function() {
                            return t.loadAndNext(e.c12, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c7 = [function() {
                return t.scene.at(400, 0, !0).animate().show()
            }
                , function() {
                    return t.boy.say("没错，请你冷静一点。F^3或许就在等着你自己出现。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("伤心").say("我明白。但恐怕没有其他选项——我是不可能丢下22的。")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.say("唉，固执起来很相像呢。一起去吧，虽然帮不上什么……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.loadAndNext(e.c8)
                }
            ],
            e.c8 = [function() {
                return t.altair.size("middle").face("微笑").say("谢谢！你们其实不用做到这个份上，我和22……")
            }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(-2).from("left").say("嘿嘿，不顺便感谢我们吗？我们可是一直都关心着你和22哦——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3小电视！！你们怎么找到这来的？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("多亏了66小哥哟~一听是老朋友就高兴地告诉我们你在哪了哈哈。")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.boy.say("那家伙……真是越帮越忙。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("你们这些扯谎怪！把22放出来！！")
                }
                , function() {
                    return t.fff.at(2).animate().say("别急嘛，22也在等你哟，老实跟我们走吧~")
                }
                , function() {
                    return t.altair.face("激动").say("放开我！你们要是敢把22——滚开！ ")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c9 = [function() {
                return t.altair.size("middle").face("面瘫").say("你听好了！F^3是一路追捕我和22的邪恶生物，半句话都不能信。")
            }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("说起来，它们也提到22了哟。一直都担心着四处到处找你们呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("无可救药……")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("听说你们和F^3发生了什么误会？不要赌气嘛，一起坦诚地解决问题吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("啊啊啊——我放弃！你和这个笨蛋说吧。")
                }
                , function() {
                    return t.branch.open([{
                        content: "你被F^3耍得团团转，醒醒吧！",
                        callback: function() {
                            return t.loadAndNext(e.c11, 3, 1, 5)
                        }
                    }, {
                        content: "就算是事实吧，请帮我们一个忙",
                        callback: function() {
                            return t.loadAndNext(e.c12, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c10 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("嗯？你们在找它们吗，F^3小电视刚才还在的说……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("紧张").say("不用！我和22还是不要和它们见面的好。")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("啊~它们也有提到22哦。嘿嘿，是不是你俩惹F^3们生气啦？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("large").face("黑线").say("这个家伙根本已经加入F^3了吧……")
                }
                , function() {
                    return t.altair.face("疑惑").say("我们还需要和他解释下去吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "其实F^3是拆散情侣的邪恶生物",
                        callback: function() {
                            return t.loadAndNext(e.c11, 3, 1, 5)
                        }
                    }, {
                        content: "33和22因为误会要暂时躲着F^3",
                        callback: function() {
                            return t.loadAndNext(e.c12, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c11 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("抱歉，在无法看到证据的情况下，我也无法轻易赞同你们哦。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("middle").face("黑线").say("某种角度来讲，这家伙比F^3小电视还让人绝望啊……")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("不过先不聊F^3，我可以带你们参观一下总部哦~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("面瘫").say("够了！不能再浪费时间了……我们直接去找22吧。")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("哈哈哈，这不是33么，才这么会儿就要离开ilidilid总部了？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("你们……从什么时候起等在门口的！？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哪里哪里，我们也是来和66聊天的哟，真是可爱的男孩子~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("你们这些扯谎怪！到底想搞什么鬼？")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘿嘿，现在也不需要了。你不是都自己送上门来了吗——")
                }
                , function() {
                    return t.altair.face("激动").say("走开！！谎话连篇的煤球怪！！别碰我！！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c12 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("嗯？因为那个误会和F^3闹翻而且要找到22？我明白了……请稍等~")
                }
                , function() {
                    return t.six.from("right").hide()
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("middle").face("疑惑").say("诶？这就走了？？这家伙……")
                }
                , function() {
                    return t.scene.at(600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.at(8).from("right").say("哟嗬~久等啦，误会的事就包在我身上吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("你……不会擅作主张干了什么——")
                }
                , function() {
                    return t.scene.at(600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("之前F^3们把联系方式留给我了哦，我已经把它们叫来啦！")
                }
                , function() {
                    return t.fff.withShow().at(11).say("嘿嘿嘿嘿，对嘛，当面把误会解开不就好了~66真是贴心的男孩子呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("激动").say("这个大白痴……都说了你被骗了啊！！！")
                }
                , function() {
                    return t.fff.at(4).animate().say("啊哈哈，22还在生我们的气吗？我们不计较了哟~")
                }
                , function() {
                    return t.altair.face("激动").say("别演了！你们这些——退、退下！放开我！！ ")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c13 = [function() {
                return t.scene.clear().at(r[0], r[1]).animate().show()
            }
                , function() {
                    return t.altair.face("紧张").at(3).from("right").say("咳！请问这里是——")
                }
                , function() {
                    return t.scene.at(-650, 0, !0).animate().show()
                }
                , function() {
                    var e = t.yato.withShow().at(-6).from("left").show()
                        , n = t.rem.withShow().at(-2).from("left").show();
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.exec(),
                                n.exec()
                        }
                    }
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("hmmmm……今年获胜的竟然是这两个家伙。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("hmmmm……今年获胜的果然是这两个家伙。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("疑惑").say("不会没看到我们吧……喂！请问——")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("凡人，我注意到你们了。你们是来侍奉还是许愿的？")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("没有魔女的气息——不过有点混乱呢，这两位客人。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("无法交流……这两个家伙也太奇怪了吧！")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("这里是属于MOE之王的房间。你们祈求帮助的愿望，我确实地听到了。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.size("large").face("黑线").say("好吧，至少确实看到我了。真的要向这样的家伙求助吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "看起来至少不是坏人吧",
                        callback: function() {
                            return t.loadAndNext(e.c15, 2, 1, 5)
                        }
                    }, {
                        content: "完全没办法沟通的样子",
                        callback: function() {
                            return t.loadAndNext(e.c16, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c14 = [function() {
                return t.scene.clear().at(i[0], i[1]).animate().show()
            }
                , function() {
                    return t.altair.face("紧张").at(3).from("left").say("里面意外有点大，人呢？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.withShow().size("small").at(9).from("right").say("所到何人！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("吓——不要对刚进来的人突然大声说话啊！")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.size("middle").at(8).animate().say("汝等是来接受ilidilid礼仪测试的吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("疑惑").say("测试？不，你误会了，我们是来……")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.say("那么，昂首挺胸地接受UP评审团的公正测验吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("要听别人讲话啊！这家伙完全在自说自话吗！？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.say("通过测试就可获吾辈庇护，败者则受驱逐——作好准备！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("通过就可以帮忙的意思？哼，放马过来！")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.say("第一题！如果真爱有颜色，那一定是：")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("……等等，是说礼仪测试？")
                }
                , function() {
                    return t.branch.open([{
                        content: "一定是……蓝色！",
                        callback: function() {
                            return t.loadAndNext(e.c19, 2, 1, 5)
                        }
                    }, {
                        content: "一定是……绿色！",
                        callback: function() {
                            return t.loadAndNext(e.c19, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c15 = [function() {
                return t.altair.face("面瘫").say("虽然很想摔门，暂且硬着头皮试试吧。")
            }
                , function() {
                    return t.altair.size("middle").face("紧张").say("我在寻找名为22的人，可以请你们帮助我吗？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("当然，你以为我当了多少年的神明？")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("嗯……这件事值得找姐姐确认一下呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("答——答应了？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("既然出现在这里，汝即为有缘人。不过——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("疑惑").say("——不过？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("人家很享受让人脸红心跳的偶像生活呢！你要成为侍奉我的人吗？")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("暴露了呢，脑袋里的下流妄想——呐呐，你们要做我们的粉丝吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("就算我想同意……你们到底是什么家伙啊！？")
                }
                , function() {
                    return t.branch.open([{
                        content: "也不会有什么损失，先答应吧",
                        callback: function() {
                            return t.loadAndNext(e.c17, 3, 1, 5)
                        }
                    }, {
                        content: "这根本是在趁火打……圈粉吧！",
                        callback: function() {
                            return t.loadAndNext(e.c18, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c16 = [function() {
                return t.altair.size("middle").face("生气").say("大概也帮不上什么忙，只是奇怪的角色罢了。")
            }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("鲁莽而又无知的客人。姐姐看到了一定会生气的。")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("帮不上？你以为我当了多少年的神明？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("腹黑").say("哦——竟然是神明？那找一个人想必也是易如反掌咯？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("当然。只须汝自证为有缘人。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("姐姐也说不要随意答应陌生人——嗳嗳，你要做我们的粉丝吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("诶？忽然就冒出这种莫名其妙的要求……")
                }
                , function() {
                    return t.branch.open([{
                        content: "也不会有什么损失，先答应吧",
                        callback: function() {
                            return t.loadAndNext(e.c17, 3, 1, 5)
                        }
                    }, {
                        content: "这根本是在趁火打……圈粉吧！",
                        callback: function() {
                            return t.loadAndNext(e.c18, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c17 = [function() {
                return t.altair.face("面瘫").say("哼……为了22，我可以成为两位的粉丝。")
            }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("嘿嘿——愿你我不失此缘。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("那么，喜欢我们，从零重新开始吧——和它们一起~出来吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("疑惑").say("呃，它……们？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("和你们踏上相同道路的人。相信它们也会一起帮助你！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("嗷嗷嗷嗷~燃王大人帅翻了！！！萌王大人赛高~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3小电视！？它们为什么会——")
                }
                , function() {
                    return t.altair.face("黑线").say("等等，这些家伙不会也是稀里糊涂地成了粉丝团吧……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("啊哈！33酱也成了我们家燃王和萌王大人的粉丝吗？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("这么说你们已经认识了？实在是神奇的缘分呢哈哈哈哈。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("我可不想要这种不幸的缘分……可恶，竟然在这里遇上。")
                }
                , function() {
                    return t.fff.at(4).animate().say("萌王大人真是我们的福星哈哈！来吧，你已经跑不了了~")
                }
                , function() {
                    return t.altair.face("激动").say("话说你们根本是伪粉吧？走开！放开我！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c18 = [function() {
                return t.scene.at(-800, 0, !0).animate().show()
            }
                , function() {
                    return t.yato.say("冥顽不灵的人，对神明不可以这么无理哦！")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("毫无礼节的客人。和它们比起来过分很多呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("疑惑").say("呃，它……们？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("嗷嗷嗷嗷~萌王大人！是有人对萌王大人无礼了吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("F^3小电视！？它们为什么也在这儿！！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哟~这不是33么？竟然自己跑出来，还敢对萌王大人不敬？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("等等……你们这些家伙……是组了粉丝团吗？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("它们是今天造访的有缘之人。已经宣誓侍奉于吾——")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("嗷嗷嗷嗷~燃王sama！太帅了！！！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("给我适可而止吧！话说你们原来根本不认识这什么王吧！？")
                }
                , function() {
                    return t.fff.at(4).animate().say("哼，不知悔改的家伙——快把他从两位大人眼前挪走！")
                }
                , function() {
                    return t.altair.face("激动").say("退开！你们这些伪粉——放开我！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c19 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.up.say("NO.2！正确对待名为“UP”的生物的姿势是：")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.branch.open([{
                        content: "屏蔽、拉黑、举报套餐！",
                        callback: function() {
                            return t.loadAndNext(e.c20, 3, 1, 5)
                        }
                    }, {
                        content: "关注、投喂、分享套餐！",
                        callback: function() {
                            return t.loadAndNext(e.c33, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c20 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.up.say("最后！第二星际委员会222号决案通过的标准豆浆食用方式是：")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.branch.open([{
                        content: "搭配蛋黄酱或者食醋！",
                        callback: function() {
                            return t.loadAndNext(e.c33, 4, 1, 5)
                        }
                    }, {
                        content: "搭配酱油和大量葱花！",
                        callback: function() {
                            return t.loadAndNext(e.c33, 4, 2, 5)
                        }
                    }, {
                        content: "搭配白糖必须是白糖！",
                        callback: function() {
                            return t.loadAndNext(e.c33, 4, 3, 5)
                        }
                    }])
                }
            ],
            e.c33 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.up.say("异端！彻头彻尾的异端！秩序团呢？把他们俩轰出去！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("黑线").say("一脸正直地问出这些问题的家伙才是异端吧！？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(-2).from("left").say("来啦~审判长大人。这就把他们带走哈哈哈。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("F^3小电视？果然是你们搞的鬼！")
                }
                , function() {
                    return t.fff.at(2).animate().say("嘿嘿你们可是触犯了不得了的禁忌呢，乖乖跟我们走吧~")
                }
                , function() {
                    return t.altair.face("激动").say("你们是怎么混进这儿的？放开我！阴险的怪物！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ]
    }(e = t.g || (t.g = {}))
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        e.be = [function() {
            return t.scene.clear().toMode("NVL"),
                t.boy.think("等等，就这么让它们把人带走？")
        }
            , function() {
                return t.boy.think("就这样……结束了吗？")
            }
            , function() {
                return t.boy.think("如果没有来这儿……如果我不那么选择………")
            }
            , function() {
                return t.scene.then(function() {
                    return t.next()
                }).at(0, 0)["with"](800, "fade").create("black")
            }
            , function() {
                return t.boy.think("可恶，忽然什么都看不清——")
            }
            , function() {
                return t.boy.think("这也是F^3小电视搞的鬼吗？")
            }
            , function() {
                return t.loadAndNext(e.re)
            }
        ],
            e.re = [function() {
                return t.scene.toMode("ADV"),
                    t.tv.withShow().size("small").from("top", 800).at(3).say("这么说，如果有机会，你愿意再次帮助2233？")
            }
                , function() {
                    return t.boy.say("谁！？")
                }
                , function() {
                    return t.tv.say("我？我是和你一样来帮助他们的。")
                }
                , function() {
                    return t.tv.say("那么，你真的想回去再选择一次？")
                }
                , function() {
                    return t.tv.say("尽快决定哟，我只能帮你回到那儿……")
                }
                , function() {
                    return t.samsara.show(function() {
                        t.loadAndNext(e.ree)
                    }, function() {
                        t.scene.then().at(0, 0)["with"](0, "none").create("black")
                    })
                }
            ],
            e.ree = [function() {
                return t.scene.then(function() {
                    return t.next()
                }).at(0, 0)["with"](300, "dissolve").create("home")
            }
                , function() {
                    return t.vega.posture("普通").face("担心").size("large").at(3, 0).from("left", 1).show(),
                        t.branches.maps()
                }
            ],
            e.te = [function() {
                return t.matchFriend()
            }
                , function() {
                    return t.vega.withShow().face("伤心").say("真的没有办法吗……也是呢，突然出现作出这样冒昧的要求，万分抱歉……")
                }
                , function() {
                    return t.branch.open([{
                        content: "请相信我，无论怎样结局都是……",
                        callback: function() {
                            return t.interpreter.next()
                        }
                    }, {
                        content: "请无视我，我说不定只会坏事……",
                        callback: function() {
                            return t.interpreter.next()
                        }
                    }])
                }
                , function() {
                    return t.vega.face("严肃").say("虽然不明白您为什么那么说……但我还是应该自己试一试。")
                }
                , function() {
                    return t.vega.face("微笑").say("之前的胡言乱语请您不要见怪。那么，我告辞了。")
                }
                , function() {
                    return t.scene.toMode("NVL").at(0, 0)["with"](600, "fade").create("black")
                }
                , function() {
                    return t.boy.think("就这么放弃……真的好吗？")
                }
                , function() {
                    return t.boy.think("这样的话2233就只能……")
                }
                , function() {
                    return t.boy.think("但再选择出去了，也只是重蹈覆辙吧？")
                }
                , function() {
                    return t.boy.think("早知道如此，什么都不做也一样……")
                }
                , function() {
                    return t.boy.think("可恶……总觉得有点不甘心啊。")
                }
                , function() {
                    return t.branch.open([{
                        content: "追出门寻找22",
                        callback: function() {
                            return t.loadAndNext(e.te1)
                        }
                    }, {
                        content: "继续留在屋里",
                        callback: function() {
                            return t.loadAndNext(e.te2)
                        }
                    }])
                }
            ],
            e.te1 = [function() {
                return t.scene.toMode("ADV")["with"](800, "normal").create("street")
            }
                , function() {
                    return t.altair.withShow().posture("普通").face("疑惑").at(3).from("right").say("喂，你有没有见到……")
                }
                , function() {
                    return t.altair.face("惊讶").say("呃，你怎么知道我是33？——22！？你见过22？她在哪？")
                }
                , function() {
                    return t.altair.face("生气").say("这个笨蛋！我好不容易从F^3那群怪物手里逃出来找她——竟然自己乱跑！")
                }
                , function() {
                    return t.altair.face("面瘫").say("哼，只能继续找了。这家伙……千万别自己闯到F^3小电视眼前去啊。")
                }
                , function() {
                    return t.altair.face("惊讶").say("嗯？你要和我一起去？……已经试着帮过22很多次？")
                }
                , function() {
                    return t.altair.face("腹黑").say("虽然不明白你在说什么——一起来了可别拖我后腿哦。")
                }
                , function() {
                    return t.loadAndNext(e.te3)
                }
            ],
            e.te2 = [function() {
                return t.scene.toMode("ADV")["with"](800, "normal").create("home")
            }
                , function() {
                    return t.altair.withShow().posture("普通").face("面瘫").at(3).from("left").say("嘛……你是这儿的屋主？")
                }
                , function() {
                    return t.altair.face("疑惑").say("是这样——我在你门前捡到这个耳坠。请问你见过它的主人吗？")
                }
                , function() {
                    return t.altair.face("惊讶").say("诶？你认识22？她在哪！！……什么叫跑走了！？")
                }
                , function() {
                    return t.altair.face("生气").say("开什么玩笑！我可是从F^3那群怪物手里逃出来找她的，可恶……")
                }
                , function() {
                    return t.altair.face("腹黑").say("你这家伙，别让我发现对22做过什么哦。哼，只能接着找她——")
                }
                , function() {
                    return t.altair.face("惊讶").say("嗯？要和我一起去？……嘁，来了可别拖我后腿哦。")
                }
                , function() {
                    return t.loadAndNext(e.te3)
                }
            ],
            e.te3 = [function() {
                return t.scene.create("street")
            }
                , function() {
                    return t.scene.at(-300, 0, !0).animate().show()
                }
                , function() {
                    var e = t.vega.withShow().face("惊讶").size("middle").at(1).from("left").say("3……33！那是33吗？？")
                        , n = t.girl.withShow().at(-2).from("left").show();
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.exec(),
                                n.exec()
                        }
                    }
                }
                , function() {
                    return t.girl.say("咦？33！你不是被F^3们抓走了么……")
                }
                , function() {
                    return t.scene.at(0, 0).animate().show()
                }
                , function() {
                    return t.branch.open([{
                        content: "问22：等等，她又是谁？",
                        callback: function() {
                            return t.loadAndNext(e.te4)
                        }
                    }, {
                        content: "问陌生人：你也认识33？",
                        callback: function() {
                            return t.loadAndNext(e.te4)
                        }
                    }])
                }
            ],
            e.te4 = [function() {
                return t.scene.at(-370, 0, !0).animate().show()
            }
                , function() {
                    return t.girl.say("一言难尽……之前帮助33找22，但中途33被F^3小电视抓走了。在外面四处找人的时候发现了22——")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("33！你没事～她告诉我你被抓走时，我都不知道该怎么办……")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("微笑").at(4).from("right").say("嘁，我怎么可能束手就擒！倒是你这家伙一个人瞎跑——")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("大笑").say("太好了，又找到你了……能遇到你们真是幸运呢，谢谢你们！")
                }
                , function() {
                    return t.boy.say("没什么啦。不过莫名其妙轮回这么多次，最后竟然是以这种方式让你们重遇……")
                }
                , function() {
                    return t.scene.at(-370, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.say("诶？？你说什么！？你也经历了类似的……所以你也见到了白色小电视？")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("白色小电视？")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("惊讶").say("白色小电视？？")
                }
                , function() {
                    return t.branch.open([{
                        content: "说起来，白色小电视的来历是？",
                        callback: function() {
                            return t.loadAndNext(e.te5)
                        }
                    }, {
                        content: "说起来，F^3小电视现在在哪？",
                        callback: function() {
                            return t.loadAndNext(e.te5)
                        }
                    }])
                }
            ],
            e.te5 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.fff.withShow().at(8, 0).from("right").say("哈哈哈，异乡伸来援手的陌生人和下落不明的侣伴，真是万金油的情节啊~")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("担心").say("F^3小电视！找到这里来了么……")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").say("真是死缠烂打……这次不会让你们接近22了！")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("别生气嘛，我们可是被“那个人”派来考验你们俩的哟。对了，其实我就是……")
                }
                , function() {
                    return t.fff.opacity(0).at(8, -2).animate().say("魔·法·天——等等，串戏了orz……其实我还是——")
                }
                , function() {
                    var e = t.fff.hide()
                        , n = t.tv.withShow().at(8, 1).from("top").say("白色的！！嘿嘿，意不意外？");
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.exec(),
                                n.exec()
                        }
                    }
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("考验？所以这一切都只是……")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.tv.say("喂！这失望的表情是什么意思？这可是很严肃的考验！")
                }
                , function() {
                    return t.scene.at(100, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("腹黑").say("仔细看的话，似乎把这些家伙煮了吃也不错呢。")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.tv.say("等，等等！我们可是还会黑化的哟！通过考验不是应该心怀感激吗！？")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("微笑").say("那么……大家都没事了？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.at(3).animate().face("微笑").say("对吧~")
                }
                , function() {
                    return t.altair.face("微笑").say("嗯……终于……")
                }
                , function() {
                    return t.branch.open([{
                        content: "别擅自卷进其他人来啊！",
                        callback: function() {
                            return t.next()
                        }
                    }, {
                        content: "这是什么腹黑的考验啊！",
                        callback: function() {
                            return t.next()
                        }
                    }])
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.tv.say("嘿嘿，我有说这只是对2233的考验吗？")
                }
                , function() {
                    return t.loadAndNext(e.te6)
                }
            ];
        var n = 28
            , a = 24;
        e.te6 = [function() {
            return t.scene.then(function() {
                return t.next()
            }).scale(.5).at(-400, -180)["with"](1e3, "fade").create("galaxy")
        }
            , function() {
                return t.galaxy.show(function() {
                    return t.next()
                })
            }
            , function() {
                return t.text.then().from("bottom", 600, 12, .1).update([{
                    text: "小电视们不知不觉聚到2233身边\n为他们搭起了一座白色的桥",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "原案\nH光大小姐",
                    y: -24,
                    width: 192,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "那情景\n就像是梦里的景致一般",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "编剧\ncheng\n\n演出\nH光大小姐",
                    y: -24,
                    width: 192,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "我忽然发觉自己也和他们一样\n在寻找着什么寻找着某个人",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "美术\nero\nNyon\n\n设计\nApril",
                    y: -24,
                    width: 192,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "你会在哪呢……\n又过着什么样的生活",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "程序\nH光大小姐\n比利\n\n制作进行\n葵\nH光大小姐",
                    y: -24,
                    width: 240,
                    height: 24,
                    size: a,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.interpreter.next()
                }).hide()
            }
            , function() {
                return t.text.then().update([{
                    text: "无论你在这个世界上的什么地方\n我都一定会再去见你",
                    y: 64,
                    width: 444,
                    height: 24,
                    size: n
                }, {
                    text: "出品\nb i l i b i l i",
                    y: -36,
                    width: 192,
                    height: 24,
                    size: 28,
                    glowColor: 16777215
                }]).show()
            }
            , function() {
                return t.text.then(function() {
                    return t.next()
                }).hide()
            }
            , function() {
                return "58698" === t.config.user.id && "12540568" === t.config.friend.id ? t.loadAndNext(e.tegz) : t.loadAndNext(e.te6d5)
            }
        ],
            e.te6d5 = [function() {
                return t.girl.withShow(!1).say("那个……我好像在哪里见过你。")
            }
                , function() {
                    return t.branch.open([{
                        content: "不会吧？",
                        callback: function() {
                            return t.loadAndNext(e.te7)
                        }
                    }, {
                        content: "我也是。",
                        callback: function() {
                            return t.loadAndNext(e.te8)
                        }
                    }])
                }
            ],
            e.tegz = [function() {
                return t.scene.toMode("NVL"),
                    t.girl.withShow(!1).say("那个……我好像在哪里见过你。")
            }
                , function() {
                    return t.boy.withShow(!1).say("是不是……有一种……在梦里，我们似乎是……")
                }
                , function() {
                    return t.girl.say("是恋……恋人吗？")
                }
                , function() {
                    return t.boy.say("你也有这种感觉吗！？嗯，这阵子我一直在做一个梦，梦见我和一个女孩子在某个世界度过着二人的时光——")
                }
                , function() {
                    return t.boy.say("在那个世界里，我一开始称呼你为朱朱，你称呼我为……")
                }
                , function() {
                    return t.girl.say("光……光光？")
                }
                , function() {
                    return t.boy.rename("光光").say("果然是你啊！刚见到你的时候我还在疑惑——怎么会有这种巧合！")
                }
                , function() {
                    return t.girl.rename("朱朱").say("我也是啊！没想到真的能在这里见到你！")
                }
                , function() {
                    return t.boy.say("哈哈哈……那个，既然如此，我们是不是……")
                }
                , function() {
                    return t.girl.say("嗯？是不是什么捏？")
                }
                , function() {
                    return t.boy.say("是不是应该……像在另一个世界中的5月30号那样，牵……牵……")
                }
                , function() {
                    return t.girl.say("喏……")
                }
                , function() {
                    return t.boy.say("哇，好主动……")
                }
                , function() {
                    return t.girl.say("笨，笨蛋！变态！明明是你要的！")
                }
                , function() {
                    return t.boy.say("疼疼疼，别打了（怎么和另一个世界的我们一模一样）……")
                }
                , function() {
                    return t.girl.say("小声嘀咕什么呢！人生中第一次牵到妹子的手，感觉怎么样啊？")
                }
                , function() {
                    return t.boy.say("软软的……热热的……感觉很不错（扑通扑通）")
                }
                , function() {
                    return t.girl.say("是嘛，我也……嗯（扑通扑通）")
                }
                , function() {
                    return t.boy.say("祝我们在另一个世界，也能像现在这样幸福，并一直走到世界的尽头——")
                }
                , function() {
                    return t.girl.say("直到白头，努力到达那个由梦构成的箱庭之中。")
                }
                , function() {
                    return t.loadAndNext(e.tee)
                }
            ],
            e.te7 = [function() {
                return t.girl.say("也是……那时我们并不相识，简直就像是做了一个很长的梦。")
            }
                , function() {
                    return t.girl.say("不过~在这种日子东奔西跑，你该不会没有另一半吧？")
                }
                , function() {
                    return t.loadAndNext(e.te9)
                }
            ],
            e.te8 = [function() {
                return t.girl.say("你也有这种感觉？话说回来——")
            }
                , function() {
                    return t.girl.say("嘿嘿~在这种日子东奔西跑，该不会没有另一半吧~")
                }
                , function() {
                    return t.loadAndNext(e.te9)
                }
            ],
            e.te9 = [function() {
                return t.branch.open([{
                    content: "才不是没有，我只是不谈而已！",
                    callback: function() {
                        return t.next()
                    }
                }, {
                    content: "你才是！我只是比较热心罢了！",
                    callback: function() {
                        return t.next()
                    }
                }])
            }
                , function() {
                    return t.girl.say("是嘛~")
                }
                , function() {
                    return t.girl.say("嗯，我的名字是" + t.config.friend.name + "，你呢？")
                }
                , function() {
                    return t.branch.open([{
                        content: "诶？我？我叫" + t.config.user.name.substring(0, 8) + "……",
                        callback: function() {
                            return t.loadAndNext(e.te10)
                        }
                    }])
                }
            ],
            e.te10 = [function() {
                return t.girl.rename(t.config.friend.name).say("记下啦~或许，只是或许——我们还会遇见吧？")
            }
                , function() {
                    return t.loadAndNext(e.tee)
                }
            ],
            e.tee = [function() {
                return t.scene.hideDialog(),
                    t.galaxy.stars(function() {
                        return t.next()
                    })
            }
                , function() {
                    return t.comment.show(function(e) {
                        t.comment.close(function() {
                            t.galaxy.addStar(t.config.user.name, e, function() {
                                return t.config.comment = e,
                                    t.share.updateMessage(),
                                    t.next()
                            })
                        })
                    }, function() {
                        return t.share.updateMessage(),
                            t.next()
                    })
                }
                , function() {
                    return t.share.show(function() {
                        t.doShare()
                    }, function() {
                        t.sendLetter()
                    }, function() {
                        t.restart()
                    }, function() {
                        t.jumpMovie()
                    }),
                        t.galaxy.preWatch(),
                        "pc" === GAL.config.plat ? (t.galaxy.watch(),
                            void t.branch.close()) : t.branch.open([{
                            content: "抬头仰望星空",
                            callback: function() {
                                var e = t.galaxy.getOrientation()
                                    , n = (e.alpha,
                                    e.beta)
                                    , a = e.gamma;
                                return t.config.isIos && !t.config.isQQ && t.checkAngle(n, 45) && t.checkAngle(a, 180) ? (alert("现在可以观测啦，原地转圈或上下摆动手机可调整视角，双指可进行缩放~"),
                                    t.galaxy.watch(),
                                    t.branch.close()) : t.checkAngle(n, 135) && t.checkAngle(a, 0) ? (alert("现在可以观测啦，原地转圈或上下摆动手机可调整视角，双指可进行缩放~"),
                                    t.galaxy.watch(),
                                    t.branch.close()) : void alert("仰望星空需要调整姿势哦，请将手机保持竖屏，HOME键向下，举过头顶调整到合适角度，用其背面对向天空~")
                            }
                        }], !1)
                }
            ]
    }(e = t.b || (t.b = {}))
}(scenario || (scenario = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.blocks = [],
                t.currentIndex = -1,
                t.currentTop = 0,
                t.testText = new egret.TextField,
                t.innerX = 0,
                t.innerY = 0,
                t.animate = function() {
                    var e = t.blocks[t.currentIndex];
                    if (e.currentCursor === e.wordsLength)
                        return void t.endAnimate();
                    var n = Date.now() - e.startTime
                        , a = ~~(n * t.cps / 1e3);
                    a !== e.currentCursor && (e.charWords.text = e.words.substr(0, e.currentCursor),
                        e.currentCursor = a),
                        requestAnimationFrame(t.animate)
                }
                ,
                t.createAnimate = function() {
                    var e = t.blocks[t.currentIndex];
                    e.currentCursor = 0,
                        e.startTime = Date.now(),
                        e.wordsLength = e.words.length,
                        t.animate()
                }
                ,
                t.endAnimate = function() {
                    var e = t.blocks[t.currentIndex];
                    e.currentCursor = e.wordsLength,
                        e.charWords.text = e.words
                }
                ,
                t.checkAnimationEnd = function() {
                    var e = t.blocks[t.currentIndex];
                    return e.currentCursor === e.wordsLength
                }
                ,
                t
        }

        return __extends(n, e),
            n.prototype.onAddToStage = function() {
                this.bg = new egret.Bitmap,
                    this.bg.name = "bg",
                    this.bg.texture = RES.getRes(t.DIALOG_SIZE_LUT.nvl.bg),
                    this.width = t.DIALOG_SIZE_LUT.nvl.width,
                    this.height = t.DIALOG_SIZE_LUT.nvl.height,
                    this.x = (this.stage.stageWidth - t.DIALOG_SIZE_LUT.nvl.width) / 2,
                    this.y = (this.stage.stageHeight - t.DIALOG_SIZE_LUT.nvl.height) / 2,
                    this.innerX = (t.DIALOG_SIZE_LUT.nvl.width - t.DIALOG_SIZE_LUT.nvl.innerWidth) / 2,
                    this.innerY = (t.DIALOG_SIZE_LUT.nvl.height - t.DIALOG_SIZE_LUT.nvl.innerHeight) / 2,
                    this.testText.width = t.DIALOG_SIZE_LUT.nvl.innerWidth - t.DIALOG_SIZE_LUT.nvl.wordsLeft,
                    this.testText.size = t.DIALOG_SIZE_LUT.nvl.wordsSize,
                    this.testText.lineSpacing = t.DIALOG_SIZE_LUT.nvl.wordsLineSpacing,
                    this.addChild(this.bg),
                    e.prototype.onAddToStage.call(this),
                    this.reset()
            }
            ,
            n.prototype.calcBlockHeight = function(e) {
                this.testText.text = e;
                var n = this.testText.height;
                return n > t.DIALOG_SIZE_LUT.nvl.blockMinHeight ? n : t.DIALOG_SIZE_LUT.nvl.blockMinHeight
            }
            ,
            n.prototype.reset = function() {
                this.removeChildren(),
                    this.addChild(this.bg),
                    this.addChild(this.touchIcon),
                    this.blocks = [],
                    this.currentTop = this.innerY,
                    this.currentIndex = -1
            }
            ,
            n.prototype.outWords = function(e, n, a) {
                void 0 === a && (a = !0);
                var r = this.calcBlockHeight(n);
                this.currentTop + r >= t.DIALOG_SIZE_LUT.nvl.innerHeight && this.reset(),
                    this.visible = !0;
                var i = {
                    container: new egret.DisplayObjectContainer,
                    charName: new egret.TextField,
                    charWords: new egret.TextField,
                    words: n,
                    wordsLength: n.length,
                    startTime: 0,
                    currentCursor: 0
                };
                return this.cps = t.CHAR_ATTRS[e].cps,
                    i.container.y = this.currentTop,
                    i.words = n,
                    i.charWords.size = t.DIALOG_SIZE_LUT.nvl.wordsSize,
                    i.charWords.width = this.testText.width,
                    i.charWords.lineSpacing = t.DIALOG_SIZE_LUT.nvl.wordsLineSpacing,
                    i.charWords.x = this.innerX + t.DIALOG_SIZE_LUT.nvl.wordsLeft,
                    i.charWords.stroke = 1,
                    i.charWords.strokeColor = t.CHAR_ATTRS[e].wordsColor,
                    i.charWords.text = "",
                a && (i.charName.size = t.DIALOG_SIZE_LUT.nvl.nameSize,
                    i.charName.width = t.DIALOG_SIZE_LUT.nvl.nameWidth,
                    i.charName.stroke = 1,
                    i.charName.strokeColor = t.CHAR_ATTRS[e].nameColor,
                    i.charName.text = t.CHAR_ATTRS[e].name,
                    i.charName.textAlign = egret.HorizontalAlign.LEFT,
                    i.charName.x = this.innerX + t.DIALOG_SIZE_LUT.nvl.nameLeft,
                    i.charWords.y = i.charName.height + t.DIALOG_SIZE_LUT.nvl.wordsTop,
                    r += i.charWords.y,
                    i.container.addChild(i.charName)),
                    i.container.addChild(i.charWords),
                    this.addChild(i.container),
                    this.blocks.push(i),
                    this.currentIndex += 1,
                    this.currentTop += r + t.DIALOG_SIZE_LUT.nvl.blockSpacing,
                    this.createAnimate(),
                    {
                        check: this.checkAnimationEnd,
                        exec: this.endAnimate
                    }
            }
            ,
            n.prototype.say = function(t, e) {
                return this.outWords(t, e)
            }
            ,
            n.prototype.think = function(t, e) {
                return this.outWords(t, e, !1)
            }
            ,
            n.prototype.hide = function() {
                e.prototype.hide.call(this),
                    this.reset()
            }
            ,
            n
    }(t.Dialog);
    t.NVLDialog = e,
        __reflect(e.prototype, "GAL.NVLDialog")
}(GAL || (GAL = {}));
var scenario;
!function(t) {
    t.intro = [function() {
        return singleton.title.init(),
            t.title.showTitle()
    }
        , function() {
            return t.config.user ? t.next() : t.login()
        }
        , function() {
            return t.loading.startSecond(function() {
                t.config.user.path = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    -1 !== t.config.user.sex ? setTimeout(function() {
                        return t.interpreter["goto"](4)
                    }, 10) : t.next()
            })
        }
        , function() {
            return t.title.chooseSex(function(e) {
                t.config.user.sex = e,
                    0 === e ? t.boy.rename(t.config.user.name) : t.girl.rename(t.config.user.name),
                    t.next()
            })
        }
        , function() {
            t.scene.then().scale(1).at(0, 0)["with"](0, "none").create("white"),
                t.title.close(),
                0 === t.config.user.sex ? (t.boy.rename(t.config.user.name),
                    t.interpreter.load(t.b.intro)) : (t.girl.rename(t.config.user.name),
                    t.interpreter.load(t.g.intro)),
                t.next()
        }
    ]
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    t.s1 = [function() {
        return t.altair.face("愤怒").show()
    }
        , function() {
            return t.altair.say("你才好人，你全家都好人！")
        }
    ]
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    t.s2 = [function() {
        return t.altair.face("惊讶").show()
    }
        , function() {
            return t.altair.say("蛤？我看起来像个坏人吗？")
        }
    ]
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    t.test = [function() {
        return t.scene.create("home")
    }
        , function() {
            return t.scene.at(300, -50).animate().show()
        }
        , function() {
            return t.scene.at(-300).animate().show()
        }
        , function() {
            return t.scene.toMode("NVL")
        }
        , function() {
            return t.altair.posture("普通").face("大笑").at(3, 0).show()
        }
        , function() {
            return t.altair.face("微笑").show()
        }
        , function() {
            return t.branch.custom().open([{
                content: "我是好人",
                callback: function() {
                    t.interpreter.load(t.s1),
                        t.interpreter.next()
                },
                bg: "1",
                transform: {
                    width: 200,
                    height: 100,
                    x: 120,
                    y: 200,
                    rotation: 30
                }
            }, {
                content: "我是坏人",
                callback: function() {
                    t.interpreter.load(t.s2),
                        t.interpreter.next()
                },
                bg: "2",
                transform: {
                    width: 200,
                    height: 100,
                    x: 240,
                    y: 400
                }
            }])
        }
        , function() {
            return t.scene.create("home")
        }
        , function() {
            return t.altair.size("middle").face("严肃").show()
        }
        , function() {
            return t.scene.at(100, -50).animate().show()
        }
        , function() {
            return t.scene.at(-100).animate().show()
        }
        , function() {
            return t.altair.say("蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤")
        }
        , function() {
            return t.scene.toMode("ADV")
        }
        , function() {
            return t.altair.say("蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤")
        }
        , function() {
            return t.scene.toMode("NVL")
        }
        , function() {
            return t.altair.say("蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤")
        }
        , function() {
            return t.altair.say("蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤")
        }
        , function() {
            return t.vega.posture("前倾").face("愤怒").at(1, 0).from("left").show()
        }
        , function() {
            return t.vega.say("蛤你妹啊！")
        }
        , function() {
            return t.altair.posture("扶头").face("愤怒").show()
        }
        , function() {
            return t.altair.size("large").show()
        }
        , function() {
            return t.altair.think("哼，凶什么凶！")
        }
        , function() {
            return t.altair.at(1, 0).animate(500).show()
        }
        , function() {
            return t.altair.face("严肃").show()
        }
        , function() {
            return t.vega.posture("普通").face("微笑").at(1, 0).show()
        }
        , function() {
            return t.vega.face("小恶魔").show()
        }
        , function() {
            return t.vega.hide()
        }
    ]
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        var n = t.mapCoords.map1
            , a = n.gate
            , r = n.rc
            , i = n.tent
            , o = n.ice
            , c = n.fw
            , s = n.scale;
        e.map1 = [function() {
            return t.scene.then(function() {
                return t.interpreter.next()
            }).scale(s).at(a[0], a[1])["with"]().create("ap")
        }
            , function() {
                return t.boy.say("游乐园人比较多，33在的概率也比较大。")
            }
            , function() {
                return t.vega.withShow().posture("普通").face("微笑").size("middle").from("right").at(3).say("嗯，我会努力的！")
            }
            , function() {
                return t.fff.withShow().size("exSmall").at(-3, 3).say("嘿嘿嘿，虽然是被派来搜人的，但这个叫“游乐场”的地方意外地适合度假呢……")
            }
            , function() {
                return t.scene.at(-400, 0, !0).animate().show()
            }
            , function() {
                return t.fff.say("那么从哪开始玩，咳，找起呢？")
            }
            , function() {
                return t.scene.at(0, 0, !0).animate().show()
            }
            , function() {
                return t.vega.face("紧张").size("large").say("F^3小电视！怎么会……刚进到这里就遇上它们 (＞﹏＜)")
            }
            , function() {
                return t.vega.face("严肃").say("怎么办？要先离开这里吗？可是如果33也在这儿……")
            }
            , function() {
                return t.branch.open([{
                    content: "还是趁没被发现躲开它们吧",
                    callback: function() {
                        t.fff.at(0, 0),
                            t.loadAndNext(e.b1, 0, 1)
                    }
                }, {
                    content: "偷偷跟着，可能有33的线索",
                    callback: function() {
                        t.fff.at(0, 0).hide(),
                            t.loadAndNext(e.b2, 0, 2)
                    }
                }])
            }
        ],
            e.b1 = [function() {
                return t.vega.size("middle").say("嗯，只凭我们两个，被发现肯定跑不掉了。但愿33没事。")
            }
                , function() {
                    return t.vega.face("微笑").say("如果33也在，我们三个在这一定会很开心的。")
                }
                , function() {
                    return t.vega.face("脸红").say("嗯？狗粮？那是什么？……极度邪恶的精神料理？？")
                }
                , function() {
                    return t.vega.face("疑惑").say("好吧……我们现在该去哪儿呢？")
                }
                , function() {
                    return t.branch.open([{
                        content: "直接从大门折返吧",
                        callback: function() {
                            return t.loadAndNext(e.b3, 1, 1)
                        }
                    }, {
                        content: "混进那边的队伍吧",
                        callback: function() {
                            return t.loadAndNext(e.b4, 1, 2)
                        }
                    }])
                }
            ],
            e.b2 = [function() {
                return t.vega.face("严肃").say("嗯……为了找到33，我愿意冒险试试。")
            }
                , function() {
                    return t.vega.face("微笑").size("middle").say("忽然从逃亡变成追踪，是不是还有点像侦探片呢！")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("small").at(-3, 1).from("left").say("诶嘿嘿～有忽然到了桃源的感觉，能玩的去处太多也让人困扰啊。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("不过这些家伙看起来完全是来游玩的，没有找我和33的意思啊……")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("这、这是——雪糕？是传说中的那个梦幻食物吗！？")
                }
                , function() {
                    return t.fff.say("你们几个快去弄一打回来！一会和我们在前面那个帐篷汇合～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("……完全投入到游客模式了啊喂！不过他们似乎分开行动了？")
                }
                , function() {
                    return t.branch.open([{
                        content: "不管买雪糕的，跟到帐篷里去",
                        callback: function() {
                            return t.loadAndNext(e.b15, 1, 1)
                        }
                    }, {
                        content: "雪糕站应该安全些，跟过去吧",
                        callback: function() {
                            return t.loadAndNext(e.b16, 1, 2)
                        }
                    }])
                }
            ],
            e.b3 = [function() {
                return t.scene.clear().at(a[0] + 100, a[1] - 100).animate().show()
            }
                , function() {
                    return t.fff.withShow(!1).say("让我们补票？开什么玩笑！我生起气来连大门都烧哦！！")
                }
                , function() {
                    return t.scene.clear().at(350, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("middle").from("right").at(7).withShow().say("那边两个家伙明明也没有拿着票啊！——咦，这不是22嘛！？")
                }
                , function() {
                    return t.fff.say("哈哈哈竟然大摇大摆地从门口出来，你们都不玩潜行游戏的吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").at(2).from("left").say("糟了……门口已经被它们堵住了……")
                }
                , function() {
                    return t.vega.face("黑线").say("这地方到底塞了多少F^3小电视啊！")
                }
                , function() {
                    return t.branch.open([{
                        content: "向周围人群呼救！",
                        callback: function() {
                            return t.loadAndNext(e.b6, 2, 1)
                        }
                    }, {
                        content: "大声呼叫保安员！",
                        callback: function() {
                            return t.loadAndNext(e.b6, 2, 2)
                        }
                    }])
                }
            ],
            e.b4 = [function() {
                return t.scene.clear().at(r[0], r[1]).animate().show()
            }
                , function() {
                    return t.vega.face("疑惑").from("left").at(3).say("这个队伍通往什么地方？大家看起来都很兴奋呢。")
                }
                , function() {
                    return t.boy.say("这个是过山车啦。")
                }
                , function() {
                    return t.vega.size("large").face("紧张").say("等、等一下，什么是过山车？？……真的会有车沿着那个轨道上去吗？")
                }
                , function() {
                    return t.boy.say("我在这排着，你可以去前边先看看。")
                }
                , function() {
                    return t.vega.face("微笑").say("嗯我去看看~")
                }
                , function() {
                    return t.vega.size("middle").at(2, 1).animate().show()
                }
                , function() {
                    return t.vega.size("small").at(4, 2).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").size("middle").at(3, 0).animate().say("好可怕！")
                }
                , function() {
                    return t.vega.size("large").face("脸红").say("我不仅有点胆小，还恐高喔。我们真的要上去吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "回头会可疑，硬着头皮上",
                        callback: function() {
                            return t.loadAndNext(e.b9, 2, 1)
                        }
                    }, {
                        content: "躲在发车的地方见机行事",
                        callback: function() {
                            return t.loadAndNext(e.b10, 2, 2)
                        }
                    }])
                }
            ],
            e.b5 = [function() {
                return t.vega.face("激动").say("可是……唔，抱歉拖累了你，我会努力跑远一些，要小心喔！")
            }
                , function() {
                    return t.fff.face("惊讶").say("跑得真快呢，啊……年轻真好啊……")
                }
                , function() {
                    return t.fff.face("大笑").say("不过这位护花使者，应该夸你勇敢还是无知呢。嘿嘿嘿，你猜22跑的方向会遇到什么惊喜？这是什么表情嘛！告诉你好了，那里是我们的先遣组巡逻的地方哟。")
                }
                , function() {
                    return t.fff.face("发火").say("对了！说起来的话那些家伙也没有买票吧？")
                }
                , function() {
                    return t.branch.open([{
                        content: "提出交易，用门票换22",
                        callback: function() {
                            return t.loadAndNext(e.b7)
                        }
                    }, {
                        content: "凭借身高优势和它们拼了",
                        callback: function() {
                            return t.loadAndNext(e.b7)
                        }
                    }])
                }
            ],
            e.b6 = [function() {
                return t.scene.clear().at(-300, 0, !0).animate().show()
            }
                , function() {
                    return t.fff.size("small").from("left").at(-1, 3).say("哟嗬～请游客们不要喧哗或者推搡哟，我们是文明园区哟——")
                }
                , function() {
                    return t.fff.say("啊嘞？这不是22吗！？真有效率啊伙伴们~逮到目标了也不告诉我！")
                }
                , function() {
                    return t.fff.say("……这家伙……真是丢人啊。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").size("middle").from("right").at(4).say("喂喂喂！为什么连这个地方的工作人员都是你们！？")
                }
                , function() {
                    return t.scene.at(-300, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("middle").at(-1, 0).say("啊，那个，其实是因为刚好看到招工启示，最近又有点窘迫……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("我和33到底为什么会被这样的家伙追着跑啊……")
                }
                , function() {
                    return t.scene.at(-300, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("白、白痴，不用什么都告诉别人啊！！")
                }
                , function() {
                    return t.branch.open([{
                        content: "提出资助F^3们来换取自由",
                        callback: function() {
                            return t.loadAndNext(e.b7, 3, 1)
                        }
                    }, {
                        content: "威胁举报F^3保安骚扰游客",
                        callback: function() {
                            return t.loadAndNext(e.b8, 3, 2)
                        }
                    }])
                }
            ],
            e.b7 = [function() {
                return t.fff.face("发火").say("你这家伙……不要看不起反派啊！！准备承受加倍的惩罚吧！")
            }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.at(2).animate().say("闭嘴！！别丢人了——把22带走！")
                }
                , function() {
                    return t.vega.face("激动").say("放开我！！你们这些粗鲁的矮冬瓜！话说你们根本是都跑到这个地方来偷玩了吧！")
                }
                , function() {
                    return t.fff.face("大笑").say("哈哈哈，这就被带回来了呢。再找到33我们就能收工尽情去玩了嘿嘿……都说了是反派啊！！不要再跟我提门票了！！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b8 = [function() {
                return t.fff.say("你这家伙……不要看不起反派啊！我可是有梦想的打工仔！！")
            }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.at(2).animate().say("闭嘴！！别丢人了——把22带走！")
                }
                , function() {
                    return t.vega.face("激动").say("放开我！！你们这些粗鲁的煤球怪！本来都是跑这里偷玩的吧！")
                }
                , function() {
                    return t.fff.say("……煤球？哼，只剩再找到33……都说了我们是反派啊！！不要再提补门票了！！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b9 = [function() {
                return t.scene.at(0, 0)["with"](800, "fade").create("black")
            }
                , function() {
                    return t.vega.withShow(!1).say("等等！啊啊啊啊啊啊啊啊啊啊——")
                }
                , function() {
                    return t.scene.at(r[0], r[1])["with"](800, "fade").create("ap")
                }
                , function() {
                    return t.vega.withShow().size("large").face("激动").say("……呼～终于结束了！果然是绝·对·不·想·再·有的经历呢。")
                }
                , function() {
                    return t.vega.size("middle").face("黑线").say("稍等，胃里泛起奇怪的感觉……呕！！")
                }
                , function() {
                    return t.vega.face("脸红").say("太失礼了，抱歉！我原以为自己反应没那么严重了……呕！！！")
                }
                , function() {
                    return t.fff.size("small").at(-3, 0).from("left").say("呕！！！可恶……明明已经是第二次下来了……呕！")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("喂，喂，这不是22吗！呕……真是蠢啊，竟敢跑来坐这个……呕！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3！什么时候……不会和我们坐了同一班吧？")
                }
                , function() {
                    return t.vega.size("large").face("伤心").say("不行，我这样完全走不了……快走吧！替我找到33！33会有办法的！")
                }
                , function() {
                    return t.branch.open([{
                        content: "冷静下来，先留下22独自逃离",
                        callback: function() {
                            return t.loadAndNext(e.b11, 3, 1)
                        }
                    }, {
                        content: "坚持留下，趁对方虚弱一决高下",
                        callback: function() {
                            return t.loadAndNext(e.b12, 3, 2)
                        }
                    }])
                }
            ],
            e.b10 = [function() {
                return t.vega.face("担心").size("middle").say("抱歉，因为我的原因又添了麻烦。但总觉得这个地方也很危险……")
            }
                , function() {
                    return t.vega.face("惊讶").say("似乎上一班过山车已经停下来了——不，不会吧，那几个身影是！？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("small").at(-3).from("left").say("呕……为什么游乐场会有这种可怕的设施……这星球住的都是怪物吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("紧张").size("large").say("唔，是F^3小电视！怎么办……虽然它好像吐了一路？")
                }
                , function() {
                    return t.branch.open([{
                        content: "混入离场的人群走回去",
                        callback: function() {
                            return t.loadAndNext(e.b13, 3, 1)
                        }
                    }, {
                        content: "干脆趁机拷问33的消息",
                        callback: function() {
                            return t.loadAndNext(e.b14, 3, 2)
                        }
                    }])
                }
            ],
            e.b11 = [function() {
                return t.fff.size("middle").at(2).animate().say("哈哈哈，果然还是只会考虑自己啊~")
            }
                , function() {
                    return t.vega.size("middle").face("激动").say("放开我！！你们这些煤球怪！33会把你们都做成切糕的！！")
                }
                , function() {
                    return t.fff.say("哼哼……别妄想了，他已经在接受我们的款待了哟，你们不会再见——呕！")
                }
                , function() {
                    return t.vega.face("惊讶").say("什么，33已经被你们——不！33一定还在找我！")
                }
                , function() {
                    return t.fff.say("真是富有想象力的一对呢~是时候接受现实了哈哈哈呕……")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b12 = [function() {
                return t.scene.at(-400, 0, !0).animate().show()
            }
                , function() {
                    return t.fff.size("middle").say("开什么玩笑，这种情况下还想着反抗吗……呕！你们的脸色也没有比我好吧哈哈呕——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("伤心").size("middle").say("恐怕它们说得没错……谢谢你的心意，但凭现在的我们……大概只能放弃了。")
                }
                , function() {
                    return t.fff.at(2).animate().say("哈哈还是个识趣的家伙，呕……把、把她带走！")
                }
                , function() {
                    return t.vega.face("激动").say("住手！33会把你们都做成切糕的！放开我，你们这群煤球怪！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b13 = [function() {
                return t.vega.face("严肃").say("嗯！总之先想办法离开这儿，刚好下一班游客也进来了。")
            }
                , function() {
                    return t.scene.clear().at(r[0] - 200, r[1] + 100).animate().show()
                }
                , function() {
                    return t.fff.size("middle").from("left").at(0).say("嘻嘻～C组的那群白痴说这是最恐怖的项目，真是我团的耻辱——")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).show()
                }
                , function() {
                    return t.fff.say("别挤啊！怎么还有往回走的！这个星球的素质真是……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).show()
                }
                , function() {
                    return t.vega.from("right").at(4).face("黑线").say("又、又来了一群？竟然这么碰上……")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).show()
                }
                , function() {
                    return t.fff.at(3).animate().say("咦？？？竟然就这么捡到了22哈哈哈，你还有心情四处游玩吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).show()
                }
                , function() {
                    return t.vega.face("激动").say("你们……住手！等——放开我！你们这些煤球怪！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b14 = [function() {
                return t.scene.at(-400, 0, !0).show()
            }
                , function() {
                    return t.fff.size("middle").say("呕……竟然就这么自己——伙计们！22在这儿！！呕——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).show()
                }
                , function() {
                    return t.vega.face("惊讶").say("什么，旁边还埋伏了其他F^3小电视！？是陷阱吗……")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).show()
                }
                , function() {
                    return t.fff.at(3).animate().say("哈哈哈我们绝对不是不敢上车才躲在一旁哟！这就是直觉的力量！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).show()
                }
                , function() {
                    return t.vega.face("激动").say("你们……住手！等——放开我！你们这些煤球精！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b15 = [function() {
                return t.scene.clear().at(i[0], i[1]).animate(800).show()
            }
                , function() {
                    return t.vega.face("紧张").from("right").at(3).say("里面很暗呢。还好游客也很多，F^3们应该暂时不会察觉什么吧？")
                }
                , function() {
                    return t.vega.face("惊讶").say("这张海报是——“今日特别剧目”？我们闯进了什么演出现场吗？")
                }
                , function() {
                    return t.vega.face("担心").say("总觉得是个让人不安的地方。要是33在这，他会怎么做呢……")
                }
                , function() {
                    return t.branch.open([{
                        content: "调查清楚，靠近台前观察吧",
                        callback: function() {
                            return t.loadAndNext(e.b20, 2, 1)
                        }
                    }, {
                        content: "有点可疑，混在后排人群里",
                        callback: function() {
                            return t.loadAndNext(e.b21, 2, 2)
                        }
                    }])
                }
            ],
            e.b16 = [function() {
                return t.scene.clear().at(o[0], o[1]).animate(800).show()
            }
                , function() {
                    return t.vega.face("生气").from("left").at(3).say("只能看着它们吃雪糕很不甘呢，我和33一直都很像试试……")
                }
                , function() {
                    return t.vega.face("疑惑").say("话说它们应该没有这个星球的货币呀。")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("small").at(9).from("right").say("哟，老板～我们是代表宇宙和平的F^3萌团，可以募捐一打雪糕吗？")
                }
                , function() {
                    return t.fff.say("我们的团员生了奇怪的病，要吃雪糕才能下床≖‿≖✧")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("从某些角度看，可以说是一些非常无耻的生物了")
                }
                , function() {
                    return t.vega.face("生气").say("但是连这种奇怪的勒索理由都能接受的老板也心太宽了吧！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("嘿嘿～谢谢老板！来一打鸡肉味儿的！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("它们……是要了咸的雪糕？")
                }
                , function() {
                    return t.vega.face("生气").size("large").say("而且连这都能满口答应做出来的雪糕站老板也太诡异了吧！！")
                }
                , function() {
                    return t.vega.face("激动").say("不行！！香草和草莓才是充满正义感的味道！我们必须阻止它们！")
                }
                , function() {
                    return t.branch.open([{
                        content: "为了这个暴露自己也很奇怪吧！",
                        callback: function() {
                            return t.loadAndNext(e.b17, 2, 1)
                        }
                    }, {
                        content: "无法忍受！叫来保安教训它们",
                        callback: function() {
                            return t.loadAndNext(e.b6, 2, 2)
                        }
                    }])
                }
            ],
            e.b17 = [function() {
                return t.vega.face("脸红").size("middle").say("你说得对……幸好不是33看到这一幕，不然他一定忍不住的。")
            }
                , function() {
                    return t.vega.face("疑惑").say("它们带着雪糕离开了！……咦，它们好像没有打算去之前的帐篷？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("今天果然是实现梦想的日子啊哈哈哈，让帐篷的笨蛋们等着吧～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("果然只是想顾自玩而已啊……它们上到摩天轮了？")
                }
                , function() {
                    return t.vega.face("生气").say("可恶……都是我和33想做的事情哼！")
                }
                , function() {
                    return t.branch.open([{
                        content: "不是和它们赌气的时候吧",
                        callback: function() {
                            return t.loadAndNext(e.b19, 3, 1)
                        }
                    }, {
                        content: "确实，这些家伙真是过分",
                        callback: function() {
                            return t.loadAndNext(e.b19, 3, 2)
                        }
                    }])
                }
            ],
            e.b19 = [function() {
                return t.vega.face("大笑").say("说得对，我们继续跟着它们吧，看看这帮家伙到底想干什么！")
            }
                , function() {
                    return t.scene.clear().at(c[0], c[1]).animate(800).show()
                }
                , function() {
                    return t.vega.face("大笑").at(3).from("right").say("呼～终于能坐下了！多亏你提议跟在它们后面坐上摩天轮呢。")
                }
                , function() {
                    return t.vega.face("微笑").say("而且这里能看到的景色……33要是在就好了。")
                }
                , function() {
                    return t.vega.size("large").face("脸红").say("那家伙虽然总是一脸没兴趣的样子，但其实很在意我喜欢的东西。")
                }
                , function() {
                    return t.vega.face("大笑").say("如果33在这儿，大概已经在假装无聊开始抱怨了吧～")
                }
                , function() {
                    return t.vega.face("脸红").say("啊，对不起，光顾着讲自己的事情了……")
                }
                , function() {
                    return t.fff.size("middle").at(-3, 0).from("left").say("哈哈哈，你们要珍惜这个场景哦，之后可就见不到了！")
                }
                , function() {
                    return t.vega.size("middle").face("惊讶").say("前面的F^3小电视！？什么时候发现我们了吗？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("人类都这么迟钝吗，摩天轮停下来了都没有发现？我们可等了半天哟～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("伤心").say("糟糕，是我太粗心了。对不起，这下连你也……")
                }
                , function() {
                    return t.fff.at(1).animate().say("比起道歉，你更应该担心自己的处境吧，嘿嘿～")
                }
                , function() {
                    return t.vega.face("激动").say("怎么办，它们要过来了——走、走开！你们这群吃咸雪糕的异端！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b20 = [function() {
                return t.vega.size("middle").face("紧张").say("好像快开始了。我们呆在这里看演出真的没问题吗……")
            }
                , function() {
                    return t.vega.face("微笑").say("你说得对，什么头绪都没有的时候更应该冷静一些。")
                }
                , function() {
                    return t.altair.rename("少年").say("当当～LADIES AND GENTLEMEN！欢迎来到今天的特别演出！")
                }
                , function() {
                    return t.altair.say("在那个特殊的日子来临之际，我们请出到一位独一无二特邀演员！TA来自遥远的星球，寻找着自己的爱人……")
                }
                , function() {
                    return t.altair.say("（小声）呼——没露馅吧？不过我竟然同意了那家伙的鬼主意TAT")
                }
                , function() {
                    return t.vega.face("疑惑").say("这熟悉又不详的预感……不，不会吧。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.withShow().posture("普通").face("面瘫").at(-3).from("left").size("exSmall").say("轻声！那边窗子里亮起来的是什么光？那就是东方，朱丽叶就是太阳！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("33！真的是33吗！！为什么你会出现在那儿啊！？")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("微笑").say("她说话了。啊！再说下去吧，光明的天使！因为我在这夜色之中仰视着你——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("脸红").say("这家伙……快下来！")
                }
                , function() {
                    return t.vega.face("黑线").say("搞什么鬼！！你会被F^3发现的！")
                }
                , function() {
                    return t.branch.open([{
                        content: "别管他！肯定是FFF小电视的陷阱",
                        callback: function() {
                            return t.loadAndNext(e.b22, 3, 1)
                        }
                    }, {
                        content: "快让他下来！FFF小电视也在附近",
                        callback: function() {
                            return t.loadAndNext(e.b23, 3, 2)
                        }
                    }])
                }
            ],
            e.b21 = [function() {
                return t.vega.face("疑惑").size("small").at(3, 1).say("后面出奇地安静——似乎没有什么人来。不是有演出吗，难道大家都已经去前面了？")
            }
                , function() {
                    return t.vega.face("惊讶").say("诶，这里有个出口……是通往帐篷外的！")
                }
                , function() {
                    return t.boy.think("等等，那些身影是……FFF小电视吗？看样子似乎忽然有了急事，不会是有了33的消息吧！？")
                }
                , function() {
                    return t.branch.open([{
                        content: "太可疑了，还是先回台前察看",
                        callback: function() {
                            return t.loadAndNext(e.b20, 3, 1)
                        }
                    }, {
                        content: "肯定有事发生，追出去看看",
                        callback: function() {
                            return t.loadAndNext(e.b24, 3, 2)
                        }
                    }])
                }
            ],
            e.b22 = [function() {
                return t.vega.face("紧张").size("large").say("但这是33啊，我不会认错的！")
            }
                , function() {
                    return t.vega.face("生气").say("不阻止他的话，这个笨蛋会一直杵在那儿的！")
                }
                , function() {
                    return t.loadAndNext(e.b23)
                }
            ],
            e.b23 = [function() {
                return t.vega.face("大笑").size("middle").say("33！我在这儿！这里很危险，快下来吧！")
            }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.rename().face("生气").size("small").say("这笨蛋——别傻站着！快跑！！它们已经靠到你背后了！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("middle").at(9, 0).from("right").say("哈哈哈，真是感人的剧目！不过似乎要被腰斩了哦～")
                }
                , function() {
                    return t.fff.say("虽然不知道你们在搞什么花样，能同时逮到真是太好了哈哈。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.altair.face("生气").size("middle").say("真是个蠢货……好不容易把它们引过来。直接跑不就行了！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("放开我们！你们这些不懂欣赏的煤球怪！！")
                }
                , function() {
                    return t.scene.at(-200, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.at(0).animate().say("嘿嘿嘿，不如试试我们准备的故事线——把这两位主演带走！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.b24 = [function() {
                return t.scene.clear().at(i[0] + 100, i[1] - 100).animate().show()
            }
                , function() {
                    return t.vega.size("middle").face("惊讶").at(3).from("right").say("可恶，怎么挤过两拨人群就跟丢了呢。你看到它们了吗？明明是在这里拐的弯啊。")
                }
                , function() {
                    return t.vega.face("伤心").say("要是33真的已经被它们找到了，我该怎么办呢……只凭两个人怎么都解救不了他，我自己逃走也没什么意义了……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.size("middle").at(9, 0).face("大笑").from("right").at(9).say("所以不如和他一起回去接受我们的判决吧～22酱～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("你们！33在哪！！——是故意把我们带到这来的吗？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.face("大笑").say("哇哈哈哈哈哈嗝～作为逃跑的人未免太毫无心机了吧！你和33说不能今天还能见一面哟，你看摩天轮上面坐的是谁？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("33！！是你们把他骗到上面去的吗！？你们这些不择手段的易装癖！")
                }
                , function() {
                    return t.fff.face("大笑").at(4).animate().say("别急嘿嘿，你们就要见面了哟，现在的年轻人完全不懂感恩唉。")
                }
                , function() {
                    return t.vega.face("激动").say("33快跑！别让它们——放开我！！你们这些阴险狡诈的易装癖！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ]
    }(e = t.b || (t.b = {}))
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        var n = t.mapCoords.map2
            , a = n.gate
            , r = n.love
            , i = n.peace
            , o = n.reception
            , c = n.anteroom;
        e.map2 = [function() {
            return t.scene.then(function() {
                return t.interpreter.next()
            }).at(a[0], a[1])["with"]().create("ilidilid")
        }
            , function() {
                return t.boy.say("这边同好比较多，也算是个死宅能说上话的地方。")
            }
            , function() {
                return t.boy.say("找起来应该能方便点吧...")
            }
            , function() {
                return t.vega.withShow().posture("普通").face("微笑").size("middle").from("right").at(3).say("嗯嗯！")
            }
            , function() {
                return t.vega.face("大笑").say("看起来确实是个特别厉害的地方呢！")
            }
            , function() {
                return t.vega.face("疑惑").say("有一种奇怪的亲近感呢……这里真的有可以帮助我和33的人吗？")
            }
            , function() {
                return t.boy.say("去前台问问吧。")
            }
            , function() {
                return t.scene.clear().at(o[0], o[1]).animate().show()
            }
            , function() {
                return t.scene.at(-500, 0, !0).animate().show()
            }
            , function() {
                var e = t.six.rename("66 & 99").withShow().at(-5).from("left").show()
                    , n = t.nine.withShow().at(-1).from("left").show();
                return {
                    check: function() {
                        return e.check() && n.check()
                    },
                    exec: function() {
                        e.exec(),
                            n.exec()
                    }
                }
            }
            , function() {
                return t.six.say("欢迎！这里是ilidilid总部~有什么我们可以为您做的吗？")
            }
            , function() {
                return t.six.rename("66"),
                    t.scene.at(0, 0, !0).animate().show()
            }
            , function() {
                return t.vega.face("脸红").say("诶诶，你们是？（小声）好...好帅")
            }
            , function() {
                return t.vega.say("忽然这么问的话——那个，你们俩的联系方式……")
            }
            , function() {
                return t.vega.face("大笑").say("哈哈哈，开玩笑啦，别那么盯着我！我可没忘了F^3小电视们和33的事！！")
            }
            , function() {
                return t.branch.open([{
                    content: "先在这打听消息吧",
                    callback: function() {
                        return t.loadAndNext(e.c1, 0, 1, 5)
                    }
                }, {
                    content: "寻找帮手比较实际",
                    callback: function() {
                        return t.loadAndNext(e.c2, 0, 2, 5)
                    }
                }])
            }
        ],
            e.c1 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("哟嗬~我叫66，是ilidilid总部的八卦部长兼接待员！两位有什么需要问询的么？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("真是存在感强烈的职务呢——什么都可以问吗？")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("当然咯！不管是天气预报还是都市传说，甚至连99的三围尺寸……")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.nine.say("啊哈哈哈哈总之什么都可以就是了！！请不用反复确认，尽管问他就好！！")
                }
                , function() {
                    return t.branch.open([{
                        content: "我们在寻找一个叫33的人……",
                        callback: function() {
                            return t.loadAndNext(e.c3, 1, 1, 5)
                        }
                    }, {
                        content: "有关于F^3小电视的情报吗？",
                        callback: function() {
                            return t.loadAndNext(e.c4, 1, 2, 5)
                        }
                    }])
                }
            ],
            e.c2 = [function() {
                return t.scene.at(-400, 0, !0).animate().show()
            }
                , function() {
                    return t.nine.say("可以提供帮助的人——忽然这么问起来，我也不能确定呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("紧张").say("那个……请不用过于在意！我们只是问问……")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.nine.say("哪里~虽然我和66不方便离开岗位，ilidilid总部一定还有可以援助你们的人的！")
                }
                , function() {
                    return t.nine.say("那个方向就是我们的公共休息室，试着问问房间里面的人吧~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("微笑").say("谢谢~说不定能遇见厉害的人物呢！")
                }
                , function() {
                    return t.vega.face("疑惑").say("不过……似乎有两扇门？我们应该选哪个房间？")
                }
                , function() {
                    return t.branch.open([{
                        content: "门牌写着“LOVE”的房间",
                        callback: function() {
                            return t.loadAndNext(e.c13, 1, 1, 5)
                        }
                    }, {
                        content: "门牌写着”PEACE”的房间",
                        callback: function() {
                            return t.loadAndNext(e.c14, 1, 2, 5)
                        }
                    }])
                }
            ],
            e.c3 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("诶，是叫33吧？真是奇怪，刚有其他人来问关于他的事哦。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("咦？33和我都是第一次来这个星球，应该没有其他人认识他啊……")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("对方看起来也挺着急的样子呢。33听起来是个很受欢迎的人哟~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("会是谁呢……等一下，该不会是它们也找到这里了吧！")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("那个人还没有离开哦。两位要去接待室见一见TA吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("large").face("担心").say("呐，要去见见吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "不能错过机会，去见一面",
                        callback: function() {
                            return t.loadAndNext(e.c5, 2, 1, 5)
                        }
                    }, {
                        content: "很可能是F^3，躲过它们",
                        callback: function() {
                            return t.loadAndNext(e.c6, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c4 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("啊！你是说那些黑乎乎圆滚滚又特别有礼貌的小家伙么~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("小……家伙？你似乎对它们有什么误解哦。")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("真的是一群奇怪又好玩的生物呢，之前一上来就送了我火把做见面礼！")
                }
                , function() {
                    return t.six.say("而且听说它们原来是外星的守护者，因为长得太萌被流放到这儿——太过分了！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("large").face("黑线").say("喂！出现了不得了的误会啊！！不要什么都笑着相信啊！！")
                }
                , function() {
                    return t.vega.face("生气").say("那些家伙——竟然已经来过这里了，还扯一通慌。哼！")
                }
                , function() {
                    return t.branch.open([{
                        content: "不能让它们得逞，必须拆穿谎话",
                        callback: function() {
                            return t.loadAndNext(e.c9, 2, 1, 5)
                        }
                    }, {
                        content: "66似乎很喜欢它们，先打听下去",
                        callback: function() {
                            return t.loadAndNext(e.c10, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c5 = [function() {
                return t.scene.clear().at(c[0], c[1]).animate().show()
            }
                , function() {
                    return t.vega.size("middle").face("微笑").at(3).from("right").say("呼~幸好不是F^3，我们运气不错呢。")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.withShow().size("small").at(8).from("right").say("……你们是？33的朋友吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("虽然应该先问好——不过你是谁！为什么会认识我家33！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.size("middle").say("啊！！！你一定是22吧？33也在找你！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("你……见过33！？33呢，33也在这里吗？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.say("其实……33在找你时被F^3带走了，我是……我是来这里求助的。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("large").face("伤心").say("怎么会……33怎么可能这么容易被带走！")
                }
                , function() {
                    return t.vega.size("middle").face("激动").say("33一定还在附近，我要去找他！！")
                }
                , function() {
                    return t.branch.open([{
                        content: "阻止22，这样只是自投罗网",
                        callback: function() {
                            return t.loadAndNext(e.c7, 3, 1, 5)
                        }
                    }, {
                        content: "说不定还能找回33，一起去",
                        callback: function() {
                            return t.loadAndNext(e.c8, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c6 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("说起来，从刚才起就听到你们提到F^3——你们也认识这些好玩的家伙吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("large").face("疑惑").say("你见过他们！不过……好玩？？？你似乎对它们有什么误解啊……")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("它们早些时候也来找2233——这么说起来，你就是22吧？")
                }
                , function() {
                    return t.six.say("F^3们特别担心你和33呢，说因为朋友间的误会和你们俩走散了？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("开什么玩笑，F^3才是把我和33分开的家伙！它们根本是万恶之源！！")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("咦，它们明明很有礼貌，还给带了许多火把做礼物，特别有意思呢~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("large").face("生气").say("这个笨蛋完全被F^3圈粉了……该怎么和他说？")
                }
                , function() {
                    return t.branch.open([{
                        content: "你被F^3耍得团团转，醒醒吧！",
                        callback: function() {
                            return t.loadAndNext(e.c11, 3, 1, 5)
                        }
                    }, {
                        content: "算是事实吧，请帮我们一个忙！",
                        callback: function() {
                            return t.loadAndNext(e.c12, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c7 = [function() {
                return t.scene.at(400, 0, !0).animate().show()
            }
                , function() {
                    return t.girl.say("他说得没错，请你冷静一点——33一定也还在想办法的。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("担心").say("我明白。但33就在这附近，又被F^3们找到了——")
                }
                , function() {
                    return t.vega.size("large").face("严肃").say("对不起。无论如何我都想让33知道我在哪儿，就算帮不了他……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.say("两个人一样固执呢……33被带走我多少也有责任，一起去吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.loadAndNext(e.c8)
                }
            ],
            e.c8 = [function() {
                return t.vega.size("middle").face("微笑").say("谢谢你们！如果没有你们，我和33或许早就……之后也拜托了！")
            }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(-2).from("left").say("嘿嘿，不顺便感谢我们吗？我们可是一直都关心着你和33哦——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3小电视！！为什么这么快出现在门口？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("多亏了前台的八卦小哥呢~一打听就开开心心地告诉我们你的下落了哈。")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.say("应该说那家伙太热心还是太单纯呢……不，只是猪队友而已吧。")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("不要辜负66酱的心意哟，22，乖乖和我们回去吧~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("妄想！你们这些煤球怪！把33还给我！！")
                }
                , function() {
                    return t.fff.at(2).animate().say("33也在等你哟，快跟我们走吧~再给别人带来麻烦可不好哈哈。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("放开我！33一定会有办法教训你们！！走开——")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c9 = [function() {
                return t.vega.face("严肃").say("对！绝不能让那些没一句实话的家伙骗下去。")
            }
                , function() {
                    return t.vega.size("middle").face("生气").say("66！F^3是一群毫无底线的邪恶生物，就是它们把我和33分开的！")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("咦，它们也提到33了哟。其实它们很关心你们俩，一直在到处找你们呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("你这家伙，都说不要什么都嘻嘻哈哈地相信了啊！！！")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("它们确实说和你们发生了什么误会哦~不要赌气嘛，一起坦诚地解决问题吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("啊啊啊——无可救药！！！F^3那群小骗子……我放弃！你来跟66说吧。")
                }
                , function() {
                    return t.branch.open([{
                        content: "你被F^3耍得团团转，醒醒吧！",
                        callback: function() {
                            return t.loadAndNext(e.c11, 3, 1, 5)
                        }
                    }, {
                        content: "就算是事实吧，请帮我们一个忙！",
                        callback: function() {
                            return t.loadAndNext(e.c12, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c10 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("不过F^3们似乎在我没注意的时候离开了～你们在找它们吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("紧张").say("没，没有！只是刚好听到……其实我还是不要和它们见面的好哈。")
                }
                , function() {
                    return t.vega.face("担心").say("它们……有没有提起关于33的事？")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("好像有提到哦。嘿嘿～是不是你和33都惹它们生气啦？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("large").face("黑线").say("和这个被蒙蔽的迷弟完全不在一个频道上啊……")
                }
                , function() {
                    return t.vega.face("疑惑").say("我们该怎么和他说？")
                }
                , function() {
                    return t.branch.open([{
                        content: "其实F^3是拆散情侣的邪恶生物",
                        callback: function() {
                            return t.loadAndNext(e.c11, 3, 1, 5)
                        }
                    }, {
                        content: "22和33因为误会要暂时躲着F^3",
                        callback: function() {
                            return t.loadAndNext(e.c12, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c11 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("抱歉，在无法看到证据的情况下，我也无法轻易赞同你们哦。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("你这个……真是气人！！简直比F^3小电视还气人！！！")
                }
                , function() {
                    return t.scene.at(-600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("虽然无法达成一致的样子，我还是可以先带你们参观一下总部哦~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("生气").say("才不要！会被你活活气死吧。你们继续怀念F^3吧，我要去找33了！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("哈哈哈，这不是22么，怎么这就要离开ilidilid总部了，聊得不尽兴？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("你们……一直等在门口吗！？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("其实是来找66的哟，真是可爱的男孩子啊！刚好又找到你，真是奇妙的缘分呢~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("你们这些扯谎精！把他蒙在鼓里还想做什么！！")
                }
                , function() {
                    return t.fff.at(4).animate().say("别生气嘛，现在也不需要了嘿嘿——既然你已经自己送上门来。")
                }
                , function() {
                    return t.vega.face("激动").say("走开！！谎话连篇的煤球怪！！别碰我！！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c12 = [function() {
                return t.scene.at(-600, 0, !0).animate().show()
            }
                , function() {
                    return t.six.say("嗯？因为那个误会和F^3闹翻而且要找到33？我明白了……请稍等~")
                }
                , function() {
                    return t.six.from("right").hide()
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("诶？别走——喂！这家伙怎么不好好听别人说话啊！！")
                }
                , function() {
                    return t.scene.at(600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.at(8).from("right").say("哟嗬~久等啦，误会的事就包在我身上吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("黑线").say("哈？你……做了什么？")
                }
                , function() {
                    return t.scene.at(600, 0, !0).animate().show()
                }
                , function() {
                    return t.six.say("之前F^3们把联系方式留给我了哦，我已经把它们叫来啦！")
                }
                , function() {
                    return t.fff.withShow().at(11).from("right").say("嘿嘿嘿嘿，对嘛，当面把误会解开不就好了~66真是贴心的男孩子呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("你们……都说了你被骗了啊！！！而且不要在关键的时候擅作主张啊！")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘛嘛，她一定是还在为了误会生气，跟我们回去慢慢说就好了哟~")
                }
                , function() {
                    return t.vega.face("生气").say("闭嘴！你们这些扯谎成性的煤球精！！")
                }
                , function() {
                    return t.vega.face("激动").say("别过来！！走开！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c13 = [function() {
                return t.scene.clear().at(r[0], r[1]).animate().show()
            }
                , function() {
                    return t.vega.face("紧张").at(3).from("right").say("打扰了！你们好……")
                }
                , function() {
                    return t.scene.at(-650, 0, !0).animate().show()
                }
                , function() {
                    var e = t.yato.withShow().at(-6).from("left").show()
                        , n = t.rem.withShow().at(-2).from("left").show();
                    return {
                        check: function() {
                            return e.check() && n.check()
                        },
                        exec: function() {
                            e.exec(),
                                n.exec()
                        }
                    }
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("hmmmm……今年获胜的竟然是这两个家伙。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("hmmmm……今年获胜的果然是这两个家伙。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("诶，压根没有看到我们吗？请，请问——")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("凡人，我注意到你们了。你们是来侍奉还是许愿的？")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("没有魔女的气息——不过有点混乱呢，这两位客人。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("完全不知所云吗，真的指望得上吗……不过，为什么看起来有点眼熟？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("这里是属于MOE之王的房间。你们祈求帮助的愿望，我确实地听到了。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("large").face("生气").say("从进门起就完全搭不上话啊……我们还要向他们求助吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "看起来至少不是坏人吧",
                        callback: function() {
                            return t.loadAndNext(e.c15, 2, 1, 5)
                        }
                    }, {
                        content: "完全没办法沟通的样子",
                        callback: function() {
                            return t.loadAndNext(e.c16, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c14 = [function() {
                return t.scene.clear().at(i[0], i[1]).animate().show()
            }
                , function() {
                    return t.vega.face("紧张").at(3).from("left").say("里面意外地大呢……你好~有人吗？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.withShow().size("small").at(9).from("right").say("所到何人！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("吓！？……不要坐在角落里又突然大声说话啊！！")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.size("middle").at(8).animate().say("你们也是来接受ilidilid礼仪测试的吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("不不，我们是来寻求帮助的……")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.say("无论是谁，进入这里都要接受UP评审团正义的判决！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("UP评审团？那是什么……")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.say("通过测试就可以获得吾辈庇护，失败者将被驱逐。作好准备！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("从刚才起就完全没有听我说话吧……哼，放马过来！")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.up.say("第一题！如果真爱有颜色，那一定是：")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("喂……这真是礼仪测试吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "一定是……蓝色！",
                        callback: function() {
                            return t.loadAndNext(e.c19, 2, 1, 5)
                        }
                    }, {
                        content: "一定是……绿色！",
                        callback: function() {
                            return t.loadAndNext(e.c19, 2, 2, 5)
                        }
                    }])
                }
            ],
            e.c15 = [function() {
                return t.vega.face("担心").say("硬着头皮再试试吧……")
            }
                , function() {
                    return t.vega.size("middle").face("疑惑").say("两位的身份是？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("我？我是一个省钱迅捷又令人安心的配送神明。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("我是？嗯，这件事值得找姐姐确认一下呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("紧张").say("虽然还是听不出什么头绪……可以请你们帮助我吗！")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("既然出现在这里，汝即为有缘人。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("可怜的客人，恭维话的水准也令人绝望，忍不住让人想帮一下呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("微笑").say("这么说……你们愿意保护我们，帮我找到33？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("你以为我当了多少年的神明？这样的事简单得很！不过——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("——不过？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("人家很享受让人脸红心跳的偶像生活呢！你要成为侍奉我的人吗？")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("暴露了呢，脑袋里的下流妄想——呐呐，你们要做我们的粉丝吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("脸红").say("诶？但我刚认识你们……怎么办，似乎是有代价的援助？")
                }
                , function() {
                    return t.branch.open([{
                        content: "也不会有什么损失，先答应吧",
                        callback: function() {
                            return t.loadAndNext(e.c17, 3, 1, 5)
                        }
                    }, {
                        content: "这根本是在趁火打……圈粉吧！",
                        callback: function() {
                            return t.loadAndNext(e.c18, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c16 = [function() {
                return t.vega.size("middle").face("生气").say("真是……还以为可以在这找到强大的帮手。")
            }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("鲁莽而又无知的客人。姐姐看到了一定会生气的。")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("强大？你以为我当了多少年的神明？做一个帮手有什么难的！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("神、神明！？那你们愿意帮助我找一个叫33的人吗？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("当然。但汝当自证为有缘人。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("姐姐也说不要随意信任陌生人哦——呐呐，你要做我们的粉丝吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("脸红").say("咦？忽然提出这样的要求来……")
                }
                , function() {
                    return t.branch.open([{
                        content: "也不会有什么损失，先答应吧",
                        callback: function() {
                            return t.loadAndNext(e.c17, 3, 1, 5)
                        }
                    }, {
                        content: "这根本是在趁火打……圈粉吧！",
                        callback: function() {
                            return t.loadAndNext(e.c18, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c17 = [function() {
                return t.vega.face("微笑").say("那……好吧，我们愿意成为两位的粉丝。")
            }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("嘿嘿——愿你我不失此缘。欢迎加入我的侍奉者之列！")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("那么，喜欢我们，从这里开始吧——和它们一起~出来吧！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("呃，它……们？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("也是刚刚宣誓侍奉于我们的粉丝团哦，承载着相同的缘分，相信它们也会一起帮助你！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("嗷嗷嗷嗷~燃王大人帅翻了！！！萌王大人赛高~")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3小电视！？它们为什么会在你们的粉丝团里！！")
                }
                , function() {
                    return t.vega.face("黑线").say("仔细想想……应该说一点都不意外吧，这群四处捣乱的家伙……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("咦！22酱也成了我们家燃王和萌王大人的粉丝吗？")
                }
                , function() {
                    return t.fff.say("实在是神奇的缘分呢哈哈哈哈，都不忍心把你抓走了哟。")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("你们已经认识了？今天的客人都有着强大的羁绊呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("这种羁绊一点都不想要啊！结果以奇怪的方式跳进了火坑……")
                }
                , function() {
                    return t.fff.at(4).animate().say("成为萌王大人的粉丝真是太幸福了哈哈！来吧，你已经跑不了了~")
                }
                , function() {
                    return t.vega.face("激动").say("话说你们根本是伪粉吧！！走开！！！别过来！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c18 = [function() {
                return t.scene.at(-800, 0, !0).animate().show()
            }
                , function() {
                    return t.yato.say("冥顽不灵的人，对神明不可以这么无理哦！")
                }
                , function() {
                    return t.scene.at(-500, 0, !0).animate().show()
                }
                , function() {
                    return t.rem.say("毫无礼节的客人。和它们比起来过分很多呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("疑惑").say("呃，它……们？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("嗷嗷嗷嗷~萌王大人！是有人对萌王大人无礼了吗？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3小电视！？它们为什么也在这儿！！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哟~这不是22么？竟然自己跑出来，还敢对萌王大人不敬？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("等等……你们这些家伙……是组了粉丝团吗？")
                }
                , function() {
                    return t.scene.at(-800, 0, !0).animate().show()
                }
                , function() {
                    return t.yato.say("它们是今天造访的有缘之人。已经宣誓侍奉于吾——")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("嗷嗷嗷嗷~燃王sama！太帅了！！！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("给我适可而止吧！话说你们原来根本不认识这两个人吧！！")
                }
                , function() {
                    return t.fff.at(4).animate().say("哼，不知悔改的家伙——快把她从两位大人眼前挪走！")
                }
                , function() {
                    return t.vega.face("激动").say("别碰我！你们这些伪粉！煤球怪！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.c19 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.up.say("NO.2！正确对待名为“UP”的生物的姿势是：")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.branch.open([{
                        content: "屏蔽、拉黑、举报套餐！",
                        callback: function() {
                            return t.loadAndNext(e.c20, 3, 1, 5)
                        }
                    }, {
                        content: "关注、投喂、分享套餐！",
                        callback: function() {
                            return t.loadAndNext(e.c22, 3, 2, 5)
                        }
                    }])
                }
            ],
            e.c20 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.up.say("最后！第二星际委员会233号决案通过的标准豆浆食用方式是：")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.branch.open([{
                        content: "搭配蛋黄酱或者炼乳！",
                        callback: function() {
                            return t.loadAndNext(e.c22, 4, 1, 5)
                        }
                    }, {
                        content: "搭配酱油和大量葱花！",
                        callback: function() {
                            return t.loadAndNext(e.c22, 4, 2, 5)
                        }
                    }])
                }
            ],
            e.c22 = [function() {
                return t.scene.at(300, 0, !0).animate().show()
            }
                , function() {
                    return t.up.say("异——异端！彻头彻尾的异端！秩序团呢？把他们俩轰出去！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("忽然变得激动呢……问出这样问题的家伙才是异端吧！？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(-2).from("left").say("来啦~审判长大人。这就把他们带走哈哈哈。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("F^3小电视？果然是你们搞的鬼！")
                }
                , function() {
                    return t.fff.at(2).animate().say("嘿嘿你们可是触犯了不得了的禁忌呢，乖乖跟我们走吧~")
                }
                , function() {
                    return t.vega.face("激动").say("你们是怎么混进这儿的？别过来！煤球怪！！放开我！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ]
    }(e = t.b || (t.b = {}))
}(scenario || (scenario = {}));
var GAL;
!function(t) {
    var e = function(e) {
        function n() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.animate = function() {
                if (t.currentCursor === t.wordsLength)
                    return void t.endAnimate();
                var e = Date.now() - t.startTime
                    , n = ~~(e * t.cps / 1e3);
                n !== t.currentCursor && (t.charWords.text = t.words.substr(0, t.currentCursor),
                    t.currentCursor = n),
                    requestAnimationFrame(t.animate)
            }
                ,
                t.createAnimate = function() {
                    t.currentCursor = 0,
                        t.startTime = Date.now(),
                        t.wordsLength = t.words.length,
                        t.animate()
                }
                ,
                t.endAnimate = function() {
                    t.currentCursor = t.wordsLength,
                        t.charWords.text = t.words
                }
                ,
                t.checkAnimationEnd = function() {
                    return t.currentCursor === t.wordsLength
                }
                ,
                t
        }

        return __extends(n, e),
            n.prototype.onAddToStage = function() {
                this.bg = new egret.Bitmap,
                    this.bg.name = "bg",
                    this.charName = new egret.TextField,
                    this.charName.name = "name",
                    this.charName.textAlign = "center",
                    this.charName.stroke = 2,
                    this.charWords = new egret.TextField,
                    this.charWords.name = "words",
                    this.charWords.multiline = !0,
                    this.charWords.stroke = 1,
                    this.width = this.stage.stageWidth,
                    this.height = this.stage.stageWidth * t.DIALOG_SIZE_LUT.adv.height / t.DIALOG_SIZE_LUT.adv.width,
                    this.y = this.stage.stageHeight - t.DIALOG_SIZE_LUT.adv.height,
                    this.charName.textAlign = egret.HorizontalAlign.LEFT,
                    this.charName.x = t.DIALOG_SIZE_LUT.adv.nameLeft,
                    this.charName.size = t.DIALOG_SIZE_LUT.adv.nameSize,
                    this.charName.y = t.DIALOG_SIZE_LUT.adv.nameTop,
                    this.charWords.width = t.DIALOG_SIZE_LUT.adv.wordsWidth,
                    this.charWords.x = t.DIALOG_SIZE_LUT.adv.wordsLeft,
                    this.charWords.y = t.DIALOG_SIZE_LUT.adv.wordsTop,
                    this.charWords.size = t.DIALOG_SIZE_LUT.adv.wordsSize,
                    this.charWords.lineSpacing = t.DIALOG_SIZE_LUT.adv.wordsLineSpacing,
                    this.addChild(this.bg),
                    this.addChild(this.charName),
                    this.addChild(this.charWords),
                    e.prototype.onAddToStage.call(this)
            }
            ,
            n.prototype.say = function(e, n) {
                return this.visible = !0,
                    this.bg.texture = RES.getRes(t.CHAR_ATTRS[e].bgPath),
                    this.charName.visible = !0,
                    this.charName.text = t.CHAR_ATTRS[e].name,
                    this.charName.strokeColor = t.CHAR_ATTRS[e].nameColor,
                this.charName.width > t.DIALOG_SIZE_LUT.adv.nameWidth && (this.charName.text = t.CHAR_ATTRS[e].name.substring(0, ~~(t.DIALOG_SIZE_LUT.adv.nameWidth / this.charName.size) + 1)),
                    this.cps = t.CHAR_ATTRS[e].cps,
                    this.words = n,
                    this.charWords.strokeColor = t.CHAR_ATTRS[e].wordsColor,
                    this.charWords.text = "",
                    this.createAnimate(),
                    {
                        check: this.checkAnimationEnd,
                        exec: this.endAnimate
                    }
            }
            ,
            n.prototype.think = function(e, n) {
                return this.visible = !0,
                    this.bg.texture = RES.getRes(t.CHAR_ATTRS[e].bgThinkPath),
                    this.charName.visible = !1,
                    this.charName.strokeColor = t.CHAR_ATTRS[e].nameColor,
                    this.cps = t.CHAR_ATTRS[e].cps,
                    this.words = n,
                    this.charWords.strokeColor = t.CHAR_ATTRS[e].wordsColor,
                    this.charWords.text = "",
                    this.createAnimate(),
                    {
                        check: this.checkAnimationEnd,
                        exec: this.endAnimate
                    }
            }
            ,
            n
    }(t.Dialog);
    t.ADVDialog = e,
        __reflect(e.prototype, "GAL.ADVDialog")
}(GAL || (GAL = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        var n = t.mapCoords.map3
            , a = n.entry
            , r = n.brige
            , i = n.river
            , o = n.tree
            , c = n.room
            , s = n.yard
            , u = n.well
            , f = "";
        e.map3 = [function() {
            return t.scene.then(function() {
                return t.interpreter.next()
            }).at(a[0], a[1])["with"]().create("outskirts")
        }
            , function() {
                return t.boy.say("如果是要躲避追捕，人烟稀少的地方应该比较合适吧。")
            }
            , function() {
                return t.vega.withShow().posture("普通").face("微笑").size("middle").from("right").at(3).say("嗯，有道理！")
            }
            , function() {
                return t.scene.at(a[0] - 200, a[1] + 100).animate().show()
            }
            , function() {
                return t.scene.at(a[0] + 200, a[1] + 100).animate(1e3).show()
            }
            , function() {
                return t.scene.at(a[0], a[1]).animate().show()
            }
            , function() {
                return t.vega.face("微笑").say("这里……很安静。跟我和33居住的地方很像～")
            }
            , function() {
                return t.vega.size("large").face("大笑").say("说不定有一天可以请你去我们的星球做客呢，你一定也会喜欢那里的。")
            }
            , function() {
                return t.vega.face("担心").say("如果我们顺利回去的话……不知道33到哪儿了。")
            }
            , function() {
                return t.vega.face("严肃").say("嗯！我也相信我们会重遇的。不过——我们现在去哪呢？")
            }
            , function() {
                return t.branch.open([{
                    content: "先往河边走看看吧",
                    callback: function() {
                        return t.loadAndNext(e.d1, 0, 1, 10)
                    }
                }, {
                    content: "去前面的小屋问问",
                    callback: function() {
                        return t.loadAndNext(e.d2, 0, 2, 10)
                    }
                }])
            }
        ],
            e.d1 = [function() {
                return t.scene.clear().at(i[0], i[1]).animate(800).show()
            }
                , function() {
                    return t.vega.size("middle").face("微笑").say("我和33的屋子旁也有这样的一条河，忽然很怀念呢。")
                }
                , function() {
                    return t.vega.face("脸红").say("我们就是在那儿第一次见面的哟。那个一脸正经的家伙竟然偷看我……")
                }
                , function() {
                    return t.boy.say("难道是牛郎织女……")
                }
                , function() {
                    return t.vega.size("large").face("惊讶").say("诶？牛郎织女？没有听说过呢。")
                }
                , function() {
                    return t.vega.face("疑惑").say("就算你这么说……也只是巧合吧？")
                }
                , function() {
                    return t.vega.face("微笑").say("越来越想听你讲那个传说故事了，不过现在不是时候哦。")
                }
                , function() {
                    return t.branch.open([{
                        content: "等等，树上似乎画了东西？",
                        callback: function() {
                            return f = "tree",
                                t.loadAndNext(e.d3, 1, 1, 10)
                        }
                    }, {
                        content: "咦，水井边有奇怪的记号？",
                        callback: function() {
                            return f = "well",
                                t.loadAndNext(e.d4, 1, 2, 10)
                        }
                    }])
                }
            ],
            e.d2 = [function() {
                return t.scene.clear().at(c[0], c[1]).animate(800).show()
            }
                , function() {
                    return t.vega.size("middle").face("紧张").from("right").at(3).say("你好～有人吗？好像空着却没有锁门呢。")
                }
                , function() {
                    return t.vega.face("疑惑").say("院子里还有一只牛，应该有人住呀——")
                }
                , function() {
                    return t.vega.face("大笑").say("我和33也养了一只哟。是个懒散的家伙哈哈。")
                }
                , function() {
                    return t.boy.say("难道是牛郎织女……")
                }
                , function() {
                    return t.vega.face("惊讶").say("嗯？牛郎织女？……是这个星球的传说么？")
                }
                , function() {
                    return t.vega.size("large").face("微笑").say("可惜现在不是听故事的时候……要进屋看看吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "先去院子看看",
                        callback: function() {
                            return t.loadAndNext(e.d14, 1, 1, 10)
                        }
                    }, {
                        content: "进屋再说好了",
                        callback: function() {
                            return t.loadAndNext(e.d15, 1, 2, 10)
                        }
                    }])
                }
            ],
            e.d3 = [function() {
                return t.scene.clear().at(o[0], o[1]).animate().show()
            }
                , function() {
                    return t.vega.face("惊讶").from("left").at(3).size("middle").say("真的——等等，这是33的标记！")
                }
                , function() {
                    return t.vega.face("黑线").say("不会错的，只有他会把牛画得这么魔性。")
                }
                , function() {
                    return t.vega.face("生气").say("嗯？就是，谁会把牛画成仙人掌……只有那个笨蛋会这么画。")
                }
                , function() {
                    return t.vega.face("严肃").say("下面似乎还画了路线图哦，也是画得一样差劲哈……")
                }
                , function() {
                    return t.branch.open([{
                        content: "感觉可疑，先不管它",
                        callback: function() {
                            return t.loadAndNext(e.d5, 2, 1, 10)
                        }
                    }, {
                        content: "研究标记下的路线图",
                        callback: function() {
                            return t.loadAndNext(e.d6, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d4 = [function() {
                return t.scene.clear().at(u[0], u[1]).animate().show()
            }
                , function() {
                    return t.vega.face("紧张").from("right").at(3).size("middle").say("好像刻了什么字，看起来是很久以前留下的……")
                }
                , function() {
                    return t.vega.size("large").face("疑惑").say("你也不认识吗？这应该和33或者F^3也没什么关系。")
                }
                , function() {
                    return t.vega.face("黑线").say("仔细一看还在末尾刻了——斧子？这是什么远古的恶作剧吗。")
                }
                , function() {
                    return t.vega.face("微笑").say("也许只是多虑了，不过应该也没什么危险，要不要调查一下？")
                }
                , function() {
                    return t.branch.open([{
                        content: "有点好奇，往井口看看",
                        callback: function() {
                            return t.loadAndNext(e.d11, 2, 1, 10)
                        }
                    }, {
                        content: "既然不认识还是别靠近",
                        callback: function() {
                            return t.loadAndNext(e.d5, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d5 = [function() {
                return t.vega.size("middle").face("紧张").say("也对，我们应该小心一点，总觉得F^3会从哪窜出来……")
            }
                , function() {
                    return t.vega.face("担心").say("33一定也在四处找我，他会选择什么地方呢？")
                }
                , function() {
                    return t.vega.face("惊讶").say("咦，那里是——桥上有人在向我们招手？")
                }
                , function() {
                    return t.vega.face("紧张").say("看起来很着急，但听不清她的话……会是谁？")
                }
                , function() {
                    return t.branch.open([{
                        content: "过去问问，说不定知道些什么",
                        callback: function() {
                            return t.loadAndNext(e.d9, 3, 1, 10)
                        }
                    }, {
                        content: "不要接近陌生人为好，往回走",
                        callback: function() {
                            return t.loadAndNext(e.d10, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d6 = [function() {
                return t.vega.size("middle").face("严肃").say("嗯，要是沿着这个能顺利找到他就好了。")
            }
                , function() {
                    return t.vega.face("微笑").say("不过，他还能在这给我留下讯息，就说明是安全的呢。")
                }
                , function() {
                    return t.vega.face("紧张").say("你说的对，说不定F^3小电视也会看到这个。")
                }
                , function() {
                    return t.vega.size("large").face("微笑").say("我已经把路线记住了～我们现在怎么做？")
                }
                , function() {
                    return t.branch.open([{
                        content: "把记号和路线销毁",
                        callback: function() {
                            return t.loadAndNext(e.d7, 3, 1, 10)
                        }
                    }, {
                        content: "留下给33的讯息",
                        callback: function() {
                            return t.loadAndNext(e.d8, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d7 = [function() {
                return t.vega.size("middle").face("严肃").say("这确实是最稳妥的做法，总觉得F^3会从哪窜出来……")
            }
                , function() {
                    return t.vega.face("黑线").say("不过要记住那家伙糟糕的画真不容易呢，幸好有你帮忙。")
                }
                , function() {
                    return t.vega.face("疑惑").say("但我们走了这么久，似乎沿着路线图绕了不少圈哦……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("你们没有走错哟，能顺利找到这里真是太了不起了～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3！？你们……为什么会在这里？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("嘿嘿，你不是来找我们的吗？真伤人呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("担心").say("但那是33画的啊……我不会认错！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈，那当然是33的大作，我们不过在下面加了点小小的创意～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("你们……无赖！你们把33怎么样了？33在哪？？")
                }
                , function() {
                    return t.fff.at(4).animate().say("我们不是来接你见他了吗～毫无感恩之心的情侣呢。")
                }
                , function() {
                    return t.vega.face("激动").say("放——放开我！煤球怪！！黑芋头！！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d8 = [function() {
                return t.vega.size("middle").face("微笑").say("把那家伙的丑八怪牛头换成我的记号了～")
            }
                , function() {
                    return t.vega.face("严肃").say("这样就算33回到那里，也会发现我的讯息吧。")
                }
                , function() {
                    return t.vega.face("疑惑").say("但我们走了这么久，似乎沿着路线图绕了不少圈哦……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).say("你们没有走错哟，能顺利找到这里真是太了不起了～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3！？你们……为什么会在这里？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("嘿嘿，你不是来找我们的吗？真伤人呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("担心").say("但那是33画的啊……我不会认错！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈，那当然是33的大作，我们不过在下面加了点小小的创意～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("你们……无赖！你们把33怎么样了？33在哪？？")
                }
                , function() {
                    return t.fff.at(4).animate().say("我们不是来接你见他了吗～毫无感恩之心的情侣呢。")
                }
                , function() {
                    return t.vega.face("激动").say("放——放开我！煤球怪！！黑猪猡！！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d9 = [function() {
                return t.scene.clear().at(r[0], r[1]).animate().show()
            }
                , function() {
                    return t.boy.say("你是……？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.withShow().at(-1).from("left").say("你……是22吧？对不起，我只见过33所以不敢确定——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("惊讶").at(3).from("right").say("33！你见到33了吗？他在哪里？")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.say("他在找你……可是我们到这里后遇到了那些F^3小电视。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("紧张").say("F^3也在这？那33——")
                }
                , function() {
                    return t.scene.at(-400, 0, !0).animate().show()
                }
                , function() {
                    return t.girl.say("他被带走了……你们不该在这里瞎转了，快躲到其他地方去！")
                }
                , function() {
                    return t.scene.at(-700, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(-5).from("left").say("喂喂喂，作为路人不能这么粗暴地干涉故事线哦！")
                }
                , function() {
                    return t.boy.think("糟了！！它们果然还在附近，桥上太显眼了吗……")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("激动").say("F^3——把33还给我！你们这群黑芋头！！")
                }
                , function() {
                    return t.scene.at(-700, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈哈，小俩口的脾气一样火爆呢，33特意托我们照顾你哟。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("你们把他带到哪去了？33一定还在附近！")
                }
                , function() {
                    return t.fff.at(2).animate().say("连被逮到时都问着一样的问题呢～真是令人生气的默契啊～")
                }
                , function() {
                    return t.vega.face("激动").say("别过来——放开我！！你们这群煤球怪！！ ")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d10 = [function() {
                "well" === f ? t.scene.at(u[0], u[1] - 100).animate().show() : "tree" === f ? t.scene.at(o[0] + 100, o[1] + 100).animate().show() : t.scene.at(s[0] - 100, s[1]).animate().show()
            }
                , function() {
                    return t.boy.say("等——等等！不可以往那个方向走！！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(9).from("right").say("回答……正确！这个方向会遇到名为F^3吉祥物哟～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("紧张").say("F^3小电视！什么时候靠近的……")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("真是的，连热心的小哥哥都拦不住你和33奔向我们呢。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("33？你们已经把他……把33交出来！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈哈，小俩口的脾气一样火爆呢，33特意托我们照顾你哟。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("你们把他带到哪去了？33一定还在附近！")
                }
                , function() {
                    return t.fff.at(4).animate().say("连被逮到时都问着一样的问题呢～真是令人生气的默契啊～")
                }
                , function() {
                    return t.vega.face("激动").say("别过来——放开我！！你们这群煤球怪！！ ")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d11 = [function() {
                return t.scene.at(u[0] + 100, u[1] + 50).animate().show()
            }
                , function() {
                    return t.vega.size("middle").face("疑惑").say("嗯……忽然往里看眼睛还未适应呢。是吧，你也什么都看不到？")
                }
                , function() {
                    return t.vega.size("small").face("惊讶").at(3, 2).say("大概只是普通的——咦，似乎可以一直望向井底……")
                }
                , function() {
                    return t.vega.size("exSmall").face("激动").at(3, 3).say("好、好滑——啊啊啊啊！（扑通）")
                }
                , function() {
                    return t.scene.at(0, 0)["with"](400, "fade").create("black")
                }
                , function() {
                    return t.boy.think("诶诶诶？不是吧，22掉下去了！？")
                }
                , function() {
                    return t.boy.think("但完全没有其他声音传来……消失了？")
                }
                , function() {
                    return t.scene.at(u[0], u[1])["with"](400, "fade").create("outskirts")
                }
                , function() {
                    return t.tvh.withShow().at(3, -1).from("bottom").say("HOHOHO～平凡的少年啊，你是不是丢失了伙伴？")
                }
                , function() {
                    return t.boy.say("…………………………")
                }
                , function() {
                    return t.boy.say("等等等等这是啥？？？")
                }
                , function() {
                    return t.tvh.say("HOHOHO～少年哟，那么你丢失的是这个女帝22，病娇22，还是邻家22？")
                }
                , function() {
                    return t.tvh.say("HOHO……你这是什么表情？神仙也有很多爱好的哟。")
                }
                , function() {
                    return t.branch.open([{
                        content: "丢失了女帝22",
                        callback: function() {
                            return t.loadAndNext(e.d12, 3, 1, 10)
                        }
                    }, {
                        content: "丢失了病娇22",
                        callback: function() {
                            return t.loadAndNext(e.d12, 3, 2, 10)
                        }
                    }, {
                        content: "丢失了邻家22",
                        callback: function() {
                            return t.loadAndNext(e.d13, 3, 3, 10)
                        }
                    }])
                }
            ],
            e.d12 = [function() {
                return t.tvh.say("HOHOHO，贪心的少年哟，说谎会令你失去宝贵的真实……")
            }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(11).from("right").say("邻家！卡密萨马！我们在找邻家那个！")
                }
                , function() {
                    return t.tvh.say("那么，我只能把22交给它们了……")
                }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("惊讶").at(9, 0).from("bottom").say("F^3小电视！为什么它们也突然出现了——")
                }
                , function() {
                    return t.vega.face("黑线").say("而且邻家是什么鬼啦！不要忽然给别人增加设定啊！！")
                }
                , function() {
                    return t.fff.at(10).animate().say("嘿嘿嘿，还是我们了解你哟，乖乖跟我们走吧～")
                }
                , function() {
                    return t.vega.face("生气").say("等一下！还是让我掉回井里去好了——")
                }
                , function() {
                    return t.vega.face("激动").say("别碰我！！你们这些臭F^3……放开！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d13 = [function() {
                return t.tvh.say("HOHOHO，诚实的少年，你会得到原本的22……")
            }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("紧张").at(9, 0).from("bottom").say("呼——还以为会沉下去。哎，邻家是什么意思？")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.tvh.say("HOHOHO，作为奖励，把这些迷路的异乡人也领走吧。")
                }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(11).from("right").say("啊～～得救了呢，谢谢神仙大人！还以为这下完蛋了的说。")
                }
                , function() {
                    return t.vega.face("惊讶").say("是它们！？为什么F^3小电视也……")
                }
                , function() {
                    return t.vega.face("黑线").say("等等，谁会拿这群黑乎乎的怪物当作奖励啊！！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.tvh.say("咳……神仙也是很忙的啊，那么再见～HOHOHO——")
                }
                , function() {
                    return t.scene.at(550, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("根本是在甩包袱吧啊喂！把它们拿回去！等等！！")
                }
                , function() {
                    return t.fff.at(10).animate().say("说成包袱真是寒心呢……还好我们比较念旧，束手就擒吧嘿嘿～")
                }
                , function() {
                    return t.vega.face("激动").say("别、别过来！你们这些阴魂不散的黑土豆！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d14 = [function() {
                return t.scene.clear().at(s[0], s[1]).animate().show()
            }
                , function() {
                    return t.vega.size("middle").face("微笑").at(3).from("left").say("很漂亮的院子呢～咦，这个星球的牛没有天线吗？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.cow.withShow().size("middle").at(8, 3).from("right").say("哞——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("大笑").say("看起来很温和啊。是个好孩子哟。")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.cow.say("哞！哞——哞！！")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("它见到我们忽然变得很……警觉？")
                }
                , function() {
                    return t.scene.at(300, 0, !0).animate().show()
                }
                , function() {
                    return t.cow.say("哞～哞——哞——哞——")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("黑线").say("就算你叫得很努力也……语言不通哦。")
                }
                , function() {
                    return t.branch.open([{
                        content: "会引来F^3的，进屋吧",
                        callback: function() {
                            return t.loadAndNext(e.d16, 2, 1, 10)
                        }
                    }, {
                        content: "像是警告，赶快离开这",
                        callback: function() {
                            return t.loadAndNext(e.d5, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d15 = [function() {
                return t.scene.clear().at(c[0] - 100, c[1] - 50).animate().show()
            }
                , function() {
                    return t.vega.size("middle").face("紧张").at(3).from("right").say("就这样进来好吗……不过里面确实没有人。")
                }
                , function() {
                    return t.vega.face("大笑").say("诶，这是织机吧？原来这儿也有！连我们星球上都很少见了呢。")
                }
                , function() {
                    return t.vega.face("严肃").say("不知道为什么，总觉得33也会来这儿……")
                }
                , function() {
                    return t.vega.size("large").face("微笑").say("而且33一定也会注意到这台织机——我想给33留下信物！")
                }
                , function() {
                    return t.branch.open([{
                        content: "相信自己的直觉！",
                        callback: function() {
                            return t.loadAndNext(e.d19, 2, 1, 10)
                        }
                    }, {
                        content: "万一被F^3利用？",
                        callback: function() {
                            return t.loadAndNext(e.d20, 2, 2, 10)
                        }
                    }])
                }
            ],
            e.d16 = [function() {
                return t.scene.clear().at(c[0] - 100, c[1] - 50).animate().show()
            }
                , function() {
                    return t.vega.size("middle").face("紧张").at(3).from("right").say("有点暗……确实没有人吧。")
                }
                , function() {
                    return t.vega.face("大笑").say("哈～这里竟然也有织机？好怀念啊——")
                }
                , function() {
                    return t.vega.face("微笑").say("33看到这个一定比我还开心，他一坐到织机旁就像着了魔似的～")
                }
                , function() {
                    return t.vega.face("脸红").say("那个笨蛋，认真起来的样子也还不错呢……")
                }
                , function() {
                    return t.boy.say("牛郎也会织布？")
                }
                , function() {
                    return t.vega.face("疑惑").say("你……没事吧？我说了什么奇怪的事吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "不是吧，33不应该放牛吗",
                        callback: function() {
                            return t.loadAndNext(e.d17, 3, 1, 10)
                        }
                    }, {
                        content: "没什么，听起来很幸福呢",
                        callback: function() {
                            return t.loadAndNext(e.d18, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d17 = [function() {
                return t.vega.face("微笑").say("33才没有那么勤快呢，反而是我和牛的关系比较亲密——")
            }
                , function() {
                    return t.vega.face("大笑").say("起初为了让那笨蛋和牛熟起来，我还把放牛的笛子给了他～")
                }
                , function() {
                    return t.vega.face("惊讶").say("等等，这声音是……笛子？是从院子传来的吗？")
                }
                , function() {
                    return t.scene.clear().at(s[0], s[1]).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("紧张").at(3).from("left").say("33！是你吗？我在这里33！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("啊～来自恋人贴身物品的声音，真是天籁呢～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3小电视！33的笛子为什么在你们这儿？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈哈哈，就当是他转交的纪念品好了，而且意外地好用哟。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("你们……把33怎么样了！？")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘻嘻，别着急，我们有的是时间慢慢聊这些——")
                }
                , function() {
                    return t.vega.face("激动").say("放——放开我！你们这些牛粪怪……33！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d18 = [function() {
                return t.vega.face("脸红").say("是呢。连和我一起长大的牛都粘起他来了。")
            }
                , function() {
                    return t.vega.face("大笑").say("起初为了让33和牛熟起来，我还给了他牛喜欢听的笛子～")
                }
                , function() {
                    return t.vega.face("惊讶").say("等等，这声音是……笛子？是从院子传来的吗？")
                }
                , function() {
                    return t.scene.clear().at(s[0], s[1]).animate().show()
                }
                , function() {
                    return t.vega.size("middle").face("紧张").say("33！是你吗？我在这里33！")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.withShow().at(8).from("right").say("啊～来自恋人贴身物品的声音，真是天籁呢～")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("惊讶").say("F^3小电视！33的笛子为什么在你们这儿？")
                }
                , function() {
                    return t.scene.at(400, 0, !0).animate().show()
                }
                , function() {
                    return t.fff.say("哈哈哈哈，就当是他转交的纪念品好了，而且意外地好用哟。")
                }
                , function() {
                    return t.scene.at(0, 0, !0).animate().show()
                }
                , function() {
                    return t.vega.face("生气").say("你们……把33怎么样了！？")
                }
                , function() {
                    return t.fff.at(4).animate().say("嘻嘻，别着急，我们有的是时间慢慢聊这些——")
                }
                , function() {
                    return t.vega.face("激动").say("放——放开我！你们这些牛粪怪……33！！")
                }
                , function() {
                    return t.loadAndNext(e.be)
                }
            ],
            e.d19 = [function() {
                return t.vega.size("middle").face("微笑").say("我把他送我的铃铛留在这里……如果是33，绝对不会错过的。")
            }
                , function() {
                    return t.vega.face("大笑").say("而且那笨蛋一看到织机就会走不动，我都快吃这些机器的醋了。")
                }
                , function() {
                    return t.vega.size("large").face("脸红").say("明明看起来笨手笨脚，手工却比我厉害得多，哼……")
                }
                , function() {
                    return t.vega.face("疑惑").say("你……没事吧？我说了什么奇怪的事吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "不是吧，33不应该放牛吗",
                        callback: function() {
                            return t.loadAndNext(e.d17, 3, 1, 10)
                        }
                    }, {
                        content: "没什么，听起来很幸福呢",
                        callback: function() {
                            return t.loadAndNext(e.d18, 3, 2, 10)
                        }
                    }])
                }
            ],
            e.d20 = [function() {
                return t.vega.size("middle").face("担心").say("要是不用考虑这些坏家伙就好了……")
            }
                , function() {
                    return t.vega.face("微笑").say("如果那笨蛋平时看到织机，经常一上去就呆半天呢。")
                }
                , function() {
                    return t.vega.size("large").face("脸红").say("明明看起来笨手笨脚，手工却比我厉害得多，哼……")
                }
                , function() {
                    return t.vega.face("疑惑").say("你……没事吧？我说了什么奇怪的事吗？")
                }
                , function() {
                    return t.branch.open([{
                        content: "不是吧，33不应该放牛吗",
                        callback: function() {
                            return t.loadAndNext(e.d17, 3, 1, 10)
                        }
                    }, {
                        content: "没什么，听起来很幸福呢",
                        callback: function() {
                            return t.loadAndNext(e.d18, 3, 2, 10)
                        }
                    }])
                }
            ]
    }(e = t.b || (t.b = {}))
}(scenario || (scenario = {}));
var scenario;
!function(t) {
    var e;
    !function(e) {
        e.intro = [function() {
            return t.scene["with"](600, "fade").then(function() {
                return t.next()
            }).toMode("NVL").at(370).create("home")
        }
            , function() {
                return t.boy.think("好困（￣O￣)~……欸欸欸，不会又一觉睡到下午了吧？")
            }
            , function() {
                return t.boy.think("……仔细想起来，好像又到那个不怀好意的节日了？")
            }
            , function() {
                return t.boy.think("……决定了！为了庆祝七夕，一整天宅在屋里都愉快地刷手机吧！")
            }
            , function() {
                return t.branch.open([{
                    content: "点开手机里的“bilibili”",
                    callback: function() {
                        t.interpreter.next()
                    }
                }, {
                    content: "点开手机里的“相亲APP”",
                    callback: function() {
                        t.interpreter.load([function() {
                            return t.boy.think("系统公告：因开发者失恋，本应用即日起进入不限期停服状态，建议您使用其他大型多人在线分区跨性别交友平台。")
                        }
                            , function() {
                                return t.branch.open([{
                                    content: "跳转至“bilibili”",
                                    callback: function() {
                                        t.interpreter.next()
                                    }
                                }])
                            }
                        ])
                    }
                }])
            }
            , function() {
                return t.boy.think("今天的首页是……诶？《你的名字。》电影上线了！？")
            }
            , function() {
                return t.boy.think("哼，隐约感受到恶意啊——等等，似乎还有个GALGAME？")
            }
            , function() {
                return t.boy.think("“你独自在七夕将至的日子醒来，默默打开手机打发时间……”")
            }
            , function() {
                return t.boy.think("“你点开一个不怀好意的活动，正想摔手机，忽然注意到房中出现了一个陌生人……”")
            }
            , function() {
                return t.boy.think("——这都是什么鬼嘛！")
            }
            , function() {
                return t.branch.open([{
                    content: "感到恶意，生气地摔下手机",
                    callback: function() {
                        t.scene["with"]().toMode("ADV"),
                            t.interpreter.next()
                    }
                }, {
                    content: "受到感召，决定出门装现充",
                    callback: function() {
                        t.scene["with"]().toMode("ADV"),
                            t.interpreter.next()
                    }
                }])
            }
            , function() {
                return t.vega.say("等一下，打、打扰了！")
            }
            , function() {
                return t.boy.say("嗯？似乎有什么声音，而且似乎是个女孩子的？")
            }
            , function() {
                return t.boy.say("不不不，怎么可能，一定是错觉，不过我居然已经寂寞到这种程度了吗...")
            }
            , function() {
                return t.boy.think("忽然有些心痛。")
            }
            , function() {
                return t.vega.withShow(!1).say("那个，不是错觉，背...背后！")
            }
            , function() {
                return t.boy.think("背后？")
            }
            , function() {
                return t.scene.then(function() {
                    return t.interpreter.next()
                }).at(-370).animate(800).show()
            }
            , function() {
                return t.vega.posture("普通").face("紧张").size("large").from("left").at(3).show()
            }
            , function() {
                return t.boy.say("哇！美少女！而且这么近！")
            }
            , function() {
                return t.vega.withShow().face("惊讶").size("middle").say("啊，似乎吓到你了呢。对不起！忽然冒昧地出现，其实我也不清楚怎么到的这儿……")
            }
            , function() {
                return t.vega.face("微笑").say("我叫22，来自哔哩哔哩星球。嗯？单身交友网站？——不不，那是我故乡的名字，是个美丽的地方哟。")
            }
            , function() {
                return t.vega.face("伤心").say("哔哩哔哩星球忽然出现了名为“F^3”的小电视生物四处骚扰村民，还抓走了许多情侣。")
            }
            , function() {
                return t.vega.say("为了躲避它们，33和我逃到了这个星球，但我们在降落时被F^3攻击了。")
            }
            , function() {
                return t.vega.face("紧张").say("我能感觉到33也落在了附近，但又怕遇到F^3小电视……")
            }
            , function() {
                return t.vega.face("担心").size("large").say("虽然很突然——可以请你帮助我吗？")
            }
            , function() {
                return t.boy.think("等等等等，这乱七八糟的设定是什么？")
            }
            , function() {
                return t.boy.think("不过反正也没什么事做，这么可爱的女孩子请求也不能拒绝吧。")
            }
            , function() {
                return t.boy.think("我想想，确实有几个地方可以去看看——")
            }
            , t.branches.maps]
    }(e = t.b || (t.b = {}))
}(scenario || (scenario = {}));
