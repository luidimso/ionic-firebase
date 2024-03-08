import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public name: string = "";
  public email: string = "";
  public password: string = "";

  constructor(
    public navCtrl: NavController,
    public fireAuth: AngularFireAuth,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  signup() {
    this.fireAuth.createUserWithEmailAndPassword(this.email, this.password).then(async (user) => {
      if(user.user) {
        let newUser: firebase.default.User = user.user;

        newUser.updateProfile({
          displayName: this.name
        }).then(async (res) => {
          let toast = await this.toastController.create({
            message: "Account created",
            duration: 3000,
            color: "primary"
          });

          toast.present();
        });
      }
    }).catch(async (error) => {
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger"
      });

      toast.present();
    });
  }

}
