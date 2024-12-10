import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: any[] = [];
  isEditModalOpen = false;
  isCreateModalOpen = false;
  isBookEventModalOpen = false; // Add this property
  editForm!: FormGroup;
  createForm!: FormGroup;
  bookEventForm!: FormGroup; // Add this property
  currentEventId!: number;
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';
  roles: string[] = [];

  constructor(private eventService: EventService, private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
    this.loadEvents();
    this.roles = this.authService.getRolesFromToken();

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required]
    });
    this.bookEventForm = this.fb.group({
      eventName: [{ value: '', disabled: true }, Validators.required],
      user: ['', [Validators.required, Validators.minLength(3)]]
    });
    

    this.createForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required]
    });

    this.bookEventForm = this.fb.group({ 
      eventName: [{ value: '', disabled: true }, Validators.required],
      user: ['', Validators.required]
    });
  }
  

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

  openEditModal(event: any): void {
    this.isEditModalOpen = true;
    this.currentEventId = event.id;
    this.editForm.patchValue({
      name: event.name,
      date: event.date,
      venue: event.venue.name
    });
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  onEdit(): void {
    if (this.editForm.valid) {
      const updatedEvent = {
        ...this.editForm.value,
        id: this.currentEventId
      };
      this.eventService.updateEvent(this.currentEventId, updatedEvent).subscribe(() => {
        this.loadEvents();
        this.closeEditModal();
      });
    }
  }

  openCreateModal(): void {
    if (this.hasRole('ADMIN') || this.hasRole('SUPER_ADMIN')) {
      this.isCreateModalOpen = true;
    } else {
      alert('You do not have permission to create events.');
    }
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  onCreate(): void {
    if (this.createForm.valid) {
      console.log(this.createForm.value);
      this.eventService.createEvent(this.createForm.value).subscribe(newEvent => {
        this.events.push(newEvent); // Add the new event to the events array
        this.closeCreateModal();
      });
    }
  }

  deleteEvent(id: number): void {
    if (this.hasRole('ADMIN') || this.hasRole('SUPER_ADMIN')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents();
      });
    } else {
      alert('You do not have permission to delete events.');
    }
  }

  searchEvents(): void {
    this.eventService.searchEvents(this.searchTerm).subscribe(events => {
      this.events = events;
    });
  }

  filterEvents(): void {
    this.eventService.filterEvents(this.startDate, this.endDate).subscribe(events => {
      this.events = events;
    });
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  shareEvent(event: any): void {
    const shareData = {
      title: event.name,
      text: `Check out this event: ${event.name} at ${event.venue.name} on ${event.date}`,
      url: window.location.href
    };
    navigator.share(shareData).then(() => {
      console.log('Event shared successfully');
    }).catch(console.error);
  }

  openBookEventModal(event: any): void {
    this.isBookEventModalOpen = true; // Set the modal open flag
    this.bookEventForm.patchValue({
      eventName: event.name
    });
    this.currentEventId = event.id;
  }

  closeBookEventModal(): void { // Add this method
    this.isBookEventModalOpen = false;
  }
  
  gopayment(): void{

    this.router.navigate(['/payment-details']);
  }

  onBookEvent(): void { // Add this method
    if (this.bookEventForm.valid) {
      const bookingData = {
        eventId: this.currentEventId,
        user: this.bookEventForm.value.user
      };
      this.eventService.bookEvent(bookingData).subscribe(() => {
        this.closeBookEventModal();
        alert('Booking successful');
      });
    }
  }
}
