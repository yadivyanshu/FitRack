import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { PaymentDetailsComponent } from './payment-details.component';
import { Router } from '@angular/router';

describe('PaymentDetailsComponent', () => {
  let component: PaymentDetailsComponent;
  let fixture: ComponentFixture<PaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDetailsComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with cardholderName, cardNumber, expirationDate, cvv, and billingAddress fields', () => {
    expect(component.paymentForm.contains('cardholderName')).toBeTrue();
    expect(component.paymentForm.contains('cardNumber')).toBeTrue();
    expect(component.paymentForm.contains('expirationDate')).toBeTrue();
    expect(component.paymentForm.contains('cvv')).toBeTrue();
    expect(component.paymentForm.contains('billingAddress')).toBeTrue();
  });

  it('should make the cardholderName control required', () => {
    const control = component.paymentForm.get('cardholderName');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('should make the cardNumber control required', () => {
    const control = component.paymentForm.get('cardNumber');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('should make the expirationDate control required', () => {
    const control = component.paymentForm.get('expirationDate');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('should make the cvv control required', () => {
    const control = component.paymentForm.get('cvv');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('should make the billingAddress control required', () => {
    const control = component.paymentForm.get('billingAddress');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('should navigate to success page on valid form submission', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.paymentForm.setValue({
      cardholderName: 'John Doe',
      cardNumber: '1234 5678 9012 3456',
      expirationDate: '12/23',
      cvv: '123',
      billingAddress: '123 Main St'
    });

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/success']);
  });

  it('should navigate to home page on cancel', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
