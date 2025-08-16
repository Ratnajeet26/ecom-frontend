import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  authService=inject(AuthService);
  router=inject(Router);

  registerForm = this.formbuilder.group({
    name: ['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.minLength(5)]]
  });
  register(){
    let value=this.registerForm.value;
this.authService.register(value.name!,value.email!,value.password!).subscribe(res=>{
  alert("User Registered")
  this.router.navigateByUrl("/login")
})    
  }
}
