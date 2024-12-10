// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of, throwError } from 'rxjs';

// import { TeamComponent } from './team.component';
// import { TeamService } from '../team.service';

// describe('TeamComponent', () => {
//   let component: TeamComponent;
//   let fixture: ComponentFixture<TeamComponent>;
//   let teamService: jasmine.SpyObj<TeamService>;

//   beforeEach(async () => {
//     const teamServiceSpy = jasmine.createSpyObj('TeamService', [
//       'getAllTeams',
//       'getUserDetails',
//       'getEvents',
//       'getTeamById',
//       'createTeam',
//       'updateTeam',
//       'deleteTeam',
//       'joinTeam'
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [ TeamComponent ],
//       imports: [
//         ReactiveFormsModule,
//         HttpClientTestingModule
//       ],
//       providers: [
//         { provide: TeamService, useValue: teamServiceSpy }
//       ]
//     })
//     .compileComponents();

//     teamService = TestBed.inject(TeamService) as jasmine.SpyObj<TeamService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TeamComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize forms and fetch initial data on init', () => {
//     const dummyTeams = [{ id: 1, name: 'Team A' }];
//     const dummyUser = { id: 1 };
//     const dummyEvents = [{ id: 1, name: 'Event A' }];

//     teamService.getAllTeams.and.returnValue(of(dummyTeams));
//     teamService.getUserDetails.and.returnValue(of(dummyUser));
//     teamService.getEvents.and.returnValue(of(dummyEvents));

//     component.ngOnInit();

//     expect(teamService.getAllTeams).toHaveBeenCalled();
//     expect(teamService.getUserDetails).toHaveBeenCalled();
//     expect(teamService.getEvents).toHaveBeenCalled();
//     expect(component.teams).toEqual(dummyTeams);
//     expect(component.userId).toEqual(dummyUser.id);
//     expect(component.events).toEqual(dummyEvents);
//   });

//   it('should create a team', () => {
//     const dummyTeam = { id: 1, name: 'Team A' };
//     component.createForm.setValue({
//       name: 'Team A',
//       createdBy: { id: 1 },
//       event: { id: 1 }
//     });

//     teamService.createTeam.and.returnValue(of(dummyTeam));

//     component.createTeam();

//     expect(teamService.createTeam).toHaveBeenCalledWith({
//       name: 'Team A',
//       createdBy: { id: 1 },
//       event: { id: 1 }
//     });
//     expect(component.teams).toContain(dummyTeam);
//   });

//   it('should handle error when creating a team', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     component.createForm.setValue({
//       name: 'Team A',
//       createdBy: { id: 1 },
//       event: { id: 1 }
//     });

//     teamService.createTeam.and.returnValue(throwError({ error: 'Error creating team' }));

//     component.createTeam();

//     expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating team:', { error: 'Error creating team' });
//   });

//   it('should update a team', () => {
//     component.updateForm.setValue({
//       id: 1,
//       name: 'Updated Team A'
//     });

//     teamService.updateTeam.and.returnValue(of({}));

//     component.updateTeam();

//     expect(teamService.updateTeam).toHaveBeenCalledWith(1, { name: 'Updated Team A' });
//   });

//   it('should handle error when updating a team', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     component.updateForm.setValue({
//       id: 1,
//       name: 'Updated Team A'
//     });

//     teamService.updateTeam.and.returnValue(throwError({ error: 'Error updating team' }));

//     component.updateTeam();

//     expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating team:', { error: 'Error updating team' });
//   });

//   it('should delete a team', () => {
//     teamService.deleteTeam.and.returnValue(of({}));

//     component.deleteTeam(1);

//     expect(teamService.deleteTeam).toHaveBeenCalledWith(1);
//   });

//   it('should handle error when deleting a team', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     teamService.deleteTeam.and.returnValue(throwError({ error: 'Error deleting team' }));

//     component.deleteTeam(1);

//     expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting team:', { error: 'Error deleting team' });
//   });

//   it('should join a team', () => {
//     teamService.joinTeam.and.returnValue(of({ message: 'Joined team successfully' }));

//     component.joinTeam(1);

//     expect(teamService.joinTeam).toHaveBeenCalledWith(1);
//   });

//   it('should handle error when joining a team', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     teamService.joinTeam.and.returnValue(throwError({ error: 'Error joining team' }));

//     component.joinTeam(1);

//     expect(consoleErrorSpy).toHaveBeenCalledWith('Error joining team:', { error: 'Error joining team' });
//   });

//   it('should get team details by id', () => {
//     const dummyTeam = { id: 1, name: 'Team A' };

//     teamService.getTeamById.and.returnValue(of(dummyTeam));

//     component.getTeamById(1);

//     expect(teamService.getTeamById).toHaveBeenCalledWith(1);
//     expect(component.team).toEqual(dummyTeam);
//   });
// });
