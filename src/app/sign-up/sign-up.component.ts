/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-05 01:57:25
 * @modify date 2020-10-05 01:57:25
 * @desc Sign Up page
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  submitted = false;
  signUpSubscription: Subscription

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Initialize Sign Up form
   */
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
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]{10}'),
      ]),
    });
  }

  /**
   * Sets Submit to true to enable validation UI response
   * On Valid inpiut, registron method is called
   */
  submitForm() {
    this.submitted = true;
    if (this.signupForm.valid) this.registerUser(this.signupForm.value);
  }

  /**
   * Sends a request to server to register the user
   * Signup form is TypeCaseted to User model
   * After sending data to server, user is redirected to success page
   * @param user
   */
  registerUser(user: User) {
    this.signUpSubscription = this.authService.register(user).subscribe(
      () => this.router.navigate(['/signedUp']),
      () => this.router.navigate(['/signedUp']),
    );
  }

  ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
  }
}
