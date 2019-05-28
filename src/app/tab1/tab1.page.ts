import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

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
    private push: Push
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

  //Notification
  notification() {
    console.log("noti")
    LocalNotifications.schedule({
      notifications: [
        {
          title: "Title",
          body: "Body",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  }

  //Notify Push
  notifyPush() {
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
    }).then(() => console.log('Channel created'));

    // Return a list of currently configured channels
    this.push.listChannels().then((channels) => console.log('List of channels', channels))

    // to initialize push notifications

    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    }

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

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
