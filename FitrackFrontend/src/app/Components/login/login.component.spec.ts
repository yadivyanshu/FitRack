// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';

// import { LoginComponent } from '../login/login.component';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: jasmine.SpyObj<AuthService>;

//   beforeEach(async () => {
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logins']);

//     await TestBed.configureTestingModule({
//       declarations: [ LoginComponent ],
//       imports: [
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         RouterTestingModule
//       ],
//       providers: [
//         { provide: AuthService, useValue: authServiceSpy }
//       ]
//     })
//     .compileComponents();

//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a form with email and password fields', () => {
//     expect(component.loginForm.contains('email')).toBeTrue();
//     expect(component.loginForm.contains('password')).toBeTrue();
//   });

//   it('should make the email control required and validate email format', () => {
//     const emailControl = component.loginForm.get('email');
//     emailControl?.setValue('');
//     expect(emailControl?.hasError('required')).toBeTrue();

//     emailControl?.setValue('invalid-email');
//     expect(emailControl?.hasError('email')).toBeTrue();
//   });

//   it('should make the password control required and validate minimum length', () => {
//     const passwordControl = component.loginForm.get('password');
//     passwordControl?.setValue('');
//     expect(passwordControl?.hasError('required')).toBeTrue();

//     passwordControl?.setValue('123');
//     expect(passwordControl?.hasError('minlength')).toBeTrue();
//   });

//   it('should call authService.login on form submit if form is valid', () => {
//     component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
//     authService.login.and.returnValue(of({ token: 'fake-token' }));

//     component.onLogin();
//     expect(authService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
//   });

//   it('should navigate to dashboard on successful login', () => {
//     const router = TestBed.inject(Router);
//     spyOn(router, 'navigate');
//     component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
//     authService.login.and.returnValue(of({ token: 'fake-token' }));

//     component.onLogin();
//     expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
//   });

//   it('should handle login error', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
//     authService.login.and.returnValue(throwError({ error: 'Invalid credentials' }));

//     component.onLogin();
//     expect(consoleErrorSpy).toHaveBeenCalledWith('Error logging in user', { error: 'Invalid credentials' });
//   });
// });
