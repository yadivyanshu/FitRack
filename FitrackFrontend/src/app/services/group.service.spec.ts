// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';

// import { RegisterComponent } from './register.component';
// import { AuthService } from '../auth.service';

// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;
//   let authService: jasmine.SpyObj<AuthService>;

//   beforeEach(async () => {
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

//     await TestBed.configureTestingModule({
//       declarations: [ RegisterComponent ],
//       imports: [
//         FormsModule,
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
//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a form with fullName, email, and password fields', () => {
//     expect(component.user).toEqual({ fullName: '', email: '', password: '' });
//   });

//   it('should call authService.register on form submit if form is valid', () => {
//     component.user = { fullName: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
//     authService.register.and.returnValue(of({ message: 'User registered successfully' }));

//     component.onRegister();
//     expect(authService.register).toHaveBeenCalledWith(component.user);
//   });

//   it('should handle successful registration', () => {
//     const consoleLogSpy = spyOn(console, 'log');
//     component.user = { fullName: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
//     authService.register.and.returnValue(of({ message: 'User registered successfully' }));

//     component.onRegister();
//     expect(consoleLogSpy).toHaveBeenCalledWith('User registered successfully', { message: 'User registered successfully' });
//   });

//   it('should handle registration error', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     component.user = { fullName: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
//     authService.register.and.returnValue(throwError({ error: 'Error registering user' }));

//     component.onRegister();
//     expect(consoleErrorSpy).toHaveBeenCalledWith('Error registering user', { error: 'Error registering user' });
//   });
// });
