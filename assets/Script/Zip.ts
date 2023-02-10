import { _decorator, Component, Node, ImageAsset, SpriteFrame, Texture2D, Sprite, find, native } from "cc";
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
    start() {
        this.createDemoImage();
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
    downlaodZip = () => {
        console.log("clikced");
        native.reflection.callStaticMethod("com/cocos/game/AppActivity", "ZipDownlaod", "(Ljava/lang/String;)V", "start");
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

    createDemoImage() {
        let tempArr: number[] = [];
        for (let i: number = 0; i < 16384; i++) {
            tempArr.push(255);
            tempArr.push(255);
            tempArr.push(255);
            tempArr.push(255);
        }
        for (let i: number = 0; i < 16384; i++) {
            tempArr.push(255);
            tempArr.push(0);
            tempArr.push(0);
            tempArr.push(255);
        }
        for (let i: number = 0; i < 16384; i++) {
            tempArr.push(0);
            tempArr.push(255);
            tempArr.push(0);
            tempArr.push(255);
        }
        for (let i: number = 0; i < 16384; i++) {
            tempArr.push(0);
            tempArr.push(0);
            tempArr.push(255);
            tempArr.push(255);
        }

        let pixelsArr: ArrayBufferView = new Uint8Array(tempArr);
        let imageAsset: ImageAsset = new ImageAsset();
        imageAsset.reset({
            _data: pixelsArr,
            width: 256,
            height: 256,
            format: Texture2D.PixelFormat.RGBA8888,
            _compressed: false,
        });
        let tex: Texture2D = new Texture2D();
        tex.image = imageAsset;
        let spriteFrame = new SpriteFrame();
        spriteFrame.texture = tex;
        spriteFrame.packable = false;
        this.RandomSprite.spriteFrame = spriteFrame;
    }

    update(deltaTime: number) {}
}
