import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    public fireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  signup() {
    this.fireAuth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
      if(user.user) {
        let newUser: firebase.default.User = user.user;

        newUser.updateProfile({
          displayName: this.name
        }).then((res) => {
          console.log(res);
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

}
