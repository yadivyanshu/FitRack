import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });

    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to fetch all events', () => {
    const dummyEvents = [
      { id: 1, name: 'Event 1', date: '2023-10-01', venue: { name: 'Venue 1' } },
      { id: 2, name: 'Event 2', date: '2023-10-02', venue: { name: 'Venue 2' } }
    ];

    service.getAllEvents().subscribe(events => {
      expect(events.length).toBe(2);
      expect(events).toEqual(dummyEvents);
    });

    const req = httpMock.expectOne('http://localhost:8080/events');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEvents);
  });

  it('should make a PUT request to update an event', () => {
    const updatedEvent = { id: 1, name: 'Updated Event', date: '2023-10-02', venue: { name: 'Updated Venue' } };

    service.updateEvent(1, updatedEvent).subscribe(event => {
      expect(event).toEqual(updatedEvent);
    });

    const req = httpMock.expectOne('http://localhost:8080/events/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEvent);
    req.flush(updatedEvent);
  });

  it('should make a DELETE request to delete an event', () => {
    service.deleteEvent(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8080/events/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});