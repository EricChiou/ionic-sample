import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage {

  // "value" passed in componentProps
  @Input() value: number;

  constructor(
    private modalCtrl: ModalController
  ) {
    // componentProps can also be accessed at construction time using NavParams
  }

  //need import ModalController
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
