import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthgoogleService {
  constructor(private auth: AngularFireAuth) {
    auth.authState.subscribe((user) => {
      console.log(user);
    });
  }

  googleAuth() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
