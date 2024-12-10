// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';

// import { DashboardComponent } from './dashboard.component';
// import { EventService } from '../event.service';
// import { AuthService } from '../auth.service';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let eventService: jasmine.SpyObj<EventService>;
//   let authService: jasmine.SpyObj<AuthService>;

//   beforeEach(async () => {
//     const eventServiceSpy = jasmine.createSpyObj('EventService', ['getAllEvents', 'updateEvent', 'createEvent', 'deleteEvent', 'searchEvents', 'filterEvents', 'bookEvent']);
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['getRolesFromToken']);

//     await TestBed.configureTestingModule({
//       declarations: [ DashboardComponent ],
//       imports: [
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         RouterTestingModule
//       ],
//       providers: [
//         { provide: EventService, useValue: eventServiceSpy },
//         { provide: AuthService, useValue: authServiceSpy }
//       ]
//     })
//     .compileComponents();

//     eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     eventService.getAllEvents.and.returnValue(of([]));
//     authService.getRolesFromToken.and.returnValue(['USER']);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load events on init', () => {
//     expect(eventService.getAllEvents).toHaveBeenCalled();
//   });

//   it('should open and close the create modal', () => {
//     component.openCreateModal();
//     expect(component.isCreateModalOpen).toBeTrue();

//     component.closeCreateModal();
//     expect(component.isCreateModalOpen).toBeFalse();
//   });

//   it('should open and close the edit modal', () => {
//     const event = { id: 1, name: 'Test Event', date: '2023-01-01', venue: { name: 'Test Venue' } };
//     component.openEditModal(event);
//     expect(component.isEditModalOpen).toBeTrue();
//     expect(component.editForm.value.name).toBe(event.name);

//     component.closeEditModal();
//     expect(component.isEditModalOpen).toBeFalse();
//   });

//   it('should open and close the book event modal', () => {
//     const event = { id: 1, name: 'Test Event', date: '2023-01-01', venue: { name: 'Test Venue' } };
//     component.openBookEventModal(event);
//     expect(component.isBookEventModalOpen).toBeTrue();
//     expect(component.bookEventForm.value.eventName).toBe(event.name);

//     component.closeBookEventModal();
//     expect(component.isBookEventModalOpen).toBeFalse();
//   });

//   it('should create an event', () => {
//     component.createForm.setValue({ name: 'New Event', date: '2023-01-01', venue: 'New Venue' });
//     eventService.createEvent.and.returnValue(of({ id: 1, name: 'New Event', date: '2023-01-01', venue: { name: 'New Venue' } }));

//     component.onCreate();
//     expect(eventService.createEvent).toHaveBeenCalled();
//   });

//   it('should edit an event', () => {
//     component.currentEventId = 1;
//     component.editForm.setValue({ name: 'Updated Event', date: '2023-01-01', venue: 'Updated Venue' });
//     eventService.updateEvent.and.returnValue(of({}));

//     component.onEdit();
//     expect(eventService.updateEvent).toHaveBeenCalled();
//   });

//   it('should delete an event', () => {
//     component.roles = ['ADMIN'];
//     eventService.deleteEvent.and.returnValue(of({}));

//     component.deleteEvent(1);
//     expect(eventService.deleteEvent).toHaveBeenCalled();
//   });

//   it('should search events', () => {
//     eventService.searchEvents.and.returnValue(of([]));

//     component.searchTerm = 'Test';
//     component.searchEvents();
//     expect(eventService.searchEvents).toHaveBeenCalledWith('Test');
//   });

//   it('should filter events', () => {
//     eventService.filterEvents.and.returnValue(of([]));

//     component.startDate = '2023-01-01';
//     component.endDate = '2023-12-31';
//     component.filterEvents();
//     expect(eventService.filterEvents).toHaveBeenCalledWith('2023-01-01', '2023-12-31');
//   });
// });
