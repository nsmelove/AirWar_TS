/*
* name;
*/
class Bullet extends Laya.Sprite {
    private speed: number;
    private type:number;
    constructor(type:number) {
        super();
        this.type = type;
        if(type == 1) {
            this.loadImage("war/bullet1.png");
        } else {
            this.loadImage("war/bullet2.png");
        }
        this.init();
    }

    public init():Bullet {
        if(this.type == 1) {
            this.speed = -3;
        }else {
            this.speed = 3;
        }
        Laya.timer.frameLoop(1, this, this.onloop);
        return this;
    }

    private onloop() {
        this.y += this.speed;
         //console.log(Laya.timer.toString());
        if (this.y > Main.gmHt || this.y <= 0) {
            this.recover();
        }
    }

    private recover() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if(this.type == 1){
            Laya.Pool.recover("bullet1", this);
        } else {
             Laya.Pool.recover("bullet2", this);
        }
        Laya.timer.clear(this, this.onloop);
    }

    public beHit() {
        this.recover();
    }
}