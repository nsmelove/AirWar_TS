var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb(range, timer) {
        if (range === void 0) { range = 1; }
        if (timer === void 0) { timer = false; }
        var _this = _super.call(this) || this;
        if (!Bomb.cached) {
            Laya.Animation.createFrames(["bomb/bomb1.png", "bomb/bomb2.png", "bomb/bomb3.png", "bomb/bomb4.png"], "bomb");
            Laya.Animation.createFrames(["fire/fireCenter1.png", "fire/fireCenter2.png", "fire/fireCenter3.png", "fire/fireCenter4.png"], "fire_center");
            Laya.Animation.createFrames(["fire/fireLeft1.png", "fire/fireLeft2.png", "fire/fireLeft3.png", "fire/fireLeft4.png"], "fire_left");
            Laya.Animation.createFrames(["fire/fireRight1.png", "fire/fireRight2.png", "fire/fireRight3.png", "fire/fireRight4.png"], "fire_right");
            Laya.Animation.createFrames(["fire/fireUp1.png", "fire/fireUp2.png", "fire/fireUp3.png", "fire/fireUp4.png"], "fire_up");
            Laya.Animation.createFrames(["fire/fireDown1.png", "fire/fireDown2.png", "fire/fireDown3.png", "fire/fireDown4.png"], "fire_down");
            Laya.Animation.createFrames(["fire/fireHorizon1.png", "fire/fireHorizon2.png", "fire/fireHorizon3.png", "fire/fireHorizon4.png"], "fire_horizon");
            Laya.Animation.createFrames(["fire/fireVertical1.png", "fire/fireVertical2.png", "fire/fireVertical3.png", "fire/fireVertical4.png"], "fire_vertical");
            Bomb.cached = true;
        }
        _this.bombRange = range;
        _this.body = new Laya.Animation();
        _this.width = _this.body.width = Barrier.TIlE_W;
        _this.height = _this.body.height = Barrier.TIlE_H;
        _this.body.interval = 250;
        _this.body.play(1, true, "bomb");
        if (!timer) {
            _this.fireTime = Laya.Browser.now() + 3000;
        }
        _this.fired = false;
        _this.addChild(_this.body);
        Laya.timer.frameLoop(1, _this, _this.onloop);
        return _this;
    }
    Bomb.prototype.onloop = function () {
        if (this.fired) {
            //爆炸销毁敌人检测
            if (this.parent) {
                var barrier = this.parent;
                for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                    var body = _a[_i];
                    for (var _b = 0, _c = barrier._childs; _b < _c.length; _b++) {
                        var tile = _c[_b];
                        if (tile instanceof Enemy) {
                            if (Math.abs(this.x + body.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y + body.y - tile.y) < Barrier.TIlE_H - 1) {
                                tile.down();
                                break;
                            }
                        }
                    }
                }
            }
        }
        else {
            if (this.fireTime > 0 && Laya.Browser.now() >= this.fireTime) {
                this.fire();
            }
        }
    };
    Bomb.prototype.fire = function () {
        this.fired = true;
        this.body.play(1, true, "fire_center");
        var fireBody;
        for (var i = 1; i < this.bombRange; i++) {
            fireBody = new Laya.Animation();
            fireBody.x = -Barrier.TIlE_W * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_horizon");
            this.addChild(fireBody);
            fireBody = new Laya.Animation();
            fireBody.x = Barrier.TIlE_W * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_horizon");
            this.addChild(fireBody);
            fireBody = new Laya.Animation();
            fireBody.y = -Barrier.TIlE_H * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_vertical");
            this.addChild(fireBody);
            fireBody = new Laya.Animation();
            fireBody.y = Barrier.TIlE_H * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_vertical");
            this.addChild(fireBody);
        }
        fireBody = new Laya.Animation();
        fireBody.x = -Barrier.TIlE_W * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_left");
        this.addChild(fireBody);
        fireBody = new Laya.Animation();
        fireBody.x = Barrier.TIlE_W * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_right");
        this.addChild(fireBody);
        fireBody = new Laya.Animation();
        fireBody.y = -Barrier.TIlE_H * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_up");
        this.addChild(fireBody);
        fireBody = new Laya.Animation();
        fireBody.y = Barrier.TIlE_H * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_down");
        this.addChild(fireBody);
        this.body.once(Laya.Event.COMPLETE, this, function () {
            //console.log(this.x, this.y, this.width, this.height);
            if (this.parent) {
                var barrier = this.parent;
                barrier.removeChild(this);
                //爆炸销毁墙面检测
                for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                    var body = _a[_i];
                    for (var _b = 0, _c = barrier.getMap()._childs; _b < _c.length; _b++) {
                        var tile = _c[_b];
                        if (tile instanceof Wall && Math.abs(this.x + body.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y + body.y - tile.y) < Barrier.TIlE_H - 1) {
                            tile.removeSelf();
                            break;
                        }
                    }
                }
            }
        });
    };
    return Bomb;
}(Laya.Sprite));
Bomb.cached = false;
//# sourceMappingURL=Bomb.js.map