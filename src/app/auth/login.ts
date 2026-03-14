import { Component, inject, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule],
})
export default class Login implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @ViewChild('myPopover') input!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then((bootstrap) => {

        const pop = new bootstrap.Popover(this.input.nativeElement, {
          trigger: 'focus',
          placement: 'top',
          html: true,
          title: 'Intente ingresando como:',
          content: `
            <div>
              <div><b>admin</b>: admin@miempresa.com</div>
              <div><b>cashier</b>: cashier@miempresa.com</div>
              <div><b>customer</b>: customer@miempresa.com</div>
              <div><b>guest</b>: visitor@miempresa.com</div>
              <hr style="margin:6px 0">
              <div><b>Password:</b> any</div>
            </div>
          `
        });

        pop.show();

      });
    }
  }

  _formBuilder = inject(FormBuilder);
  _authService = inject(AuthService);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', Validators.required),
    password: this._formBuilder.control('', Validators.required),
  });

  login() {
    if (!this.form.valid) return;
    const email = this.form.value!.email!;
    this._authService.login(email).subscribe();
  }
}
