var laya;
(function (laya) {
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var Stat = Laya.Stat;
    var Rectangle = Laya.Rectangle;
    var WebGL = Laya.WebGL;
    var PerformanceTest_Maggots = (function () {
        function PerformanceTest_Maggots() {
            this.texturePath = "res/tinyMaggot.png";
            this.padding = 100;
            this.maggotAmount = 5000;
            this.tick = 0;
            this.maggots = [];
            Laya.init(Browser.width, Browser.height, WebGL);
            Laya.stage.bgColor = "#000000";
            Stat.show();
            this.wrapBounds = new Rectangle(-this.padding, -this.padding, Laya.stage.width + this.padding * 2, Laya.stage.height + this.padding * 2);
            Laya.loader.load(this.texturePath, Handler.create(this, this.onTextureLoaded));
        }
        PerformanceTest_Maggots.prototype.onTextureLoaded = function () {
            this.maggotTexture = Laya.loader.getRes(this.texturePath);
            this.initMaggots();
            Laya.timer.frameLoop(1, this, this.animate);
        };
        PerformanceTest_Maggots.prototype.initMaggots = function () {
            var maggotContainer;
            for (var i = 0; i < this.maggotAmount; i++) {
                if (i % 16000 == 0)
                    maggotContainer = this.createNewContainer();
                var maggot = this.newMaggot();
                maggotContainer.addChild(maggot);
                this.maggots.push(maggot);
            }
        };
        PerformanceTest_Maggots.prototype.createNewContainer = function () {
            var container = new Sprite();
            container.size(Browser.clientWidth, Browser.clientHeight);
            // 此处cacheAsBitmap主要是为了创建新画布
            // 解除IBQuadrangle数量限制
            // 在显示虫子数量超过16383时需要打开下面一行
            //container.cacheAsBitmap = true;
            Laya.stage.addChild(container);
            return container;
        };
        PerformanceTest_Maggots.prototype.newMaggot = function () {
            var maggot = new Sprite();
            maggot.graphics.drawTexture(this.maggotTexture, 0, 0);
            maggot.pivot(16.5, 35);
            var rndScale = 0.8 + Math.random() * 0.3;
            maggot.scale(rndScale, rndScale);
            maggot.rotation = 0.1;
            maggot.x = Math.random() * Laya.stage.width;
            maggot.y = Math.random() * Laya.stage.height;
            maggot.direction = Math.random() * Math.PI;
            //maggot.turningSpeed = Math.random() - 0.8;
            maggot.turningSpeed = 0.5;
            maggot.speed = (2 + Math.random() * 2) * 0.2;
            maggot.offset = Math.random() * 100;
            //maggot.offset = 0;
            return maggot;
        };
        PerformanceTest_Maggots.prototype.animate = function () {
            var maggot;
            var wb = this.wrapBounds;
            var angleUnit = 180 / Math.PI;
            var dir, x = 0.0, y = 0.0;
            for (var i = 0; i < this.maggotAmount; i++) {
                maggot = this.maggots[i];
                maggot.scaleY = 0.90 + Math.sin(this.tick + maggot.offset) * 0.1;
                maggot.direction += maggot.turningSpeed * 0.01;
                dir = maggot.direction;
                x = maggot.x;
                y = maggot.y;
                x += Math.sin(dir) * (maggot.speed * maggot.scaleY);
                y -= Math.cos(dir) * (maggot.speed * maggot.scaleY);
                //maggot.rotation = (-dir + Math.PI) * angleUnit;
                maggot.rotation = dir * angleUnit;
                if (x < wb.x)
                    x += wb.width;
                else if (x > wb.x + wb.width)
                    x -= wb.width;
                if (y < wb.y)
                    y += wb.height;
                else if (y > wb.y + wb.height)
                    y -= wb.height;
                maggot.pos(x, y);
            }
            this.tick += 0.1;
        };
        return PerformanceTest_Maggots;
    }());
    laya.PerformanceTest_Maggots = PerformanceTest_Maggots;
})(laya || (laya = {}));
//new laya.PerformanceTest_Maggots(); 
//# sourceMappingURL=PerformanceTest_Maggots.js.map