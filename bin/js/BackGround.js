var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BackGround.prototype.init = function () {
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage("res/background.png");
        this.addChild(this.bg1);
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage("res/background.png", 0, 0, 0, 0, Laya.Handler.create(this, function () {
            this.bg2.y -= this.bg2.height;
            this.addChild(this.bg2);
            Laya.timer.frameLoop(1, this, this.onloop);
        }));
    };
    BackGround.prototype.onloop = function () {
        this.bg1.y += 5;
        this.bg2.y += 5;
        if (this.bg1.y > Main.gmHt) {
            this.bg1.y = this.bg2.y - this.bg1.height;
        }
        else if (this.bg2.y > Main.gmHt) {
            this.bg2.y = this.bg1.y - this.bg2.height;
        }
    };
    return BackGround;
}(Laya.Sprite));
//# sourceMappingURL=BackGround.js.map