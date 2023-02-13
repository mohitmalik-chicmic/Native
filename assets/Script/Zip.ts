import { _decorator, Component, Node, ImageAsset, SpriteFrame, Texture2D, Sprite, find, native, assetManager } from "cc";
const { ccclass, property } = _decorator;
// import http from "http";
//import JSZip from "jszip";

declare global {
    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean;
    }
}

/**
 interface OutputByType {
    base64: string;
    string: string;
    text: string;
    binarystring: string;
    array: number[];
    uint8array: Uint8Array;
    arraybuffer: ArrayBuffer;
    blob: Blob;
    nodebuffer: Buffer;
}

 */
@ccclass("Zip")
export class Zip extends Component {
    @property(Sprite) RandomSprite: Sprite = null;
    result =0;
    imageArray : SpriteFrame[] = [];
    start() {
        //this.createDemoImage();
        this.downlaodZip();
      //  var zip = new JSZip();
       // console.log(zip);

        //Picture
        // this.loadUsingRequest("https://drive.google.com/uc?export=download&id=1f0FHWfXE4exUErKzzsOj_7GTuc1FmtEg");

        // Mask
       // this.loadUsingRequest("https://drive.google.com/uc?export=download&id=14MVx2mgsInNdfYx8jQ-6QwwgbPASpxQt");

        // this.loadFromRemote();
        // this.loadZip();
    }
    // downlaodZip = () => {
    //     console.log("clikced");
    //     let result = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "ZipDownlaod", "(Ljava/lang/String;)Ljava/lang/String;", "start");
    //     if(result){
    //         console.log("PRINTING", result);
    //         let absolutePath = `${result}/1.jpg`
    //         assetManager.loadRemote<ImageAsset>(absolutePath, (err, imageAsset) => {
    //             console.log("PATH", absolutePath);
    //             if (err) {
    //                 console.log("ERROR");
    //                 console.log(JSON.stringify(err));
    //                 return;
    //             }
    //             console.log("NO ERROR");
    //             const spriteFrame = new SpriteFrame();
    //             const texture = new Texture2D();
    //             texture.image = imageAsset;
    //             spriteFrame.texture = texture;
    //             console.log("SPRITE", JSON.stringify(spriteFrame));
    //             this.RandomSprite.spriteFrame = spriteFrame;    
    //             //this.node.getComponent(Sprite).spriteFrame = spriteFrame;
    //         });
    //         }
    //         this.showImages()
    // }
    downlaodZip = () => {
        console.log("clikced");
        this.result = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "ZipDownload", "(I)I",1);
        console.log("COCOS resuklt",this.result);
        if(this.result>0){
            for(let i=0;i<this.result;i++){
                this.showImages(i);
            }
            if(this.result==4)
            console.log("IMAGE ARRAY", this.imageArray.length)
        }
        
        
    }
        
    showImages= (index) =>{

        let result = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "getImages", "(I)Ljava/lang/String;", index);
        console.log("RESULT",result);
        if(result){
                  //  console.log("PRINTING", result);
                    let absolutePath = `${result}`
                    assetManager.loadRemote<ImageAsset>(absolutePath, (err, imageAsset) => {
                        console.log("PATH", absolutePath);
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
                        this.imageArray.push(spriteFrame);
                        console.log("IMAGE ARRAY", this.imageArray.length)
                        this.RandomSprite.spriteFrame = spriteFrame;    
                        //this.node.getComponent(Sprite).spriteFrame = spriteFrame;
                    });
                }
        
    }
    }

    // loadUsingRequest(remoteZipLink: string) {
    //     const request = new Request(remoteZipLink); 

    //     const url = request.url;
    //     const method = request.method;
    //     const credentials = request.credentials;

    //     console.log(url, method, credentials);

    //     fetch(request)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //             console.log(blob);

    //             JSZip.loadAsync(blob).then((zip) => {
    //                 console.log("LOADED SUCCESS", zip);
    //                 return zip
    //                     .file("Mask/maskLeft.png")
    //                     .async("base64")
    //                     .then((data: string) => {
    //                         let img = new Image();
    //                         img.src = "data:image/png;base64, " + data;
    //                         console.log(data);
    //                         img.onload = () => {
    //                             let imageAsset: ImageAsset = new ImageAsset(img);
    //                             let tex: Texture2D = new Texture2D();
    //                             tex.image = imageAsset;
    //                             let spriteFrame = new SpriteFrame();
    //                             spriteFrame.texture = tex;
    //                             spriteFrame.packable = false;
    //                             this.RandomSprite.spriteFrame = spriteFrame;
    //                         };
    //                     });
    //             });
    //         });
    // }

    // createDemoImage() {
    //     let tempArr: number[] = [];
    //     for (let i: number = 0; i < 16384; i++) {
    //         tempArr.push(255);
    //         tempArr.push(255);
    //         tempArr.push(255);
    //         tempArr.push(255);
    //     }
    //     for (let i: number = 0; i < 16384; i++) {
    //         tempArr.push(255);
    //         tempArr.push(0);
    //         tempArr.push(0);
    //         tempArr.push(255);
    //     }
    //     for (let i: number = 0; i < 16384; i++) {
    //         tempArr.push(0);
    //         tempArr.push(255);
    //         tempArr.push(0);
    //         tempArr.push(255);
    //     }
    //     for (let i: number = 0; i < 16384; i++) {
    //         tempArr.push(0);
    //         tempArr.push(0);
    //         tempArr.push(255);
    //         tempArr.push(255);
    //     }

    //     let pixelsArr: ArrayBufferView = new Uint8Array(tempArr);
    //     let imageAsset: ImageAsset = new ImageAsset();
    //     imageAsset.reset({
    //         _data: pixelsArr,
    //         width: 256,
    //         height: 256,
    //         format: Texture2D.PixelFormat.RGBA8888,
    //         _compressed: false,
    //     });
    //     let tex: Texture2D = new Texture2D();
    //     tex.image = imageAsset;
    //     let spriteFrame = new SpriteFrame();
    //     spriteFrame.texture = tex;
    //     spriteFrame.packable = false;
    //     this.RandomSprite.spriteFrame = spriteFrame;
