var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        if (type == 1) {
            _this.loadImage("war/bullet1.png");
        }
        else {
            _this.loadImage("war/bullet2.png");
        }
        _this.init();
        return _this;
    }
    Bullet.prototype.init = function () {
        if (this.type == 1) {
            this.speed = -3;
        }
        else {
            this.speed = 3;
        }
        Laya.timer.frameLoop(1, this, this.onloop);
        return this;
    };
    Bullet.prototype.onloop = function () {
        this.y += this.speed;
        //console.log(Laya.timer.toString());
        if (this.y > Main.gmHt || this.y <= 0) {
            this.recover();
        }
    };
    Bullet.prototype.recover = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this.type == 1) {
            Laya.Pool.recover("bullet1", this);
        }
        else {
            Laya.Pool.recover("bullet2", this);
        }
        Laya.timer.clear(this, this.onloop);
    };
    Bullet.prototype.beHit = function () {
        this.recover();
    };
    return Bullet;
}(Laya.Sprite));
//# sourceMappingURL=Bullet.js.map