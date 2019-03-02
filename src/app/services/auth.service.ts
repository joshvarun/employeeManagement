import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    return await new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData), err => reject(err));
    });
  }


  getAuth() {
    return this.afAuth.authState.pipe();
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
