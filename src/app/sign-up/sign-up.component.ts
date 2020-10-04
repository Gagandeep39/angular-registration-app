import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(
        { value: 'Jon Doe', disabled: true },
        Validators.required
      ),
      email: new FormControl(
        { value: 'john@requantive.com', disabled: true },
        Validators.required
      ),
      phone: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.signupForm.valid) this.registerUser(this.signupForm.value);
  }

  registerUser(user: User) {
    this.authService.register(user).subscribe(
      () => this.router.navigate(['/signedUp']),
      () => this.router.navigate(['/signedUp'])
    );
  }
}
