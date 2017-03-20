/*
* name;
*/
class Enemy1 extends Laya.Sprite {
    private static frameCached: boolean = false;
    private body: Laya.Animation = new Laya.Animation();
    private hp: number;
    private speed: number;
    private hitInteral:number;
    private lastHitTime:number;
    constructor() {
        super();
        if (!Enemy1.frameCached) {
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
            Enemy1.frameCached = true;
        }
        this.init();
    }
    public init() {
        this.hp = 1;
        this.speed = 1;
        this.hitInteral = 4000;
        this.body.play(1, true, "enemy1_fly");
        console.log(this.width);
        this.addChild(this.body);
        Laya.timer.frameLoop(1, this, this.onloop);
    }

    private onloop() {
        this.y += this.speed;
        if (this.y > Main.gmHt) {
            this.recover();
        } else {
            let now : number = Laya.Browser.now();
            if(this.lastHitTime == null ||  now - this.lastHitTime >= this.hitInteral) {
               let bullet:Bullet  = Laya.Pool.getItemByCreateFun("bullet2", function(){
                   return new Bullet(2);
               });
               bullet.init();
               bullet.pos(this.x + 25, this.y + 50);
               if(this.parent) {
                   this.parent.addChild(bullet);
               }
               this.lastHitTime = now;
            }
        }
    }
    private recover() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        Laya.Pool.recover("enemy1", this);
        Laya.timer.clear(this, this.onloop);
    }

    public beHit() {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "enemy1_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                this.recover();
            });
        }
    }
}