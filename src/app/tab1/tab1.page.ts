import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
    private androidPermissions: AndroidPermissions,
    private localNotifications: LocalNotifications
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

  notification() {
    console.log("noti")
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
    });
  }

}
