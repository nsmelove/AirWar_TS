var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Enemy3 = (function (_super) {
    __extends(Enemy3, _super);
    function Enemy3() {
        var _this = _super.call(this) || this;
        _this.body = new Laya.Animation();
        if (!Enemy3.frameCached) {
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png"], "enemy3_down");
            Enemy3.frameCached = true;
        }
        _this.init();
        return _this;
    }
    Enemy3.prototype.init = function () {
        this.hp = 5;
        this.speed = 1;
        this.hitInteral = 1000;
        this.body.play(1, true, "enemy3_fly");
        console.log(this.width);
        this.addChild(this.body);
        Laya.timer.frameLoop(1, this, this.onloop);
    };
    Enemy3.prototype.onloop = function () {
        this.y += this.speed;
        if (this.y > Main.gmHt) {
            this.recover();
        }
        else {
            var now = Laya.Browser.now();
            if (this.lastHitTime == null || now - this.lastHitTime >= this.hitInteral) {
                var bullet = Laya.Pool.getItemByCreateFun("bullet2", function () {
                    return new Bullet(2);
                });
                bullet.init();
                bullet.pos(this.x + 80, this.y + 250);
                if (this.parent) {
                    this.parent.addChild(bullet);
                }
                this.lastHitTime = now;
            }
        }
    };
    Enemy3.prototype.recover = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        Laya.Pool.recover("enemy3", this);
        Laya.timer.clear(this, this.onloop);
    };
    Enemy3.prototype.beHit = function () {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "enemy3_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                Laya.Pool.recover("enemy3", this);
            });
        }
        else {
            this.body.play(1, true, "enemy3_hit");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                this.body.play(1, true, "enemy3_fly");
            });
        }
    };
    return Enemy3;
}(Laya.Sprite));
Enemy3.frameCached = false;
//# sourceMappingURL=Enemy3.js.map