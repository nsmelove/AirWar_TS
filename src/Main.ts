/*
* name;
*/
class Main{
    public static gmWd:number = 480;
	public static gmHt:number= 850;
    private gameBox:Laya.Sprite;
    constructor(){
       
        Laya.init(Main.gmWd, Main.gmHt, Laya.WebGL);
        var bg:BackGround = new BackGround();
        Laya.stage.addChild(bg);
        this.gameBox = new Laya.Sprite();
        Laya.stage.addChild(this.gameBox);
        Laya.loader.load("res/atlas/war.json",Laya.Handler.create(this, function(){
            let hero:Hero = new Hero();
            hero.pos(Main.gmWd/2, Main.gmHt/2);
            this.gameBox.addChild(hero);
            let enemy1: Enemy1 = Laya.Pool.getItemByClass("enemy1", Enemy1);
             this.gameBox.addChild(enemy1);
              let enemy2: Enemy2 = Laya.Pool.getItemByClass("enemy2", Enemy2);
              enemy2.x = 200;
             this.gameBox.addChild(enemy2);
              let enemy3: Enemy3 = Laya.Pool.getItemByClass("enemy3", Enemy3);
                enemy3.x = 300;
             this.gameBox.addChild(enemy3);
        }), null, Laya.Loader.ATLAS);
    }


}
//new Main();