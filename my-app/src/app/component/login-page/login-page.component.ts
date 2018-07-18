import { Component, OnInit, Input,ViewChild ,ElementRef, Output , EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Http } from '@angular/http';
import { map } from 'rxjs/operators';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  loginForm: FormGroup;
  @ViewChild("modelerror", {read: ElementRef}) modelerror: ElementRef;
  @Input() title :string=null;  
  @ViewChild("rowlogin", {read: ElementRef}) rowlogin: ElementRef;
  @ViewChild("loginText", {read: ElementRef}) loginText: ElementRef;
  @ViewChild("loander", {read: ElementRef}) loander: ElementRef;
  @ViewChild("btnLogin", {read: ElementRef}) btnLogin: ElementRef;

  
  
  constructor(public fb: FormBuilder, public auth: AuthService, public router: Router , public http : Http) {
    auth.getCurrentLoggedIn();
  }

  ngOnInit() {
    $('span#email').css("visibility", "hidden");
    $('span#password').css("visibility", "hidden");

    if(this.title == null){
        this.rowlogin.nativeElement.style.marginTop ="86px"
    }

    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]),
      password: new FormControl('',
       [Validators.minLength(6),
        Validators.maxLength(25)
        ])
    });
  }
  onEmailChange(searchValue: string) {
    if (this.loginForm.get('email').status == 'INVALID') {
      $('input#email').css("border-color", "red");      
      if (searchValue.length < 6 || searchValue.length > 25) {
        $('span#email').text('อีเมลควรมีความยาวอยู่ระหว่าง 6-25 ตัวอักษร')
      } else {
        $('span#email').text('รูปแบบอีเมลไม่ถูกต้อง')
      }
      $('span#email').css("visibility", "visible");
    }
    else {
      $('span#email').css("visibility", "hidden");
      $('input#email').css("border-color", "");
    }
  }
  onPassChange(searchValue: string) {
    if (this.loginForm.get('password').status == 'INVALID') {  
        $('input#password').css("border-color", "red"); 
        $('span#password').css("visibility", "visible");     
    }
    else {
      $('span#password').css("visibility", "hidden");
      $('input#password').css("border-color", "");
    }
  }
  error_click(){
    this.modelerror.nativeElement.style.display='none';
  }
  login(): void {
    if (this.loginForm.get('email').status == 'VALID' && this.loginForm.get('password').status == 'VALID') {
      this.loginText.nativeElement.style.display = "none";
      this.btnLogin.nativeElement.disabled = true;
      this.loander.nativeElement.style.display = "block";
      this.auth.emailLogin(this.loginForm.value.email, this.loginForm.value.password)
        .then((i) => {
          if(i)
          this.loginText.nativeElement.style.display = "block";
          this.loander.nativeElement.style.display = "none";
          this.btnLogin.nativeElement.disabled = false;
          this.modelerror.nativeElement.style.display='block';          
        })
    }
  }
  googleLogin(): void {
    this.auth.googleLogin(  );

  }
  facebookLogin(): void {
    this.auth.facebookLogin(  );
  }

}
