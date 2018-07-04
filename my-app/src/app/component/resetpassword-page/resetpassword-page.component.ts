import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword-page',
  templateUrl: './resetpassword-page.component.html',
  styleUrls: ['./resetpassword-page.component.css']
})
export class ResetpasswordPageComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.buildForm()
  }
  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])     
    });
  }

  resetPass() {
    console.log( this.loginForm.value.email  )
    this.auth.resetPassword(this.loginForm.value.email)
  }

}
