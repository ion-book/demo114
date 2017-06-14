import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TestProvider } from '../../providers/test/test';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  events: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private testProvider: TestProvider
  ) {
  }

  ionViewDidLoad() {
    this.testProvider.getEventsWithSpeaker()
    .subscribe(events =>{
      this.events = events;
    }, error=>{
      console.log( error );
    })
  }

}
