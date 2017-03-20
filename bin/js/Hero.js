var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super.call(this) || this;
        if (!Hero.cached) {
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
            Hero.cached = true;
        }
        _this.init();
        return _this;
    }
    Hero.prototype.init = function () {
        this.hp = 5;
        this.hitInteral = 500;
        this.body = new Laya.Animation();
        this.body.play(0, true, "hero_fly");
        var bound = this.body.getBounds();
        this.width = bound.width;
        this.height = bound.height;
        this.body.pivotX = bound.width / 2;
        this.body.pivotY = bound.height / 2;
        this.addChild(this.body);
        var colorFilter;
        colorFilter = new Laya.ColorFilter([0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]);
        this.filters = [colorFilter];
        //this.blendMode
        Laya.timer.frameLoop(1, this, this.onloop);
    };
    Hero.prototype.onloop = function () {
        var now = Laya.Browser.now();
        if (this.lastHitTime == null || now - this.lastHitTime >= this.hitInteral) {
            var bullet = Laya.Pool.getItemByCreateFun("bullet1", function () {
                return new Bullet(1);
            });
            bullet.init();
            bullet.pos(this.x, this.y - this.height / 2 - 20);
            if (this.parent) {
                this.parent.addChild(bullet);
            }
            this.lastHitTime = now;
        }
    };
    Hero.prototype.beHit = function () {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "hero_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            });
        }
    };
    return Hero;
}(Laya.Sprite));
Hero.cached = false;
//# sourceMappingURL=Hero.js.map