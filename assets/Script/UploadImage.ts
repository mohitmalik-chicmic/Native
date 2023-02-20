import { _decorator, Component, Node, ImageAsset, SpriteFrame, Texture2D, Sprite, find, native, assetManager, UITransform } from "cc";
const { ccclass, property } = _decorator;
@ccclass("UploadImage")
export class UploadImage extends Component {
    @property(Sprite) RandomSprite: Sprite = null;
    result: any;
    path: any = null;
    interval: number;

    start() {
    }
    galleryUpload(){
        console.log("clicked");
        let result = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "jsLink", "(Ljava/lang/String;)Ljava/lang/String;","Called");
        console.log("COCOS result",result);
        this.getImagePath();
    }
    getImagePath= () =>{
        this.interval = setInterval(()=>{
            this.path = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "imagePath", "(Ljava/lang/String;)Ljava/lang/String;","Called");
            this.checkInterval();
        },1000);
    }
        checkInterval(){
            if(this.path!=null){
                clearInterval(this.interval);
                console.log("*********SUCCESS********");
                console.log("Path Received", this.path);
                this.setProfile();
               }
        }
        setProfile(){
             assetManager.loadRemote<ImageAsset>(this.path, (err, imageAsset) => {
            console.log("PATH", this.path);
            if (err) {
                console.log("ERROR");
                console.log(JSON.stringify(err));
                return;
            }
            console.log("NO ERROR");
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            console.log("SPRITE", JSON.stringify(spriteFrame));


            this.RandomSprite.spriteFrame = spriteFrame;  
            this.RandomSprite.getComponent(UITransform).height = 350;
            this.RandomSprite.getComponent(UITransform).width = 350;
            //this.node.getComponent(Sprite).spriteFrame = spriteFrame;
            });
        }
        cameraUpload(){
            console.log("Inside Camera Upload");
            this.path = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "cameraImage", "(Ljava/lang/String;)Ljava/lang/String;","Called");
            this.getImagePath();
        }
    }   
        // assetManager.loadRemote<ImageAsset>(this.result, (err, imageAsset) => {
        //     console.log("PATH", this.result);
        //     if (err) {
        //         console.log("ERROR");
        //         console.log(JSON.stringify(err));
        //         return;
        //     }
        //     console.log("NO ERROR");
        //     const spriteFrame = new SpriteFrame();
        //     const texture = new Texture2D();
        //     texture.image = imageAsset;
        //     spriteFrame.texture = texture;
        //     console.log("SPRITE", JSON.stringify(spriteFrame));
        //     this.RandomSprite.spriteFrame = spriteFrame;    
        //     //this.node.getComponent(Sprite).spriteFrame = spriteFrame;
        // });
        
   