// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';

// import { ProfileComponent } from './profile.component';
// import { UserService } from '../user.service';
// import { AuthService } from '../auth.service';

// describe('ProfileComponent', () => {
//   let component: ProfileComponent;
//   let fixture: ComponentFixture<ProfileComponent>;
//   let userService: jasmine.SpyObj<UserService>;
//   let authService: jasmine.SpyObj<AuthService>;

//   beforeEach(async () => {
//     const userServiceSpy = jasmine.createSpyObj('UserService', ['getAuthenticatedUser']);
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['createAdmin']);

//     await TestBed.configureTestingModule({
//       declarations: [ ProfileComponent ],
//       imports: [
//         HttpClientTestingModule,
//         RouterTestingModule
//       ],
//       providers: [
//         { provide: UserService, useValue: userServiceSpy },
//         { provide: AuthService, useValue: authServiceSpy }
//       ]
//     })
//     .compileComponents();

//     userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfileComponent);
//     component = fixture.componentInstance;
//     userService.getAuthenticatedUser.and.returnValue(of({
//       fullName: 'John Doe',
//       email: 'john.doe@example.com',
//       loginCount: 5,
//       role: { name: 'USER' }
//     }));
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch authenticated user on init', () => {
//     expect(userService.getAuthenticatedUser).toHaveBeenCalled();
//     expect(component.user).toEqual({
//       fullName: 'John Doe',
//       email: 'john.doe@example.com',
//       loginCount: 5,
//       role: { name: 'USER' }
//     });
//   });

//   it('should return true if user is SUPER_ADMIN', () => {
//     component.user = {
//       fullName: 'Jane Doe',
//       email: 'jane.doe@example.com',
//       loginCount: 10,
//       role: { name: 'SUPER_ADMIN' }
//     };
//     expect(component.isSuperAdmin()).toBeTrue();
//   });

//   it('should return false if user is not SUPER_ADMIN', () => {
//     component.user = {
//       fullName: 'John Doe',
//       email: 'john.doe@example.com',
//       loginCount: 5,
//       role: { name: 'USER' }
//     };
//     expect(component.isSuperAdmin()).toBeFalse();
//   });

//   it('should call createAdmin if user is SUPER_ADMIN', () => {
//     component.user = {
//       fullName: 'Jane Doe',
//       email: 'jane.doe@example.com',
//       loginCount: 10,
//       role: { name: 'SUPER_ADMIN' }
//     };
//     component.admin = {
//       fullName: 'Admin User',
//       email: 'admin@example.com',
//       password: 'password123'
//     };
//     authService.createAdmin.and.returnValue(of({ message: 'Admin created successfully' }));

//     component.onCreateAdmin();
//     expect(authService.createAdmin).toHaveBeenCalledWith(component.admin);
//   });

//   it('should handle error when creating admin', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     component.user = {
//       fullName: 'Jane Doe',
//       email: 'jane.doe@example.com',
//       loginCount: 10,
//       role: { name: 'SUPER_ADMIN' }
//     };
//     component.admin = {
//       fullName: 'Admin User',
//       email: 'admin@example.com',
//       password: 'password123'
//     };
//     authService.createAdmin.and.returnValue(throwError({ error: 'Error creating admin' }));

//     component.onCreateAdmin();
//     expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating admin', { error: 'Error creating admin' });
//   });
// });
