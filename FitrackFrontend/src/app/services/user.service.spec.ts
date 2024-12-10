import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to fetch the authenticated user', () => {
    const dummyUser = { id: 1, fullName: 'John Doe', email: 'john.doe@example.com' };

    service.getAuthenticatedUser().subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/me`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should make a GET request to fetch all users', () => {
    const dummyUsers = [
      { id: 1, fullName: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, fullName: 'Jane Doe', email: 'jane.doe@example.com' }
    ];

    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should make a POST request to follow a user', () => {
    const userId = 1;
    const followerId = 2;
    const responseMessage = 'User followed successfully';

    service.followUser(userId, followerId).subscribe(response => {
      expect(response).toBe(responseMessage);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${followerId}/follow`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(userId);
    req.flush(responseMessage);
  });

  it('should make a POST request to unfollow a user', () => {
    const userId = 1;
    const followerId = 2;
    const responseMessage = 'User unfollowed successfully';

    service.unfollowUser(userId, followerId).subscribe(response => {
      expect(response).toBe(responseMessage);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${userId}/unfollow`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(followerId);
    req.flush(responseMessage);
  });

  it('should make a GET request to fetch the login count', () => {
    const userId = 1;
    const loginCount = '5';

    service.getLoginCount(userId).subscribe(count => {
      expect(count).toBe(loginCount);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/login-count/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(loginCount);
  });
});
