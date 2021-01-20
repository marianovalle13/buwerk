import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Constants } from '../../app/app.constants';
import { ActionSheetController, Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare var cordova: any;


// Plugins
// =======
//
//
// Command line
// ------------
//
// ionic cordova plugin add cordova-plugin-file-transfer
// npm install --save @ionic-native/file-transfer@4
//
// ionic cordova plugin add cordova-plugin-file
// npm install --save @ionic-native/file@4
//
// ionic cordova plugin add cordova-plugin-filepath
// npm install --save @ionic-native/file-path@4
//
// ionic cordova plugin add cordova-plugin-camera
// npm install --save @ionic-native/camera@4
//
// cordova plugin add cordova-android-support-gradle-release
//
//
//
// app.module.ts
// -------------
//
// import { File } from '@ionic-native/file';
// import { FileTransfer } from '@ionic-native/file-transfer';
// import { FilePath } from '@ionic-native/file-path';
// import { Camera } from '@ionic-native/camera';
//
// providers: [
//  ...
//  File,
//  FileTransfer,
//  FilePath,
//  Camera,
//  ...
// ]
//
//
// app.constants.ts
// ----------------
//
//  public static API_METHOD_FILE_UPLOAD  = '/files/upload';
//  public static FILES_BASE_URL='http://localhost:3079/files';
//  public static DEFAULT_AVATAR_NO_IMAGE = "assets/imgs/avatar.png";
//
//
// use (example)
// -------------
//
// image:string = Constants.DEFAULT_AVATAR_NO_IMAGE;
//
// loadImage(){
//   this.pictureProvider.selectSource(this,'PROFILE');
// }
//
// loadStudentImage(){
//   if(this.formObject.value.image)
//     this.image = Constants.FILES_BASE_URL + "/" + this.formObject.value.image;
// }
//
// // Metodo llamado para ubicar la imagen desde el archivo local
// setImageSrcLocal(imageSrc,imageType){
//   this.image = imageSrc;
// }
//
// // Metodo llamado para ubicar la imagen desde el server
// setImageSrc(imageSrc,imageType){
//   this.image = imageSrc;
//   var is = imageSrc.split("/");
//   this.formObject.value.image = is[is.length - 1];
// }




@Injectable()
export class PictureProvider {

  constructor(
    public http: HttpClient,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private fileTransfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private platform: Platform
  ) {
    //console.log('Hello PictureProvider Provider');
  }

  IMG_QUALITY=70;
  IMG_TARGET_WIDTH=1000;
  IMG_TARGET_HEIGHT=1000;

  parent:any;
  imageType:any;

  //Photo
  selectSource(parent,imageType) {
    this.parent = parent;
    this.imageType = imageType;
    let actionSheet = this.actionSheetCtrl.create({
      title: '¿Como desea cargar su imagen?',
      buttons: [
        {
          text: 'Galería de imágenes',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            console.log("galeria");
          }
        },
        {
          text: 'Cámara de fotos',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            console.log("camara");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: this.IMG_QUALITY,
      targetWidth: this.IMG_TARGET_WIDTH,
      targetHeight: this.IMG_TARGET_HEIGHT,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            console.log("correctPath:"+correctPath);
            console.log("currentName:"+currentName);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });

          this.file.resolveLocalFilesystemUrl(imagePath)
          .then(filePath => {
            console.log("fileChooser.open()-filePath:",filePath);
            console.log(JSON.stringify(filePath) );
            // self.uploadDocument(filePath);
            // self.processFilePath(filePath.nativeURL);
          });

      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    console.log(newFileName);
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {

    console.log("copyFileToLocalDir:" + namePath + " - "+ currentName + " - "+ newFileName);

    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      //this.lastImage = newFileName;
      //this.presentToast(this.lastImage);
      //this.uploadImage();
      console.log("copyFileToLocalDir - ok:" + namePath + " - "+ currentName + " - " + cordova.file.dataDirectory + " - "+ newFileName);
      //this.parent.imageSelected(newFileName);
      this.uploadFile(newFileName);
//      //alert(newFileName);
    }, error => {
      console.log('copyFileToLocalDir - error:' + JSON.stringify(error));
//      //alert('Error while storing file.');
    });
  }

  uploadFile(imageName){

    try{

      //alert("imageName:" + imageName);

      var self = this;
      //this.base64Image = cordova.file.dataDirectory + imageName;

      this.parent.setImageSrcLocal(cordova.file.dataDirectory + imageName,this.imageType);

      var url = Constants.API_BASE_URL + Constants.API_METHOD_FILE_UPLOAD;
      console.log("Upload URL: " + url);

      // File for Upload
      var targetPath = cordova.file.dataDirectory + imageName;
      console.log("targetPath: " + targetPath);
      //alert("targetPath: " + targetPath);

      // File name only
      var filename = imageName;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "image/jpeg"
      };
    //alert("OPTIONS FOTO: " + JSON.stringify(options));

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    //alert("Antes del file transfer");
    // Use the FileTransfer to upload the image
    console.log({targetPath, url, options});

    fileTransfer.upload(targetPath, url, options).then(data => {

    //alert("File Transfer data " + data);
      let res: any = data;
      //alert("File Transfer res " + res);
      let response: any = JSON.parse(data.response);
      //alert("File Transfer response " + JSON.stringify(response) );
      let fileName = response.file;
      //alert("File Transfer data " + fileName);
      console.log('La imagen fué enviada con éxito');
      //self.base64Image = Constants.IMAGES_BASE_URL + "/" + response.image;
      this.parent.setImageSrc(Constants.FILES_BASE_URL + "/" + fileName,this.imageType,filename);
      ////alert('La imagen cargada');
    }, err => {
      console.log("File Transfer error " + JSON.stringify(err));
      console.log(err);

      //alert('Ha ocurrido un error');
    });

  }catch(e){
    console.log("error no esperado:" + e.message);
    //alert("error no esperado:" + e.message);
  }

  }
}
