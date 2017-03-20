/*
* name;
*/
class BackGround extends Laya.Sprite{
    private bg1:Laya.Sprite;
    private bg2:Laya.Sprite;

    constructor(){
        super();
	    this.init();
    }

    private init():void {
			this.bg1 = new Laya.Sprite();
			this.bg1.loadImage("res/background.png");
			this.addChild(this.bg1);
			this.bg2 = new Laya.Sprite();
			this.bg2.loadImage("res/background.png",0,0,0,0,Laya.Handler.create(this,function():void{
				this.bg2.y -= this.bg2.height;
				this.addChild(this.bg2);
				Laya.timer.frameLoop(1, this, this.onloop);
			}));
		}	

		private onloop():void {
			this.bg1.y += 5;
			this.bg2.y += 5;
			if(this.bg1.y > Main.gmHt) {
				this.bg1.y = this.bg2.y - this.bg1.height;
			}else if(this.bg2.y > Main.gmHt){
				this.bg2.y = this.bg1.y - this.bg2.height;
			}
		}
}