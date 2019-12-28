import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { AngularMaterialModule } from "src/angular-material.module";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, AngularMaterialModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
