/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-05 01:25:07
 * @modify date 2020-10-05 01:25:07
 * @desc Perform Authentication operation
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post('/signUp', user);
  }
}
