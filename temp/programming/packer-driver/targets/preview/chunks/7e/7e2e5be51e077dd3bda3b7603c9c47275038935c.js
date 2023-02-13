System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, SpriteFrame, Texture2D, Sprite, native, assetManager, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Zip;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      Sprite = _cc.Sprite;
      native = _cc.native;
      assetManager = _cc.assetManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6f0aeKiX9lNCo3z01z15GpW", "Zip", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'ImageAsset', 'SpriteFrame', 'Texture2D', 'Sprite', 'find', 'native', 'assetManager']);

      ({
        ccclass,
        property
      } = _decorator); // import http from "http";
      //import JSZip from "jszip";

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
      _export("Zip", Zip = (_dec = ccclass("Zip"), _dec2 = property(Sprite), _dec(_class = (_class2 = class Zip extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "RandomSprite", _descriptor, this);

          this.result = 0;
          this.imageArray = [];

          this.downlaodZip = () => {
            console.log("clikced");
            this.result = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "ZipDownload", "(I)I", 1);
            console.log("COCOS resuklt", this.result);

            if (this.result > 0) {
              for (var i = 0; i < this.result; i++) {
                this.showImages(i);
              }

              if (this.result == 4) console.log("IMAGE ARRAY", this.imageArray.length);
            }
          };

          this.showImages = index => {
            var result = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "getImages", "(I)Ljava/lang/String;", index);
            console.log("RESULT", result);

            if (result) {
              //  console.log("PRINTING", result);
              var absolutePath = "" + result;
              assetManager.loadRemote(absolutePath, (err, imageAsset) => {
                console.log("PATH", absolutePath);

                if (err) {
                  console.log("ERROR");
                  console.log(JSON.stringify(err));
                  return;
                }

                console.log("NO ERROR");
                var spriteFrame = new SpriteFrame();
                var texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                console.log("SPRITE", JSON.stringify(spriteFrame));
                this.imageArray.push(spriteFrame);
                console.log("IMAGE ARRAY", this.imageArray.length);
                this.RandomSprite.spriteFrame = spriteFrame; //this.node.getComponent(Sprite).spriteFrame = spriteFrame;
              });
            }
          };
        }

        start() {
          //this.createDemoImage();
          this.downlaodZip(); //  var zip = new JSZip();
          // console.log(zip);
          //Picture
          // this.loadUsingRequest("https://drive.google.com/uc?export=download&id=1f0FHWfXE4exUErKzzsOj_7GTuc1FmtEg");
          // Mask
          // this.loadUsingRequest("https://drive.google.com/uc?export=download&id=14MVx2mgsInNdfYx8jQ-6QwwgbPASpxQt");
          // this.loadFromRemote();
          // this.loadZip();
        } // downlaodZip = () => {
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


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "RandomSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class)); // loadUsingRequest(remoteZipLink: string) {
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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7e2e5be51e077dd3bda3b7603c9c47275038935c.js.map