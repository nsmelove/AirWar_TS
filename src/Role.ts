/*
* name;
*/
class Role extends Laya.Sprite {
    private static cahed: boolean = false
    private roleType: RoleType;
    private hp: number;
    private hitInteral: number;
    private body: Laya.Animation = new Laya.Animation();
    constructor() {
        super();
        if (!Role.cahed) {
            Role.cacheFrame();
            Role.cahed = true;
        }
    }
    private static cacheFrame() {
        Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");

        Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
        Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");

        Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
        Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");

        Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
        Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
        Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png"], "enemy3_down");

        Laya.Animation.createFrames(["war/ufo1.png"], "ufo1_fly");
        Laya.Animation.createFrames(["war/ufo2.png"], "ufo2_fly");

        Laya.Animation.createFrames(["war/bullet1.png"], "bullet_fly");
    }

    public init(roleType: RoleType) {
        this.roleType = roleType;
        if (this.roleType == RoleType.Hero) {
            this.hp = 5;
             this.body.play(1, true, "hero_fly");
        } else if (this.roleType == RoleType.Enemy1) {
            this.hp = 1;
              this.body.play(1, true, "enemy1_fly");
        } else if (this.roleType == RoleType.Enemy2) {
            this.hp = 2;
              this.body.play(1, true, "enemy2_fly");
        } else if (this.roleType == RoleType.Enemy3) {
            this.hp = 5;
             this.body.play(1, true, "enemy3_fly");
        }else if (this.roleType == RoleType.UFO1) {
             this.body.play(1, true, "ufo1_fly");
        }else if (this.roleType == RoleType.UFO2) {
             this.body.play(1, true, "ufo2_fly");
        }else if (this.roleType == RoleType.BULLET) {
             this.body.play(1, true, "bullet_fly");
        }
        Laya.timer.frameLoop(1,this,this.onloop);
        return this;
    }
    private onloop(){
        if(this.roleType == RoleType.Enemy1 || this.roleType == RoleType.Enemy2 || this.roleType == RoleType.Enemy3 
        ||this.roleType == RoleType.UFO1 || this.roleType == RoleType.UFO2){
            this.y += 1;
        }else if(this.roleType == RoleType.BULLET) {
             this.y += 2;
        }
    }
    public beHit() {
        if (this.roleType != null) {
            if (this.roleType == RoleType.UFO1 || this.roleType == RoleType.UFO2 || this.roleType == RoleType.BULLET) {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                Laya.Pool.recover("role", this);
            } else {
                this.hp -= 1;
                if (this.hp <= 0) {
                    if (this.roleType == RoleType.Hero) {
                        this.body.play(1, false, "hero_down");
                    } else if (this.roleType == RoleType.Enemy1) {
                        this.body.play(1, false, "enemy1_down");
                    } else if (this.roleType == RoleType.Enemy2) {
                        this.body.play(1, false, "enemy2_down");
                    } else if (this.roleType == RoleType.Enemy3) {
                        this.body.play(1, false, "enemy3_down");
                    }
                    this.body.once(Laya.Event.COMPLETE, this, function () {
                        if (this.parent) {
                            this.parent.removeChild(this);
                        }
                        Laya.Pool.recover("role", this);
                    });
                } else {
                    if (this.roleType == RoleType.Enemy3) {
                        this.body.play(1, false, "enemy3_hit");
                        this.body.once(Laya.Event.COMPLETE, this, function () {
                            this.body.play(1, false, "enemy3_fly");
                        });
                    }
                }
            }
        }
    }
}