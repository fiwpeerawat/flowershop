import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
declare var jquery: any;
declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  userRef: AngularFireObject<any>;
  item: AngularFireList<any[]>;
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
  get currentUserObservable(): any {
    return this.afAuth.authState
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.authState['displayName'] || this.authState['email']
    }
  }


  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        this.updateUserData()

      })
      .catch(error => console.log(error));
  }

  emailSignUp(email: string, password: string , name:string) {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {      
        this.afAuth.auth.onAuthStateChanged((user) => {
          if (user) {
            user.updateProfile({
              displayName: name,
              photoURL: '',
            })
            .then(()=>{
              this.authState = this.afAuth.auth.currentUser; 
              this.updateUserData()
            })  
          }
        })
      })      
      .catch( (error) => {
        return error
      });
  }
  emailLogin(email: string, password: string) : any  {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {        
        this.authState = user.user       
        this.updateUserData()

      })
      .catch( (error) => {
        return error
      });
  }
  resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }
  getCurrentLoggedIn() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/'])
      }
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }

  private updateUserData(): void {
    $('*').modal('hide')    
    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      email: this.authState.email,
      name: this.authState.displayName
    }
    userRef.update(data)
      .catch(error => console.log(error));

  }


}
