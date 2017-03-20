/*
* name;
*/
var Main = (function () {
    function Main() {
        Laya.init(Main.gmWd, Main.gmHt, Laya.WebGL);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        this.gameBox = new Laya.Sprite();
        Laya.stage.addChild(this.gameBox);
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, function () {
            var hero = new Hero();
            hero.pos(Main.gmWd / 2, Main.gmHt / 2);
            this.gameBox.addChild(hero);
            var enemy1 = Laya.Pool.getItemByClass("enemy1", Enemy1);
            this.gameBox.addChild(enemy1);
            var enemy2 = Laya.Pool.getItemByClass("enemy2", Enemy2);
            enemy2.x = 200;
            this.gameBox.addChild(enemy2);
            var enemy3 = Laya.Pool.getItemByClass("enemy3", Enemy3);
            enemy3.x = 300;
            this.gameBox.addChild(enemy3);
        }), null, Laya.Loader.ATLAS);
    }
    return Main;
}());
Main.gmWd = 480;
Main.gmHt = 850;
//new Main(); 
//# sourceMappingURL=Main.js.map