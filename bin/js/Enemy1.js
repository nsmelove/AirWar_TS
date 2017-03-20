var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Enemy1 = (function (_super) {
    __extends(Enemy1, _super);
    function Enemy1() {
        var _this = _super.call(this) || this;
        _this.body = new Laya.Animation();
        if (!Enemy1.frameCached) {
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
            Enemy1.frameCached = true;
        }
        _this.init();
        return _this;
    }
    Enemy1.prototype.init = function () {
        this.hp = 1;
        this.speed = 1;
        this.hitInteral = 4000;
        this.body.play(1, true, "enemy1_fly");
        console.log(this.width);
        this.addChild(this.body);
        Laya.timer.frameLoop(1, this, this.onloop);
    };
    Enemy1.prototype.onloop = function () {
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
                bullet.pos(this.x + 25, this.y + 50);
                if (this.parent) {
                    this.parent.addChild(bullet);
                }
                this.lastHitTime = now;
            }
        }
    };
    Enemy1.prototype.recover = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        Laya.Pool.recover("enemy1", this);
        Laya.timer.clear(this, this.onloop);
    };
    Enemy1.prototype.beHit = function () {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "enemy1_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                this.recover();
            });
        }
    };
    return Enemy1;
}(Laya.Sprite));
Enemy1.frameCached = false;
//# sourceMappingURL=Enemy1.js.map