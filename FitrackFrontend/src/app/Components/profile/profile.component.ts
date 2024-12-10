import { Component, NgModule } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent {
  user: any;
  admin = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService,private router:Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;
    });
  }

  isSuperAdmin(): boolean {
    // console.log(this.user && this.user.role.name === 'SUPER_ADMIN');
    
    return this.user && this.user.role.name === 'SUPER_ADMIN';
  }

  onCreateAdmin(): void {
    if (this.isSuperAdmin()) {
      
      this.authService.createAdmin(this.admin).subscribe(
        response => {
          console.log('Admin created successfully', response);
        },
        error => {
          console.error('Error creating admin', error);
        }
      );
    }
  }
}


