import { Injectable , EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ProductIncardNoAuthService } from '../services/product-incard-no-auth.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
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
    private http: Http,
    private router: Router,
    private productIncard:ProductIncardNoAuthService) {
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
    return this.socialSignIn(provider );
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider );
  }

  private socialSignIn(provider ) {
    console.log(this.authState)
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        this.addUserToDatabase()        
        this.productIncard.mergeCardtoCardInDB(this.authState.email , this.authState.displayName )
      
      })
      .catch(error => console.log(error));
  }

  emailSignUp(email: string, password: string, name: string) {
  
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name,
          photoURL: ""
        }).then( () => {         
          this.authState = credential.user;
          this.addUserToDatabase()               
          this.productIncard.mergeCardtoCardInDB(this.authState.email , this.authState.displayName )  
        })
      })
      .catch((error) => {
        return error
      });
  }
  emailLogin(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user.user
        this.addUserToDatabase()     
        this.productIncard.mergeCardtoCardInDB(this.authState.email , this.authState.displayName )
      })
      .catch((error) => {
        return error
      });
  }
  resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => {return 'email sent'} )
      .catch((error) => {return error} )
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
    var form = new FormData();
    form.append('addEmail', this.authState.email);
    form.append('userName', this.authState.displayName);
    this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/sign-out.php', form).subscribe();
    this.router.navigate(['/'])
  }


  addUserToDatabase() {
    $('*').modal('hide')  
    var form = new FormData();
    form.append('addEmail', this.authState.email);
    form.append('userName', this.authState.displayName);
    this.http.post("https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/add-user-castomer.php", form).subscribe();

  }







}
