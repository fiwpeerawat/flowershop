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
  @ViewChild("modelerror", { read: ElementRef }) modelerror: ElementRef;
  @ViewChild("modelcorrect", { read: ElementRef }) modelcorrect: ElementRef;
  @ViewChild("loander", { read: ElementRef }) loander: ElementRef;
  @ViewChild("loginText", { read: ElementRef }) loginText: ElementRef;

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

    this.loginText.nativeElement.style.display = 'none';
    this.loander.nativeElement.style.display = 'block';

    this.auth.resetPassword(this.loginForm.value.email).then(
      (i) => {
        if (i == 'email sent') {
          this.modelcorrect.nativeElement.style.display = 'block';
          this.loginText.nativeElement.style.display = 'block';
          this.loander.nativeElement.style.display = 'none';
        }
        else {
          this.modelerror.nativeElement.style.display = 'block';
          this.loginText.nativeElement.style.display = 'block';
          this.loander.nativeElement.style.display = 'none';
        }


      }
    )

  }


  error_click() {
    this.modelerror.nativeElement.style.display = 'none';
    this.modelcorrect.nativeElement.style.display = 'none';
  }

}
