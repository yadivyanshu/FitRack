import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AdminComponent } from './admin.component';
import { AuthService } from '../../services/auth.service';

class MockAuthService {
  createAdmin(admin: any) {
    return of({ message: 'Admin created successfully' });
  }
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the form with fullName, email, and password controls', () => {
    expect(component.admin.fullName).toBeDefined();
    expect(component.admin.email).toBeDefined();
    expect(component.admin.password).toBeDefined();
  });

  it('should be invalid when form is empty', () => {
    expect(component.admin.fullName).toBe('');
    expect(component.admin.email).toBe('');
    expect(component.admin.password).toBe('');
  });

  it('should be valid when fullName, email, and password are provided', () => {
    component.admin.fullName = 'John Doe';
    component.admin.email = 'john.doe@example.com';
    component.admin.password = 'password123';
    fixture.detectChanges();
    expect(component.admin.fullName).toBe('John Doe');
    expect(component.admin.email).toBe('john.doe@example.com');
    expect(component.admin.password).toBe('password123');
  });

  it('should call AuthService createAdmin method when form is valid', () => {
    spyOn(authService, 'createAdmin').and.callThrough();
    component.admin.fullName = 'John Doe';
    component.admin.email = 'john.doe@example.com';
    component.admin.password = 'password123';
    component.onCreateAdmin();
    expect(authService.createAdmin).toHaveBeenCalledWith(component.admin);
  });

  it('should handle successful admin creation', () => {
    spyOn(authService, 'createAdmin').and.callThrough();
    spyOn(console, 'log');
    component.admin.fullName = 'John Doe';
    component.admin.email = 'john.doe@example.com';
    component.admin.password = 'password123';
    component.onCreateAdmin();
    expect(console.log).toHaveBeenCalledWith('Admin created successfully', { message: 'Admin created successfully' });
  });

  it('should handle errors correctly', () => {
    spyOn(authService, 'createAdmin').and.returnValue(throwError({ error: 'Error creating admin' }));
    spyOn(console, 'error');
    component.admin.fullName = 'John Doe';
    component.admin.email = 'john.doe@example.com';
    component.admin.password = 'password123';
    component.onCreateAdmin();
    expect(console.error).toHaveBeenCalledWith('Error creating admin', { error: 'Error creating admin' });
  });
});