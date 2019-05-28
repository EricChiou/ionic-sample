import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ModalController,
  PickerController
} from '@ionic/angular';

import {PickerOptions} from '@ionic/core'

import { ModalpagePage } from '../modalpage/modalpage.page';

@Component({
  selector: 'app-uipage',
  templateUrl: './uipage.page.html',
  styleUrls: ['./uipage.page.scss'],
})
export class UIpagePage implements OnInit {
  framework = '';

  constructor(
    public alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private pickerCtrl: PickerController,
  ) { }

  ngOnInit() {
  }

  //Alert
  //need import AlertController
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  //Ckeckbox
  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  //Toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  //Modal
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalpagePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  //Picker
  //need import PickerController & PickerOptions
  async showPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'framework',
          options: [
            { text: 'Angular', value: 'A' },
            { text: 'Vue', value: 'B' },
            { text: 'React', value: 'C' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('framework');
      this.framework = col.options[col.selectedIndex].text;
    });
  }
}
