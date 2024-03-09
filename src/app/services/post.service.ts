import { Injectable } from "@angular/core";
import { Firestore, addDoc, collection, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface Post {
    text: string,
    createdAt: string,
    owner: string,
    owner_name: string
}

@Injectable({
    providedIn: 'root'
  })
  export class PostService {
  
    constructor(private readonly firestore: Firestore) { }
  
    getPosts(): Observable<Post[]> {
      const programsRef = collection(this.firestore, 'posts');
      return collectionData(programsRef, { idField: 'id'}) as Observable<Post[]>;
    }
  
    addPost(text: string, user:any ) {
      const post = collection(this.firestore, 'posts');

      return addDoc(post, {
        text: text,
        createdAt: new Date().toISOString(),
        owner: user?.uid,
        owner_name: user?.displayName
      });
    }
  }