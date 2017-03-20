/*
* name;
*/
class Bomb extends Laya.Sprite {
    private static cached: boolean = false
    private body: Laya.Animation;
    private bombRange: number;
    public fireTime: number;
    private fired: boolean;
    constructor(range: number = 1, timer: boolean = false) {
        super();
        if (!Bomb.cached) {
            Laya.Animation.createFrames(["bomb/bomb1.png", "bomb/bomb2.png", "bomb/bomb3.png", "bomb/bomb4.png"], "bomb");
            Laya.Animation.createFrames(["fire/fireCenter1.png", "fire/fireCenter2.png", "fire/fireCenter3.png", "fire/fireCenter4.png"], "fire_center");
            Laya.Animation.createFrames(["fire/fireLeft1.png", "fire/fireLeft2.png", "fire/fireLeft3.png", "fire/fireLeft4.png"], "fire_left");
            Laya.Animation.createFrames(["fire/fireRight1.png", "fire/fireRight2.png", "fire/fireRight3.png", "fire/fireRight4.png"], "fire_right");
            Laya.Animation.createFrames(["fire/fireUp1.png", "fire/fireUp2.png", "fire/fireUp3.png", "fire/fireUp4.png"], "fire_up");
            Laya.Animation.createFrames(["fire/fireDown1.png", "fire/fireDown2.png", "fire/fireDown3.png", "fire/fireDown4.png"], "fire_down");
            Laya.Animation.createFrames(["fire/fireHorizon1.png", "fire/fireHorizon2.png", "fire/fireHorizon3.png", "fire/fireHorizon4.png"], "fire_horizon");
            Laya.Animation.createFrames(["fire/fireVertical1.png", "fire/fireVertical2.png", "fire/fireVertical3.png", "fire/fireVertical4.png"], "fire_vertical");
            Bomb.cached = true;
        }
        this.bombRange = range;
        this.body = new Laya.Animation();
        this.width = this.body.width = Barrier.TIlE_W;
        this.height = this.body.height = Barrier.TIlE_H;
        this.body.interval = 250;
        this.body.play(1, true, "bomb");
        if (!timer) {
            this.fireTime = Laya.Browser.now() + 3000;
        }
        this.fired = false;
        this.addChild(this.body);
        Laya.timer.frameLoop(1, this, this.onloop);
    }

    public onloop() {
        if (this.fired) {
            //爆炸销毁敌人检测
            if (this.parent) {
                let barrier: Barrier = this.parent as Barrier;
                for (let body of this._childs as Array<Laya.Animation>) {
                    for (let tile of barrier._childs as Array<Laya.Sprite>) {
                        if (tile instanceof Enemy) {
                            if (Math.abs(this.x + body.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y + body.y - tile.y) < Barrier.TIlE_H - 1) {
                                tile.down();
                                break;
                            }
                        }
                    }
                }
            }
        } else {
            if (this.fireTime > 0 && Laya.Browser.now() >= this.fireTime) {
                this.fire();
            }
        }
    }

    public fire() {
        this.fired = true;
        this.body.play(1, true, "fire_center");
        var fireBody: Laya.Animation;
        for (let i = 1; i < this.bombRange; i++) {
            fireBody = new Laya.Animation();
            fireBody.x = -Barrier.TIlE_W * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_horizon");
            this.addChild(fireBody);

            fireBody = new Laya.Animation();
            fireBody.x = Barrier.TIlE_W * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_horizon");
            this.addChild(fireBody);

            fireBody = new Laya.Animation();
            fireBody.y = -Barrier.TIlE_H * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_vertical");
            this.addChild(fireBody);

            fireBody = new Laya.Animation();
            fireBody.y = Barrier.TIlE_H * i;
            fireBody.width = Barrier.TIlE_W;
            fireBody.height = Barrier.TIlE_H;
            fireBody.interval = 250;
            fireBody.play(1, true, "fire_vertical");
            this.addChild(fireBody);
        }
        fireBody = new Laya.Animation();
        fireBody.x = -Barrier.TIlE_W * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_left");
        this.addChild(fireBody);

        fireBody = new Laya.Animation();
        fireBody.x = Barrier.TIlE_W * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_right");
        this.addChild(fireBody);

        fireBody = new Laya.Animation();
        fireBody.y = -Barrier.TIlE_H * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_up");
        this.addChild(fireBody);

        fireBody = new Laya.Animation();
        fireBody.y = Barrier.TIlE_H * this.bombRange;
        fireBody.width = Barrier.TIlE_W;
        fireBody.height = Barrier.TIlE_H;
        fireBody.interval = 250;
        fireBody.play(1, true, "fire_down");
        this.addChild(fireBody);

        this.body.once(Laya.Event.COMPLETE, this, function () {
            //console.log(this.x, this.y, this.width, this.height);
            if (this.parent) {
                let barrier: Barrier = this.parent;
                barrier.removeChild(this);
                //爆炸销毁墙面检测
                for (let body of this._childs as Array<Laya.Animation>) {
                    for (let tile of barrier.getMap()._childs as Array<Laya.Sprite>) {
                        if (tile instanceof Wall && Math.abs(this.x + body.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y + body.y - tile.y) < Barrier.TIlE_H - 1) {
                            tile.removeSelf();
                            break;
                        }
                    }
                }
            }
        });

    }
}