/*
* name;
*/
class Player extends Laya.Sprite {
    private static cached: boolean = false;
    private body: Laya.Animation;
    private actionName: string;
    public actionTime: number;
    //炸弹总数量
    private bombLimit:number;
    //炸弹爆炸范围
    private bombRange:number;
    //是否可以穿墙
    private throughWall:boolean;
    //是否可以穿透敌人
    private throughEnemy:boolean;
    //每毫秒速度
    private speed: number;
    constructor() {
        super();
        if (!Player.cached) {
            Laya.Animation.createFrames(["play/up1.png", "play/up2.png", "play/up3.png", "play/up4.png"], "player_up");
            Laya.Animation.createFrames(["play/down1.png", "play/down2.png", "play/down3.png", "play/down4.png"], "player_down");
            Laya.Animation.createFrames(["play/left1.png", "play/left2.png", "play/left3.png", "play/left4.png"], "player_left");
            Laya.Animation.createFrames(["play/right1.png", "play/right2.png", "play/right3.png", "play/right4.png"], "player_right");
            Laya.Animation.createFrames(["play/down1.png"], "player_stop");
            Player.cached = true;
        }
        this.body = new Laya.Animation();
        this.width = this.body.width = Barrier.TIlE_W;
        this.height = this.body.height = Barrier.TIlE_H;
        this.addChild(this.body);
        this.zOrder = 10;
        this.bombLimit = 1;
        this.bombRange = 1;
        this.throughWall = false;
        this.throughEnemy = false;
        this.stop();
        Laya.timer.frameLoop(1, this, this.onloop);
    }

    public reset(){
        this.bombLimit = 1;
        this.bombRange = 1;
        this.throughWall = false;
        this.throughEnemy = false;
        this.stop();
    }

    public onloop() {
        let now = Laya.Browser.now();
        let loopDistance = (now - this.actionTime) * this.speed;
        this.actionTime = now;
        let lastX = this.x;
        let lastY = this.y;
        if (this.actionName == "up") {
            this.y -= loopDistance;
        } else if (this.actionName == "down") {
            this.y += loopDistance;
        } else if (this.actionName == "left") {
            this.x -= loopDistance;
        } else if (this.actionName == "right") {
            this.x += loopDistance;
        }
        if (loopDistance) {
            if (this.parent && this.parent instanceof Barrier) {
                let barrier: Barrier = this.parent as Barrier;
                let canWalk = true;
                if (this.x < 0 || this.x + this.width > barrier.width
                    || this.y < 0 || this.y + this.height > barrier.height) {
                    canWalk = false;
                } else {
                    for (let tile of barrier._childs as Array<Laya.Sprite>) {
                        if (tile instanceof Bomb) {
                            let detX = Math.abs(this.x - tile.x);
                            let detY = Math.abs(this.y - tile.y);
                            let lastDetX = Math.abs(lastX - tile.x);
                            let lastDetY = Math.abs(lastY - tile.y);
                            if (detX < Barrier.TIlE_W - 1 && detY < Barrier.TIlE_H - 1 && (detX < lastDetX || detY < lastDetY)) {
                                canWalk = false;
                                break;
                            }
                        }
                    }
                    for (let tile of barrier.getMap()._childs as Array<Laya.Sprite>) {
                        if (Math.abs(this.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y - tile.y) < Barrier.TIlE_H - 1) {
                            if(tile instanceof Tile || !this.throughWall) {
                                canWalk = false;
                            }
                            break;
                        }
                    }
                }
                if (!canWalk) {
                    this.x = lastX;
                    this.y = lastY;
                }
            }
        }
    }

    public getActionName(): string {
        return this.actionName;
    }

    public getActionTime(): number {
        return this.actionTime;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public walkUp() {
        if (this.actionName != "up") {
            this.actionName = "up";
            this.body.play(1, true, "player_up");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    }

    public walkDown() {
        if (this.actionName != "down") {
            this.actionName = "down";
            this.body.play(1, true, "player_down");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    }

    public walkLeft() {
        if (this.actionName != "left") {
            this.actionName = "left";
            this.body.play(1, true, "player_left");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    }

    public walkRight() {
        if (this.actionName != "right") {
            this.actionName = "right";
            this.body.play(1, true, "player_right");
            this.speed = 80 / 1000;
            this.actionTime = Laya.Browser.now();
        }
    }

    public stop() {
        if (this.actionName != "stop") {
            this.actionName = "stop";
            this.body.play(1, true, "player_stop");
            this.speed = 0;
            this.actionTime = Laya.Browser.now();
        }
    }

}