var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Enemy2 = (function (_super) {
    __extends(Enemy2, _super);
    function Enemy2() {
        var _this = _super.call(this) || this;
        _this.body = new Laya.Animation();
        if (!Enemy2.frameCached) {
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            Enemy2.frameCached = true;
        }
        _this.init();
        return _this;
    }
    Enemy2.prototype.init = function () {
        this.hp = 2;
        this.speed = 1;
        this.hitInteral = 2000;
        this.body.play(1, true, "enemy2_fly");
        console.log(this.width);
        this.addChild(this.body);
        Laya.timer.frameLoop(1, this, this.onloop);
    };
    Enemy2.prototype.onloop = function () {
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
                bullet.pos(this.x + 50, this.y + 100);
                if (this.parent) {
                    this.parent.addChild(bullet);
                }
                this.lastHitTime = now;
            }
        }
    };
    Enemy2.prototype.recover = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        Laya.Pool.recover("enemy2", this);
        Laya.timer.clear(this, this.onloop);
    };
    Enemy2.prototype.beHit = function () {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "enemy2_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                Laya.Pool.recover("enemy2", this);
            });
        }
    };
    return Enemy2;
}(Laya.Sprite));
Enemy2.frameCached = false;
//# sourceMappingURL=Enemy2.js.map