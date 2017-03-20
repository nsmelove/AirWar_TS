var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Barrier = (function (_super) {
    __extends(Barrier, _super);
    function Barrier(tileNumX, tileNumY) {
        var _this = _super.call(this) || this;
        _this.graphics.drawRect(0, 0, Barrier.TIlE_W * tileNumX, Barrier.TIlE_H * tileNumY, "#1f8d00", "#ff0000", 4);
        _this.map = new Laya.Sprite();
        _this.map.cacheAs = "bitMap";
        _this.addChild(_this.map);
        _this.tileNumX = tileNumX;
        _this.tileNumY = tileNumY;
        _this.width = Barrier.TIlE_W * tileNumX;
        _this.height = Barrier.TIlE_H * tileNumY;
        var tile;
        for (var x = 0; x < tileNumX; x++) {
            for (var y = 0; y < tileNumY; y++) {
                if (x == 0 || y == 0 || x == tileNumX - 1 || y == tileNumY - 1 || (x % 2 == 0 && y % 2 == 0)) {
                    tile = new Tile();
                    //tile.zOrder = 5;
                    tile.pos(Barrier.getXByTile(x), Barrier.getYByTile(y));
                    _this.map.addChild(tile);
                }
                else {
                    var num = Math.round(Math.random() * 10);
                    if (num == 0 || num == 1) {
                    }
                    else if (num == 2 || num == 3) {
                        tile = new Wall();
                        tile.pos(Barrier.getXByTile(x), Barrier.getYByTile(y));
                        _this.map.addChild(tile);
                    }
                    else if (num == 4 || num == 5 || num == 6) {
                        tile = Enemy.randomEnemy();
                        ;
                        tile.pos(Barrier.getXByTile(x), Barrier.getYByTile(y));
                        tile.walkDown();
                        _this.addChild(tile);
                    }
                }
            }
        }
        return _this;
    }
    Barrier.prototype.getTileNumX = function () {
        return this.tileNumX;
    };
    Barrier.prototype.getTileNumY = function () {
        return this.tileNumY;
    };
    Barrier.prototype.getMap = function () {
        return this.map;
    };
    Barrier.prototype.addPlayer = function (player) {
        for (var tileX = 0; tileX < this.tileNumX; tileX++) {
            for (var tileY = 0; tileY < this.tileNumY; tileY++) {
                var x = Barrier.getXByTile(tileX);
                var y = Barrier.getYByTile(tileY);
                var canPos = true;
                for (var i = 0; i < this.numChildren; i++) {
                    var sprite = this.getChildAt(i);
                    if (!(sprite instanceof Bg)) {
                        if (Math.abs(x - sprite.x) < Barrier.TIlE_W && Math.abs(y - sprite.y) < Barrier.TIlE_H) {
                            canPos = false;
                            break;
                        }
                    }
                }
                for (var i = 0; i < this.map.numChildren; i++) {
                    var sprite = this.map.getChildAt(i);
                    if (!(sprite instanceof Bg)) {
                        if (Math.abs(x - sprite.x) < Barrier.TIlE_W && Math.abs(y - sprite.y) < Barrier.TIlE_H) {
                            canPos = false;
                            break;
                        }
                    }
                }
                if (canPos) {
                    player.x = x;
                    player.y = y;
                    this.addChild(player);
                    return;
                }
            }
        }
    };
    Barrier.getXByTile = function (tileX) {
        return tileX * Barrier.TIlE_W;
    };
    Barrier.getYByTile = function (tileY) {
        return tileY * Barrier.TIlE_H;
    };
    Barrier.getTileX = function (x) {
        return Math.floor(x / Barrier.TIlE_W);
    };
    Barrier.getTileY = function (y) {
        return Math.floor(y / Barrier.TIlE_H);
    };
    Barrier.hitTestSprite = function (src, tgt, refX, refY) {
        if (refX === void 0) { refX = 0; }
        if (refY === void 0) { refY = 0; }
        // if (tgt.hitTestPoint(refX + src.x + 2, refY + src.y + 2)) {
        //     return true;
        // }
        if (Math.abs(refX + src.x - tgt.x) < Barrier.TIlE_W - 1 && Math.abs(refY + src.y - tgt.y) < Barrier.TIlE_H - 1) {
            return true;
        }
        // if (tgt.hitTestPoint(refX + src.x + src.width - 2, refY + src.y + 2)) {
        //     return true;
        // }
        // if (tgt.hitTestPoint(refX + src.x + 2, refY + src.y + src.height - 2)) {
        //     return true;
        // }
        // if (tgt.hitTestPoint(refX + src.x + src.width - 2, refY + src.y + src.height - 2)) {
        //     return true;
        // }
        // for (let i = 0; i < src.numChildren; i++) {
        //     if (src.getChildAt(i) instanceof Laya.Sprite) {
        //         var sprite: Laya.Sprite = src.getChildAt(i) as Laya.Sprite;
        //         if (Barrier.hitTestSprite(sprite, tgt, refX + src.x, refY + src.y)) {
        //             return true;
        //         }
        //     }
        // }
        return false;
    };
    return Barrier;
}(Laya.Sprite));
Barrier.TIlE_W = 16;
Barrier.TIlE_H = 16;
//# sourceMappingURL=Barrier.js.map