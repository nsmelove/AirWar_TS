/*
* name;
*/
class Barrier extends Laya.Sprite {
    public static TIlE_W = 16;
    public static TIlE_H = 16;
    private map:Laya.Sprite;
    private tileNumX: number;
    private tileNumY: number;
    public getTileNumX(): number {
        return this.tileNumX;
    }
    public getTileNumY(): number {
        return this.tileNumY;
    }
    public getMap(){
        return this.map;
    }
    constructor(tileNumX: number, tileNumY: number) {
        super();
        this.graphics.drawRect(0, 0, Barrier.TIlE_W * tileNumX, Barrier.TIlE_H * tileNumY,"#1f8d00","#ff0000", 4);
        this.map = new Laya.Sprite();
        this.map.cacheAs="bitMap";
        this.addChild(this.map);
        this.tileNumX = tileNumX;
        this.tileNumY = tileNumY;
        this.width = Barrier.TIlE_W * tileNumX;
        this.height = Barrier.TIlE_H * tileNumY;
        var tile: Laya.Sprite;
        for (var x = 0; x < tileNumX; x++) {
            for (var y = 0; y < tileNumY; y++) {
                if (x == 0 || y == 0 || x == tileNumX - 1 || y == tileNumY - 1 || (x % 2 == 0 && y % 2 == 0)) {
                    tile = new Tile();
                    //tile.zOrder = 5;
                    tile.pos(Barrier.getXByTile(x), Barrier.getYByTile(y));
                    this.map.addChild(tile);
                } else {
                    var num = Math.round(Math.random() * 10);
                    if (num == 0 || num == 1) {//瓷砖
                        // tile = new Tile();
                        // tile.zOrder = 5;
                        // tile.pos(Barrier.getXByTile(x), Barrier.getYByTile(y));
                        // this.addChild(tile);
                    } else if (num == 2 || num == 3) {//土墙
                        tile = new Wall();
                        tile.pos(Barrier.getXByTile(x), Barrier.getYByTile(y));
                        this.map.addChild(tile);
                    } else if (num == 4 || num == 5 || num == 6) {
                        tile = Enemy.randomEnemy();;
                        tile.pos(Barrier.getXByTile(x), Barrier.getYByTile(y));
                        (<Enemy>tile).walkDown();
                        this.addChild(tile);
                    }
                }

            }
        }
    }

    public addPlayer(player: Player) {
        for (var tileX = 0; tileX < this.tileNumX; tileX++) {
            for (var tileY = 0; tileY < this.tileNumY; tileY++) {
                let x = Barrier.getXByTile(tileX);
                let y = Barrier.getYByTile(tileY);
                let canPos = true;
                for (let i = 0; i < this.numChildren; i++) {
                    let sprite: Laya.Sprite = this.getChildAt(i) as Laya.Sprite;
                    if (!(sprite instanceof Bg)) {
                        if (Math.abs(x - sprite.x) < Barrier.TIlE_W && Math.abs(y - sprite.y) < Barrier.TIlE_H) {
                            canPos = false;
                            break;
                        }
                    }
                }
                for (let i = 0; i < this.map.numChildren; i++) {
                    let sprite: Laya.Sprite = this.map.getChildAt(i) as Laya.Sprite;
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
    }

    public static getXByTile(tileX: number): number {
        return tileX * Barrier.TIlE_W;
    }

    public static getYByTile(tileY: number): number {
        return tileY * Barrier.TIlE_H;
    }

    public static getTileX(x: number): number {
        return Math.floor(x / Barrier.TIlE_W);
    }

    public static getTileY(y: number): number {
        return Math.floor(y / Barrier.TIlE_H);
    }
    public static hitTestSprite(src: Laya.Sprite, tgt: Laya.Sprite, refX: number = 0, refY: number = 0): boolean {
        // if (tgt.hitTestPoint(refX + src.x + 2, refY + src.y + 2)) {
        //     return true;
        // }
        if (Math.abs(refX + src.x - tgt.x) < Barrier.TIlE_W -1 && Math.abs(refY + src.y - tgt.y) < Barrier.TIlE_H - 1) {
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
    }
}