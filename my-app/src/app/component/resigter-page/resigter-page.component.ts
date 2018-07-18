import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resigter-page',
  templateUrl: './resigter-page.component.html',
  styleUrls: ['./resigter-page.component.css']
})
export class ResigterPageComponent implements OnInit {
  userForm: FormGroup;
  emailSignup: string;
  passwordSignup: string;
  repasswordSignup: string;
  name_lastname: string;

  @ViewChild("email") email: ElementRef;
  @ViewChild("pass") pass: ElementRef;
  @ViewChild("repass") repass: ElementRef;
  @ViewChild("emailerror") emailEr: ElementRef;
  @ViewChild("passwordSignuperror") passwordEr: ElementRef;
  @ViewChild("repasswordSignuperror") repasswordEr: ElementRef;
  @ViewChild("nameLastname") nameLastname: ElementRef;
  @ViewChild("modelerror") modelerror: ElementRef;
  @ViewChild("loginText", {read: ElementRef}) loginText: ElementRef;
  @ViewChild("loander", {read: ElementRef}) loander: ElementRef;
  @ViewChild("btnLogin", {read: ElementRef}) btnLogin: ElementRef;

  constructor(public fb: FormBuilder, public auth: AuthService) {
    auth.getCurrentLoggedIn();
  }

  ngOnInit() {
    this.buildForm();
    this.emailEr.nativeElement.style.visibility = "hidden";
    this.passwordEr.nativeElement.style.visibility = "hidden";
    this.repasswordEr.nativeElement.style.visibility = "hidden";
  }
  buildForm(): void {
    this.userForm = new FormGroup({
      emailSignup: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]),
      passwordSignup: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(25)
      ]),
      repasswordSignup: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(25)
      ])
    });
  }
  onEmailChange(value: string) {
    if (this.userForm.get('emailSignup').status == 'INVALID') {
      if (value.length < 6 || value.length > 25) {
        this.emailEr.nativeElement.textContent = "อีเมลควรมีความยาวอยู่ระหว่าง 6-25 ตัวอักษร"
      }
      else this.emailEr.nativeElement.textContent = "รูปแบบอีเมลไม่ถูกต้อง"
      this.email.nativeElement.style.borderColor = "red";
      this.emailEr.nativeElement.style.visibility = "visible";

    }
    else {
      this.email.nativeElement.style.borderColor = "";
      this.emailEr.nativeElement.style.visibility = "hidden";
    }
  }
  onPasswortdChange() {
    if (this.userForm.get('passwordSignup').status == 'INVALID') {
      this.passwordEr.nativeElement.style.visibility = "visible";
      this.pass.nativeElement.style.borderColor = "red";
    }
    else {
      this.pass.nativeElement.style.borderColor = "";
      this.passwordEr.nativeElement.style.visibility = "hidden";
    }

  }
  onRePasswortdChange(value: string) {
    if (value.length < 6 || value.length > 25) {
      this.repasswordEr.nativeElement.style.visibility = "visible";
      this.repasswordEr.nativeElement.textContent = "รหัสผ่านควรมีความยาวอยู่ระหว่าง 6-25 ตัวอักษร"
      this.repass.nativeElement.style.borderColor = "red";
    }
    else if (value != this.userForm.value.passwordSignup) {
      this.repass.nativeElement.style.borderColor = "red";
      this.repasswordEr.nativeElement.style.visibility = "visible";
      this.repasswordEr.nativeElement.textContent = "รหัสผ่านไม่ตรงกัน"
    }
    else {
      this.repass.nativeElement.style.borderColor = "";
      this.repasswordEr.nativeElement.style.visibility = "hidden";
    }

  }
  onNameLastChange() {
    this.nameLastname.nativeElement.style.borderColor = "";
  }
  error_click() {
    this.modelerror.nativeElement.style.display = "none"
  }
  signup(): void {

    if (this.validator.length <= 0) {
      this.nameLastname.nativeElement.style.borderColor = "red";
    }
    else if (this.userForm.get('emailSignup').status == 'VALID' &&
      this.userForm.get('passwordSignup').status == 'VALID' &&
      this.userForm.get('repasswordSignup').status == 'VALID' &&
      this.userForm.value.passwordSignup == this.userForm.value.repasswordSignup &&
      this.validator.length > 0) {
        this.loginText.nativeElement.style.display = "none";
        this.loander.nativeElement.style.display = "block";
        this.btnLogin.nativeElement.disabled = true;
      this.auth.emailSignUp(this.userForm.value.emailSignup, this.userForm.value.passwordSignup, this.validator)
        .then((i) => {
          if (i)   
            this.btnLogin.nativeElement.disabled = false;
            this.loginText.nativeElement.style.display = "block";
            this.loander.nativeElement.style.display = "none";
            this.modelerror.nativeElement.style.display = "block"
        })
    }
  }
  googleLogin(): void {
    this.auth.googleLogin();
  }
  facebookLogin(): void {
    this.auth.facebookLogin();
  }

  get validator(): string {
    const name: string = this.nameLastname.nativeElement.value;
    const rs = name.split(' ');
    var namecontinue = "";
    for (var i = 0; i < rs.length; i++) {
      if (rs[i] != "") {
        namecontinue = namecontinue + rs[i] + " ";
      }
    }
    return namecontinue;
  }

}
