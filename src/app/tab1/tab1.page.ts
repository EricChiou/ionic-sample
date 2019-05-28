import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public photos: any;
  public base64Image: string;

  constructor(
    private camera: Camera,
    private androidPermissions: AndroidPermissions
  ) {

  }

  clickImage() {
    //need "ionic cordova plugin add cordova-plugin-android-permissions" & "npm install @ionic-native/android-permissions"
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    //need "ionic cordova plugin add cordova-plugin-camera" & "npm install @ionic-native/camera"
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      // Handle error
    });
  }

  videoStearm() {
    const video = document.getElementsByTagName('video')[0];

    if (video.srcObject) {
      const stream: any = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
      video.srcObject = null;

    } else {
      const constraints = { audio: true, video: true };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.play();
      }).catch((error) => {
        // console.error("getUserMedia error: ", error);
      });
    }
  }

  audioStearm() {
    const audio = document.getElementsByTagName('audio')[0];

    if (audio.srcObject) {
      const stream: any = audio.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
      audio.srcObject = null;

    } else {
      const constraints = { audio: true, video: false };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        audio.srcObject = stream;
        audio.play();
      }).catch((error) => {
        // console.error("getUserMedia error: ", error);
      });
    }
  }
}
