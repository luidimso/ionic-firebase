import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Post, PostService } from '../services/post.service';
import * as moment from 'moment';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public textPost: string = "";
  public posts: Post[] = [];

  constructor(
    private postService: PostService,
    public fireAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private navController: NavController
  ) {}

  async ngOnInit() {
    let loading = await this.loadingController.create({
      message: "Loading feed..."
    });

    loading.present();

    this.postService.getPosts().subscribe((posts:Post[]) => {
      loading.dismiss();

      this.posts = posts.sort((a, b) => {
          if(new Date(a.createdAt) > new Date(b.createdAt)) {
            return -1;
          } else if(new Date(b.createdAt) > new Date(a.createdAt)) {
            return 1;
          } else {
            return 0;
          }
        }
      );
    })
  }

  async post() {
    const user = await this.fireAuth.currentUser;

    this.postService.addPost(this.textPost, user).then((document) => {
      this.textPost = "";
    }).catch((error) => {
      console.log(error);
    })
  } 

  now(time:string) {
    const date = new Date(time);

    let difference = moment(date).diff(moment());

    return moment.duration(difference).humanize();
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.navController.navigateRoot("/");
    });
  }

}
