import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
   users: any[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  followUser(userId: number) {
    const followerId = 2; 
    this.userService.followUser(userId, followerId).subscribe(response => {
      console.log(response);
    });
  }

  unfollowUser(userId: number) {
    const followerId = 1; 
    this.userService.unfollowUser(userId, followerId).subscribe(response => {
      console.log(response);
    });
  }
}