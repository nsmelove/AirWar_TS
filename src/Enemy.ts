/*
* name;
*/
class Enemy extends Laya.Sprite {
    private static frameCached: boolean = false;
    private static enemyMap = ["A", "B", "C", "D", "E", "F", "G"];
    private type: string;
    private body: Laya.Animation;
    private actionName: string;
    public actionTime: number;
    public speed: number;
    constructor(type: string) {
        super();
        if (!Enemy.frameCached) {
            Laya.Animation.createFrames(["enemy/enemyA1.png", "enemy/enemyA2.png", "enemy/enemyA3.png", "enemy/enemyA4.png"], "enemyA");
            Laya.Animation.createFrames(["enemy/enemyADown1.png", "enemy/enemyADown2.png", "enemy/enemyADown3.png", "enemy/enemyADown4.png"], "enemyADown");
            Laya.Animation.createFrames(["enemy/enemyB1.png", "enemy/enemyB2.png", "enemy/enemyB3.png", "enemy/enemyB4.png"], "enemyB");
            Laya.Animation.createFrames(["enemy/enemyBDown1.png", "enemy/enemyBDown2.png", "enemy/enemyBDown3.png", "enemy/enemyBDown4.png"], "enemyBDown");
            Laya.Animation.createFrames(["enemy/enemyC1.png", "enemy/enemyC2.png", "enemy/enemyC3.png", "enemy/enemyC4.png"], "enemyC");
            Laya.Animation.createFrames(["enemy/enemyCDown1.png", "enemy/enemyCDown2.png", "enemy/enemyCDown3.png", "enemy/enemyCDown4.png"], "enemyCDown");
            Laya.Animation.createFrames(["enemy/enemyD1.png", "enemy/enemyD2.png", "enemy/enemyD3.png", "enemy/enemyD4.png"], "enemyD");
            Laya.Animation.createFrames(["enemy/enemyDDown1.png", "enemy/enemyDDown2.png", "enemy/enemyDDown3.png", "enemy/enemyDDown4.png"], "enemyDDown");
            Laya.Animation.createFrames(["enemy/enemyE1.png", "enemy/enemyE2.png", "enemy/enemyE3.png", "enemy/enemyE4.png"], "enemyE");
            Laya.Animation.createFrames(["enemy/enemyEDown1.png", "enemy/enemyEDown2.png", "enemy/enemyEDown3.png", "enemy/enemyEDown4.png"], "enemyEDown");
            Laya.Animation.createFrames(["enemy/enemyF1.png", "enemy/enemyF2.png", "enemy/enemyF3.png", "enemy/enemyF4.png"], "enemyF");
            Laya.Animation.createFrames(["enemy/enemyFDown1.png", "enemy/enemyFDown2.png", "enemy/enemyFDown3.png", "enemy/enemyFDown4.png"], "enemyFDown");
            Laya.Animation.createFrames(["enemy/enemyG1.png", "enemy/enemyG2.png", "enemy/enemyG3.png", "enemy/enemyG4.png"], "enemyG");
            Laya.Animation.createFrames(["enemy/enemyGDown1.png", "enemy/enemyGDown2.png", "enemy/enemyGDown3.png", "enemy/enemyGDown4.png"], "enemyGDown");
            Enemy.frameCached = true;
        }
        this.type = type;
        this.body = new Laya.Animation();
        this.body.interval = 250;
        this.width = this.body.width = Barrier.TIlE_W;
        this.height = this.body.height = Barrier.TIlE_H;
        this.speed = 50 / 1000;
        this.addChild(this.body);
        this.randomWalk();
        Laya.timer.frameLoop(1, this, this.onloop);
    }
    public static randomEnemy(): Enemy {
        var name = Enemy.enemyMap[Math.floor(Math.random() * Enemy.enemyMap.length)];
        //console.log(name);
        return new Enemy(name);
    }

    public randomWalk() {
        let randomNum = Math.floor(Math.random() * 4)
        if (randomNum == 0) {
            this.walkUp();
        } else if (randomNum == 1) {
            this.walkDown();
        } else if (randomNum == 2) {
            this.walkLeft();
        } else if (randomNum == 3) {
            this.walkRight();
        }
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
        } else if (this.actionName == "down") {
            this.down();
            return;
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
                        if (tile instanceof Bomb || (tile != this && tile instanceof Enemy)) {
                            if (Math.abs(this.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y - tile.y) < Barrier.TIlE_H - 1) {
                                canWalk = false;
                                break;
                            }
                        }
                    }
                    for (let tile of barrier.getMap()._childs as Array<Laya.Sprite>) {
                        if (Math.abs(this.x - tile.x) < Barrier.TIlE_W - 1 && Math.abs(this.y - tile.y) < Barrier.TIlE_H - 1) {
                            canWalk = false;
                            break;
                        }
                    }
                }
                if (!canWalk) {
                    this.x = lastX;
                    this.y = lastY;
                    this.randomWalk();
                }
            }
        }
    }

    public walkUp() {
        if (this.actionName != "up") {
            this.actionName = "up";
            this.body.play(1, true, "enemy" + this.type);
            //this.body.play(1, true, "enemyA");
            this.actionTime = Laya.Browser.now();
        }
    }

    public walkDown() {
        if (this.actionName != "down") {
            this.actionName = "down";
            this.body.play(1, true, "enemy" + this.type);
            this.actionTime = Laya.Browser.now();
        }
    }

    public walkLeft() {
        if (this.actionName != "left") {
            this.actionName = "left";
            this.body.play(1, true, "enemy" + this.type);
            this.actionTime = Laya.Browser.now();
        }
    }

    public walkRight() {
        if (this.actionName != "right") {
            this.actionName = "right";
            this.body.play(1, true, "enemy" + this.type);
            this.actionTime = Laya.Browser.now();
        }
    }

    public down() {
        if (this.actionName != "down") {
            this.actionName = "down";
            this.speed = 0;
            this.body.play(1, false, "enemy" + this.type + "Down");
            this.body.once(Laya.Event.COMPLETE, this, function () {
                if (this.parent) {
                    var barrier: Barrier = this.parent;
                    barrier.removeChild(this);
                }
            });
        }
    }

}