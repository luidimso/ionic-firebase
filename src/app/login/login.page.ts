import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string = "";
  public password: string = "";

  constructor(
    public navCtrl: NavController,
    public fireAuth: AngularFireAuth,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  goToSignInPage() {
    this.navCtrl.navigateForward("signup")
  }

  signup() {
    this.fireAuth.signInWithEmailAndPassword(this.email, this.password).then(async (user) => {
      let toast = await this.toastController.create({
        message: "Welcome " + user.user?.displayName,
        duration: 3000,
        color: "primary"
      });

      toast.present();
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
