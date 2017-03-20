/*
* name;
*/
class Enemy2 extends Laya.Sprite {
    private static frameCached: boolean = false;
    private body: Laya.Animation = new Laya.Animation();
    private hp: number;
    private speed: number;
    private hitInteral: number;
    private lastHitTime: number;
    constructor() {
        super();
        if (!Enemy2.frameCached) {
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            Enemy2.frameCached = true;
        }
        this.init();
    }
    public init() {
        this.hp = 2;
        this.speed = 1;
        this.hitInteral = 2000;
        this.body.play(1, true, "enemy2_fly");
         console.log(this.width);
        this.addChild(this.body);
        Laya.timer.frameLoop(1, this, this.onloop);
    }

    private onloop() {
        this.y += this.speed;
        if (this.y > Main.gmHt) {
            this.recover();
        } else {
            let now: number = Laya.Browser.now();
            if (this.lastHitTime == null || now - this.lastHitTime >= this.hitInteral) {
                let bullet: Bullet = Laya.Pool.getItemByCreateFun("bullet2", function () {
                    return new Bullet(2);
                });
                bullet.init();
                bullet.pos(this.x + 50, this.y + 100);
                if (this.parent) {
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
        Laya.Pool.recover("enemy2", this);
        Laya.timer.clear(this, this.onloop);
    }

    public beHit() {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "enemy2_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                Laya.Pool.recover("enemy2", this);
            });
        }
    }
}