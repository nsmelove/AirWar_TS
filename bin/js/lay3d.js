/*
* name;
*/
var lay3d = (function () {
    function lay3d() {
        //初始化3d画布
        Laya3D.init(0, 0, true);
        //设置全屏
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        //显示统计数据
        Laya.Stat.show();
        //给舞台添加laya3d场景
        var scene = Laya.stage.addChild(new Laya.Scene());
        //初始化照相机
        var camera = scene.addChild(new Laya.Camera());
        camera.transform.position = new Laya.Vector3(0, 3, 3);
        camera.transform.rotate(new Laya.Vector3(-45, 0, 0), true, false);
        //camera.addComponent(Laya.CameraMoveScript);
        //生成平面，其实是一个box，只不过高度很小，可看成一个平面
        var plane = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(4, 4, 0.001)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(1.3, 1.3, 1.3, 1);
        material.diffuseTexture = Laya.Texture2D.load("res/threeDimen/layabox.png");
        plane.meshRender.material = material;
        //生成坐标中心，其实是球体
        var sphere = scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(0.05, 100, 100)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 0, 0, 1);
        sphere.meshRender.material = material;
        sphere.transform.position = new Laya.Vector3(0, 0, 0);
        //模拟x轴，其实是方体
        var x = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(2, 0.03, 0.03)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(1, 0, 0, 1);
        x.meshRender.material = material;
        x.transform.position = new Laya.Vector3(1, 0, 0);
        //模拟y轴，其实是方体
        var y = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03, 0.03, 2)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 1, 0, 1);
        y.meshRender.material = material;
        y.transform.position = new Laya.Vector3(0, 0, 0);
        //模拟z轴，其实是方体
        var z = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03, 2, 0.03)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 0, 1, 1);
        z.meshRender.material = material;
        z.transform.position = new Laya.Vector3(0, 0, 1);
        //生成方体
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.3, 0.3, 0.3)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0.5, 0.5, 0.5, 1);
        box.meshRender.material = material;
    }
    return lay3d;
}());
//new lay3d(); 
//# sourceMappingURL=lay3d.js.map