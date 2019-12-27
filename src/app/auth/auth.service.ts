import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(res => {
        console.log(res);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http
      .post<{ token: string }>("http://localhost:3000/api/user/login", authData)
      .subscribe(res => {
        this.token = res.token;
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/"]);
        }
      });
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(["/"]);
  }
}
