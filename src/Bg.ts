/*
* name;
*/
class Bg  extends Laya.Sprite{
    constructor(width:number,height:number){
        super();
        let texture = Laya.loader.getRes("tile/bg.png");
        this.graphics.drawTexture(texture, 0, 0,  320, 320);
        this.width = width;
        this.height = height;
        this.graphics.fillTexture(texture,0, 0, this.width, this.height, "repeat");
    }
}