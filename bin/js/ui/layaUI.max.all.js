var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var BomberManUI = (function (_super) {
        __extends(BomberManUI, _super);
        function BomberManUI() {
            return _super.call(this) || this;
        }
        BomberManUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.BomberManUI.uiView);
        };
        return BomberManUI;
    }(View));
    BomberManUI.uiView = { "type": "View", "props": { "width": 336, "height": 536 }, "child": [{ "type": "Image", "props": { "y": 120, "x": 54.5, "width": 227, "var": "title", "skin": "res/title.png", "height": 139 } }, { "type": "RadioGroup", "props": { "y": 288, "x": 127.5, "width": 81, "var": "playerChoose", "space": 15, "selectedIndex": 0, "labels": "单人游戏,双人游戏", "labelSize": 16, "labelBold": true, "labelAlign": "center", "height": 50, "direction": "vertical" } }] };
    ui.BomberManUI = BomberManUI;
})(ui || (ui = {}));
(function (ui) {
    var ChatUI = (function (_super) {
        __extends(ChatUI, _super);
        function ChatUI() {
            return _super.call(this) || this;
        }
        ChatUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ChatUI.uiView);
        };
        return ChatUI;
    }(View));
    ChatUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "height": 400 } }] };
    ui.ChatUI = ChatUI;
})(ui || (ui = {}));
(function (ui) {
    var ChatAllUI = (function (_super) {
        __extends(ChatAllUI, _super);
        function ChatAllUI() {
            return _super.call(this) || this;
        }
        ChatAllUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ChatAllUI.uiView);
        };
        return ChatAllUI;
    }(View));
    ChatAllUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "height": 400 } }] };
    ui.ChatAllUI = ChatAllUI;
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingUI.uiView);
        };
        return LoadingUI;
    }(View));
    LoadingUI.uiView = { "type": "View", "props": { "width": 336, "height": 536 }, "child": [{ "type": "ProgressBar", "props": { "y": 282, "x": 50, "width": 236, "var": "progress", "skin": "comp/progress.png", "sizeGrid": "0,0,0,0", "height": 15 } }, { "type": "Label", "props": { "y": 328, "x": 127.5, "width": 81, "text": "loading...", "height": 22, "fontSize": 16, "color": "#30e8e8", "align": "center" } }] };
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map