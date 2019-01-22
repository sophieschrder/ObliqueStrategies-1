import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { LocalNotifications } from "@ionic-native/local-notifications";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  history: number[];

  data = { title:'', description:'', date:'', time:'' };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public localNotifications: LocalNotifications,
              public platform: Platform,
              public alertCtrl: AlertController) {
  }

  btnPushClicked(){
    this.platform.ready().then(() => {
      // zeitversetzte Benachrichtigung planen
      this.localNotifications.schedule({
        title: 'Quriosity',
        text: 'Hey! Zieh mal heute wieder eine Karte',
        trigger: {at: new Date(new Date().getTime() + 3600)},
        icon: "ic_notifications",
        led: 'FF0000',
        sound: this.setSound(),
      });
    });
  }

  //Funktion/Methode des lokalen Benachrichtigungs-Schedulers
 /* submit() {
    console.log(this.data);
    var date = new Date(this.data.date+" "+this.data.time);
    console.log(date);
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      at: date,
      icon: "ic_notifications",
      led: 'FF0000',
      sound: this.setSound(),
    });
    let alert = this.alertCtrl.create({
      title: 'Gratulation!',
      subTitle: 'Benachrichtigung festgelegt um '+date,
      buttons: ['OK']
    });
    alert.present();
    this.data = { title:'', description:'', date:'', time:'' };
  } */

  //Funktion zum Einstellen der Sounddatei für die jeweilige Plattform
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }


  //History löschen
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  public async showHistory(){
    this.history= await this.storage.get('history');
  }

  public clearHistory(){
    this.storage.clear().then(() => {console.log('Historie entfernt')});
  }
}
