
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BomberManUI extends View {
		public title:Laya.Image;
		public playerChoose:Laya.RadioGroup;

        public static  uiView:any ={"type":"View","props":{"width":336,"height":536},"child":[{"type":"Image","props":{"y":120,"x":54.5,"width":227,"var":"title","skin":"res/title.png","height":139}},{"type":"RadioGroup","props":{"y":288,"x":127.5,"width":81,"var":"playerChoose","space":15,"selectedIndex":0,"labels":"单人游戏,双人游戏","labelSize":16,"labelBold":true,"labelAlign":"center","height":50,"direction":"vertical"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.BomberManUI.uiView);
        }
    }
}

module ui {
    export class ChatUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","height":400}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChatUI.uiView);
        }
    }
}

module ui {
    export class ChatAllUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","height":400}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChatAllUI.uiView);
        }
    }
}

module ui {
    export class LoadingUI extends View {
		public progress:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":336,"height":536},"child":[{"type":"ProgressBar","props":{"y":282,"x":50,"width":236,"var":"progress","skin":"comp/progress.png","sizeGrid":"0,0,0,0","height":15}},{"type":"Label","props":{"y":328,"x":127.5,"width":81,"text":"loading...","height":22,"fontSize":16,"color":"#30e8e8","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoadingUI.uiView);
        }
    }
}
