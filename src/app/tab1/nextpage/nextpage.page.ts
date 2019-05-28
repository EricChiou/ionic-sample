import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nextpage',
  templateUrl: './nextpage.page.html',
  styleUrls: ['./nextpage.page.scss'],
})
export class NextpagePage implements OnInit {

  constructor(
    private location: Location,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }
}
