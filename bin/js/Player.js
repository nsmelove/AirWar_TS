var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        if (!Player.cached) {
            Laya.Animation.createFrames(["play/up1.png", "play/up2.png", "play/up3.png", "play/up4.png"], "player_up");
            Laya.Animation.createFrames(["play/down1.png", "play/down2.png", "play/down3.png", "play/down4.png"], "player_down");
            Laya.Animation.createFrames(["play/left1.png", "play/left2.png", "play/left3.png", "play/left4.png"], "player_left");
            Laya.Animation.createFrames(["play/right1.png", "play/right2.png", "play/right3.png", "play/right4.png"], "player_right");
            Laya.Animation.createFrames(["play/down1.png"], "player_stop");
            Player.cached = true;
        }
        _this.body = new Laya.Animation();
        _this.width = _this.body.width = Barrier.TIlE_W;
        _this.height = _this.body.height = Barrier.TIlE_H;
        _this.addChild(_this.body);
        _this.zOrder = 10;
        _this.bombLimit = 1;
        _this.bombRange = 1;
        _this.throughWall = false;
        _this.throughEnemy = false;
        _this.stop();
        Laya.timer.frameLoop(1, _this, _this.onloop);
        return _this;
    }
    Player.prototype.reset = function () {
        this.bombLimit = 1;
        this.bombRange = 1;
        this.throughWall = false;
        this.throughEnemy = false;
        this.stop();
    };
    Player.prototype.onloop = function () {
        var now = Laya.Browser.now();
        var loopDistance = (now - this.actionTime) * this.speed;
        this.actionTime = now;
        var lastX = this.x;
        var lastY = this.y;
        if (this.actionName == "up") {
            this.y -= loopDistance;
        }
        else if (this.actionName == "down") {
            this.y += loopDistance;
        }
        else if (this.actionName == "left") {
            this.x -= loopDistance;
        }
        else if (this.actionName == "right") {
            this.x += loopDistance;
        }
        if (loopDistance) {
            if (this.parent && this.parent instanceof Barrier) {
                var barrier = this.parent;
                var canWalk = true;
                if (this.x < 0 || this.x + this.width > barrier.width
                    || this.y < 0 || this.y + this.height > barrier.height) {
                    canWalk = false;
                }
                else {
                    for (var _i = 0, _a = barrier._childs; _i < _a.length; _i++) {
                        var tile = _a[_i];
                        if (tile instanceof Bomb) {
                            var detX = Math.abs(this.x - tile.x);
                            var detY = Math.abs(this.y - tile.y);
                            var lastDetX = Math.abs(lastX - tile.x);
                            var lastDetY = Math.abs(lastY - tile.y);
                            if (detX < Barrier.TIlE_W - 1 && detY < Barrier.TIlE_H - 1 && (detX < lastDetX || detY < lastDetY)) {
                                canWalk = false;
                                break;
                            }
                        }
                    }
                    for (var _b = 0, _c = barrier.getMap()._childs; _b < _c.length; _b++) {
                        var tile = _c[_b];
                        if (Math.abs(this.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y - tile.y) < Barrier.TIlE_H - 1) {
                            if (tile instanceof Tile || !this.throughWall) {
                                canWalk = false;
                            }
                            break;
                        }
                    }
                }
                if (!canWalk) {
                    this.x = lastX;
                    this.y = lastY;
                }
            }
        }
    };
    Player.prototype.getActionName = function () {
        return this.actionName;
    };
    Player.prototype.getActionTime = function () {
        return this.actionTime;
    };
    Player.prototype.getSpeed = function () {
        return this.speed;
    };
    Player.prototype.walkUp = function () {
        if (this.actionName != "up") {
            this.actionName = "up";
            this.body.play(1, true, "player_up");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    };
    Player.prototype.walkDown = function () {
        if (this.actionName != "down") {
            this.actionName = "down";
            this.body.play(1, true, "player_down");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    };
    Player.prototype.walkLeft = function () {
        if (this.actionName != "left") {
            this.actionName = "left";
            this.body.play(1, true, "player_left");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    };
    Player.prototype.walkRight = function () {
        if (this.actionName != "right") {
            this.actionName = "right";
            this.body.play(1, true, "player_right");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    };
    Player.prototype.stop = function () {
        if (this.actionName != "stop") {
            this.actionName = "stop";
            this.body.play(1, true, "player_stop");
            this.speed = 0;
            this.actionTime = Laya.Browser.now();
        }
    };
    return Player;
}(Laya.Sprite));
Player.cached = false;
//# sourceMappingURL=Player.js.map