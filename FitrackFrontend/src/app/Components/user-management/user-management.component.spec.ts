// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of, throwError } from 'rxjs';

// import { UserManagementComponent } from './user-management.component';
// import { UserService } from '../user.service';

// describe('UserManagementComponent', () => {
//   let component: UserManagementComponent;
//   let fixture: ComponentFixture<UserManagementComponent>;
//   let userService: jasmine.SpyObj<UserService>;

//   beforeEach(async () => {
//     const userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers', 'followUser', 'unfollowUser']);

//     await TestBed.configureTestingModule({
//       declarations: [ UserManagementComponent ],
//       imports: [ HttpClientTestingModule ],
//       providers: [
//         { provide: UserService, useValue: userServiceSpy }
//       ]
//     })
//     .compileComponents();

//     userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UserManagementComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch all users on init', () => {
//     const dummyUsers = [
//       { id: 1, fullName: 'John Doe', email: 'john.doe@example.com' },
//       { id: 2, fullName: 'Jane Smith', email: 'jane.smith@example.com' }
//     ];

//     userService.getAllUsers.and.returnValue(of(dummyUsers));

//     component.ngOnInit();

//     expect(userService.getAllUsers).toHaveBeenCalled();
//     expect(component.users).toEqual(dummyUsers);
//   });

  
//   it('should handle error when following a user', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     userService.followUser.and.returnValue(throwError({ error: 'Error following user' }));

//     component.followUser(1);

//     expect(consoleErrorSpy).toHaveBeenCalledWith({ error: 'Error following user' });
//   });


//   it('should handle error when unfollowing a user', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     userService.unfollowUser.and.returnValue(throwError({ error: 'Error unfollowing user' }));

//     component.unfollowUser(1);

//     expect(consoleErrorSpy).toHaveBeenCalledWith({ error: 'Error unfollowing user' });
//   });
// });
