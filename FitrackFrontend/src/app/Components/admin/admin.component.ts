import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  admin = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onCreateAdmin() {
    this.authService.createAdmin(this.admin).subscribe(
      response => {
        console.log('Admin created successfully', response);
        // Handle successful admin creation (e.g., navigate to admin dashboard or show a success message)
      },
      error => {
        console.error('Error creating admin', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
}