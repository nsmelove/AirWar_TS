var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Bg = (function (_super) {
    __extends(Bg, _super);
    function Bg(width, height) {
        var _this = _super.call(this) || this;
        var texture = Laya.loader.getRes("tile/bg.png");
        _this.graphics.drawTexture(texture, 0, 0, 320, 320);
        _this.width = width;
        _this.height = height;
        _this.graphics.fillTexture(texture, 0, 0, _this.width, _this.height, "repeat");
        return _this;
    }
    return Bg;
}(Laya.Sprite));
//# sourceMappingURL=Bg.js.map