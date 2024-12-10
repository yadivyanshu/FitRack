import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  createForm: FormGroup;
  updateForm: FormGroup;
  teams: any[] = [];
  team: any;
  userId: any;
  events: any[] = [];

  constructor(private fb: FormBuilder, private teamService: TeamService) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      createdBy: this.fb.group({
        id: ['', Validators.required]
      }),
      event: this.fb.group({
        id: ['', Validators.required]
      })
    });

    this.updateForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTeams();
    this.getUserDetails();
    this.getEvents();
  }

  getAllTeams() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      event: this.fb.group({
        id: ['', Validators.required]
      }),
      createdBy: ['', Validators.required]  // Initialize with 0
    });

    this.teamService.getAllTeams().subscribe(response => {
      this.teams = response;
    });
  }

  getUserDetails() {
    this.teamService.getUserDetails().subscribe(response => {
      this.userId = response.id;
      this.createForm.get('createdBy.id')?.setValue(this.userId);
    });
  }

  getEvents() {
    this.teamService.getEvents().subscribe(response => {
      this.events = response;
    });
  }

  getTeamById(id: number) {
    this.teamService.getTeamById(id).subscribe(response => {
      this.team = response;
    });
  }

  createTeam() {
    if (this.createForm.valid) {
      const formValues = this.createForm.value;
      const team = {
        name: formValues.name,
        createdBy: { id: this.userId },
        event: { id: formValues.event.id }
      };
      this.teamService.createTeam(team).subscribe(response => {
        this.teams.push(response);
      }, error => {
        console.error('Error creating team:', error);
      });
    }
  }

  updateTeam() {
    if (this.updateForm.valid) {
      const { id, name } = this.updateForm.value;
      this.teamService.updateTeam(id, { name }).subscribe(response => {
        this.getAllTeams();
      }, error => {
        console.error('Error updating team:', error);
      });
    }
  }

  deleteTeam(id: number) {
    this.teamService.deleteTeam(id).subscribe(response => {
      this.getAllTeams();
    }, error => {
      console.error('Error deleting team:', error);
    });
  }

  joinTeam(teamId: number) {
    this.teamService.joinTeam(teamId).subscribe(response => {
      console.log(response);
    }, error => {
      console.error('Error joining team:', error);
    });
  }
}
