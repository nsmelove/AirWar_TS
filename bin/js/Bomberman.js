/*
* name;
*/
var Bomberman = (function () {
    function Bomberman() {
        this.start = false;
        Laya.init(Barrier.TIlE_W * 21, Barrier.TIlE_H * 21 + 200, Laya.WebGL);
        Laya.stage.alignH = "center";
        if (Laya.Browser.onMobile) {
            Laya.stage.scaleMode = "showall";
        }
        Laya.stage.bgColor = "#8686E0";
        //laya.debug.DebugTool.init();
        //Laya.Stat.enable();
        Laya.Stat.show(0, Barrier.TIlE_H * 21);
        Laya.Loader.maxTimeOut = 2000;
        //console.log(Laya.Loader.maxTimeOut);
        Laya.loader.load([
            "res/atlas/assets.json",
            "res/atlas/bomb.json",
            "res/atlas/comp.json",
            "res/atlas/enemy.json",
            "res/atlas/fire.json",
            "res/atlas/play.json",
            "res/atlas/res.json",
            "res/atlas/tile.json",
            "res/atlas/war.json"
        ], Laya.Handler.create(this, this.resComplete), Laya.Handler.create(this, this.resProgress, null, false), Laya.Loader.ATLAS);
    }
    Bomberman.prototype.resProgress = function (value) {
        if (!this.loadingUI) {
            this.loadingUI = new ui.LoadingUI();
            Laya.stage.addChild(this.loadingUI);
        }
        console.log(value);
        this.loadingUI.progress.value = value;
    };
    Bomberman.prototype.resComplete = function () {
        this.loadingUI.removeSelf();
        this.beginUI = new ui.BomberManUI();
        Laya.stage.addChild(this.beginUI);
        if (Laya.Browser.onMobile) {
            this.beginUI.playerChoose.on(Laya.Event.SELECT, this, this.beginGame);
        }
        else {
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);
        }
    };
    Bomberman.prototype.onKeyDown = function (event) {
        console.log(event.keyCode);
        if (this.start) {
            if (event.keyCode == 37) {
                this.player1.walkLeft();
            }
            else if (event.keyCode == 38) {
                this.player1.walkUp();
            }
            else if (event.keyCode == 39) {
                this.player1.walkRight();
            }
            else if (event.keyCode == 40) {
                this.player1.walkDown();
            }
            else if (event.keyCode == 96) {
                var bomb = new Bomb(5);
                bomb.x = Math.round(this.player1.x / Barrier.TIlE_W) * Barrier.TIlE_W;
                bomb.y = Math.round(this.player1.y / Barrier.TIlE_H) * Barrier.TIlE_H;
                bomb.zOrder = 1;
                this.barrier.addChild(bomb);
            }
            else if (event.keyCode == 65) {
                if (this.player2) {
                    this.player2.walkLeft();
                }
            }
            else if (event.keyCode == 87) {
                if (this.player2) {
                    this.player2.walkUp();
                }
            }
            else if (event.keyCode == 68) {
                if (this.player2) {
                    this.player2.walkRight();
                }
            }
            else if (event.keyCode == 83) {
                if (this.player2) {
                    this.player2.walkDown();
                }
            }
            else if (event.keyCode == 81) {
                if (this.player2) {
                    var bomb = new Bomb();
                    bomb.x = Math.round(this.player2.x / Barrier.TIlE_W) * Barrier.TIlE_W;
                    bomb.y = Math.round(this.player2.y / Barrier.TIlE_H) * Barrier.TIlE_H;
                    bomb.zOrder = 1;
                    this.barrier.addChild(bomb);
                }
            }
        }
        else {
            if (event.keyCode == 38 || event.keyCode == 40) {
                var items = this.beginUI.playerChoose.items;
                if (this.beginUI.playerChoose.selectedIndex == 0) {
                    this.beginUI.playerChoose.selection = items[1];
                }
                else {
                    this.beginUI.playerChoose.selection = items[0];
                }
            }
            else if (event.keyCode == 13) {
                this.beginGame();
            }
        }
    };
    Bomberman.prototype.beginGame = function () {
        this.start = true;
        this.beginUI.removeSelf();
        this.barrier = new Barrier(21, 21);
        Laya.stage.addChild(this.barrier);
        this.player1 = new Player();
        this.barrier.addPlayer(this.player1);
        if (this.beginUI.playerChoose.selectedIndex == 1) {
            this.player2 = new Player();
            this.barrier.addPlayer(this.player2);
        }
    };
    Bomberman.prototype.onKeyUp = function (event) {
        if (this.start) {
            if (event.keyCode == 37
                || event.keyCode == 38
                || event.keyCode == 39
                || event.keyCode == 40) {
                this.player1.stop();
            }
            else if (event.keyCode == 65
                || event.keyCode == 68
                || event.keyCode == 83
                || event.keyCode == 87) {
                this.player2.stop();
            }
        }
    };
    Bomberman.prototype.onloop = function () {
    };
    return Bomberman;
}());
new Bomberman();
//# sourceMappingURL=Bomberman.js.map