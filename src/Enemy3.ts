/*
* name;
*/
class Enemy3 extends Laya.Sprite {
    private static frameCached: boolean = false;
    private body: Laya.Animation = new Laya.Animation();
    private hp: number;
    private speed: number;
    private hitInteral: number;
    private lastHitTime: number;
    constructor() {
        super();
        if (!Enemy3.frameCached) {
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png"], "enemy3_down");
            Enemy3.frameCached = true;
        }
        this.init();
    }

    public init() {
        this.hp = 5;
        this.speed = 1;
        this.hitInteral = 1000;
        this.body.play(1, true, "enemy3_fly");
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
                bullet.pos(this.x + 80, this.y + 250);
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
        Laya.Pool.recover("enemy3", this);
        Laya.timer.clear(this, this.onloop);
    }
    public beHit() {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "enemy3_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                Laya.Pool.recover("enemy3", this);
            });
        } else {
            this.body.play(1, true, "enemy3_hit");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                this.body.play(1, true, "enemy3_fly");
            });
        }
    }
}