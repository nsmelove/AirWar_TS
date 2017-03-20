/*
* name;
*/
class Hero extends Laya.Sprite {
    private static cached: boolean = false;
    private body: Laya.Animation;
    private hp: number;
    private hitInteral: number;
    private lastHitTime: number;
    constructor() {
        super();
        if (!Hero.cached) {
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
            Hero.cached = true;
        }
        this.init();
    }
    
    private init(): void {
        this.hp = 5;
        this.hitInteral = 500;
        this.body = new Laya.Animation();
        this.body.play(0, true, "hero_fly");
        let bound = this.body.getBounds();
        this.width = bound.width;
        this.height = bound.height;
        this.body.pivotX = bound.width / 2;
        this.body.pivotY = bound.height / 2;
        this.addChild(this.body);
        let colorFilter:Laya.ColorFilter;
            colorFilter = new Laya.ColorFilter([0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]);
            this.filters = [colorFilter];
            //this.blendMode
         Laya.timer.frameLoop(1, this, this.onloop);
    }

    private onloop() {
        let now: number = Laya.Browser.now();
        if (this.lastHitTime == null || now - this.lastHitTime >= this.hitInteral) {
            let bullet: Bullet = Laya.Pool.getItemByCreateFun("bullet1", function () {
                return new Bullet(1);
            });
            bullet.init();
            bullet.pos(this.x, this.y - this.height/2 -20);
            if (this.parent) {
                this.parent.addChild(bullet);
            }
            this.lastHitTime = now;
        }
    }

    public beHit() {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.body.play(1, true, "hero_down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            });
        }
    }
}