var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type) {
        var _this = _super.call(this) || this;
        if (!Enemy.frameCached) {
            Laya.Animation.createFrames(["enemy/enemyA1.png", "enemy/enemyA2.png", "enemy/enemyA3.png", "enemy/enemyA4.png"], "enemyA");
            Laya.Animation.createFrames(["enemy/enemyADown1.png", "enemy/enemyADown2.png", "enemy/enemyADown3.png", "enemy/enemyADown4.png"], "enemyADown");
            Laya.Animation.createFrames(["enemy/enemyB1.png", "enemy/enemyB2.png", "enemy/enemyB3.png", "enemy/enemyB4.png"], "enemyB");
            Laya.Animation.createFrames(["enemy/enemyBDown1.png", "enemy/enemyBDown2.png", "enemy/enemyBDown3.png", "enemy/enemyBDown4.png"], "enemyBDown");
            Laya.Animation.createFrames(["enemy/enemyC1.png", "enemy/enemyC2.png", "enemy/enemyC3.png", "enemy/enemyC4.png"], "enemyC");
            Laya.Animation.createFrames(["enemy/enemyCDown1.png", "enemy/enemyCDown2.png", "enemy/enemyCDown3.png", "enemy/enemyCDown4.png"], "enemyCDown");
            Laya.Animation.createFrames(["enemy/enemyD1.png", "enemy/enemyD2.png", "enemy/enemyD3.png", "enemy/enemyD4.png"], "enemyD");
            Laya.Animation.createFrames(["enemy/enemyDDown1.png", "enemy/enemyDDown2.png", "enemy/enemyDDown3.png", "enemy/enemyDDown4.png"], "enemyDDown");
            Laya.Animation.createFrames(["enemy/enemyE1.png", "enemy/enemyE2.png", "enemy/enemyE3.png", "enemy/enemyE4.png"], "enemyE");
            Laya.Animation.createFrames(["enemy/enemyEDown1.png", "enemy/enemyEDown2.png", "enemy/enemyEDown3.png", "enemy/enemyEDown4.png"], "enemyEDown");
            Laya.Animation.createFrames(["enemy/enemyF1.png", "enemy/enemyF2.png", "enemy/enemyF3.png", "enemy/enemyF4.png"], "enemyF");
            Laya.Animation.createFrames(["enemy/enemyFDown1.png", "enemy/enemyFDown2.png", "enemy/enemyFDown3.png", "enemy/enemyFDown4.png"], "enemyFDown");
            Laya.Animation.createFrames(["enemy/enemyG1.png", "enemy/enemyG2.png", "enemy/enemyG3.png", "enemy/enemyG4.png"], "enemyG");
            Laya.Animation.createFrames(["enemy/enemyGDown1.png", "enemy/enemyGDown2.png", "enemy/enemyGDown3.png", "enemy/enemyGDown4.png"], "enemyGDown");
            Enemy.frameCached = true;
        }
        _this.type = type;
        _this.body = new Laya.Animation();
        _this.body.interval = 250;
        _this.width = _this.body.width = Barrier.TIlE_W;
        _this.height = _this.body.height = Barrier.TIlE_H;
        _this.speed = 50 / 1000;
        _this.addChild(_this.body);
        _this.randomWalk();
        Laya.timer.frameLoop(1, _this, _this.onloop);
        return _this;
    }
    Enemy.randomEnemy = function () {
        var name = Enemy.enemyMap[Math.floor(Math.random() * Enemy.enemyMap.length)];
        //console.log(name);
        return new Enemy(name);
    };
    Enemy.prototype.randomWalk = function () {
        var randomNum = Math.floor(Math.random() * 4);
        if (randomNum == 0) {
            this.walkUp();
        }
        else if (randomNum == 1) {
            this.walkDown();
        }
        else if (randomNum == 2) {
            this.walkLeft();
        }
        else if (randomNum == 3) {
            this.walkRight();
        }
    };
    Enemy.prototype.onloop = function () {
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
        else if (this.actionName == "down") {
            this.down();
            return;
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
                        if (tile instanceof Bomb || (tile != this && tile instanceof Enemy)) {
                            if (Math.abs(this.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y - tile.y) < Barrier.TIlE_H - 1) {
                                canWalk = false;
                                break;
                            }
                        }
                    }
                    for (var _b = 0, _c = barrier.getMap()._childs; _b < _c.length; _b++) {
                        var tile = _c[_b];
                        if (Math.abs(this.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y - tile.y) < Barrier.TIlE_H - 1) {
                            canWalk = false;
                            break;
                        }
                    }
                }
                if (!canWalk) {
                    this.x = lastX;
                    this.y = lastY;
                    this.randomWalk();
                }
            }
        }
    };
    Enemy.prototype.walkUp = function () {
        if (this.actionName != "up") {
            this.actionName = "up";
            this.body.play(1, true, "enemy" + this.type);
            //this.body.play(1, true, "enemyA");
            this.actionTime = Laya.Browser.now();
        }
    };
    Enemy.prototype.walkDown = function () {
        if (this.actionName != "down") {
            this.actionName = "down";
            this.body.play(1, true, "enemy" + this.type);
            this.actionTime = Laya.Browser.now();
        }
    };
    Enemy.prototype.walkLeft = function () {
        if (this.actionName != "left") {
            this.actionName = "left";
            this.body.play(1, true, "enemy" + this.type);
            this.actionTime = Laya.Browser.now();
        }
    };
    Enemy.prototype.walkRight = function () {
        if (this.actionName != "right") {
            this.actionName = "right";
            this.body.play(1, true, "enemy" + this.type);
            this.actionTime = Laya.Browser.now();
        }
    };
    Enemy.prototype.down = function () {
        if (this.actionName != "down") {
            this.actionName = "down";
            this.speed = 0;
            this.body.play(1, false, "enemy" + this.type + "Down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    var barrier = this.parent;
                    barrier.removeChild(this);
                }
            });
        }
    };
    return Enemy;
}(Laya.Sprite));
Enemy.frameCached = false;
Enemy.enemyMap = ["A", "B", "C", "D", "E", "F", "G"];
//# sourceMappingURL=Enemy.js.map