import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  createForm: FormGroup;
  joinForm: FormGroup;
  discussionForm: FormGroup;
  group: any;
  members: any[] = [];
  discussions: any[] = [];
  discussion: any;

  constructor(private fb: FormBuilder, private groupService: GroupService) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      userId: ['', Validators.required]
    });

    this.joinForm = this.fb.group({
      groupId: ['', Validators.required]
    });

    this.discussionForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllDiscussions();
  }

  createGroup() {
    if (this.createForm.valid) {
      const { name, userId } = this.createForm.value;
      this.groupService.createGroup(name, userId).subscribe(response => {
        this.group = response;
      });
    }
  }

  joinGroup() {
    if (this.joinForm.valid) {
      this.groupService.joinGroup(this.joinForm.value.groupId).subscribe(response => {
        this.group = response;
      });
    }
  }

  getGroup(groupId: number) {
    this.groupService.getGroup(groupId).subscribe(response => {
      this.group = response;
    });
  }

  getGroupMembers(groupId: number) {
    this.groupService.getGroupMembers(groupId).subscribe(response => {
      this.members = response;
    });
  }

  createDiscussion() {
    if (this.discussionForm.valid) {
      const { message } = this.discussionForm.value;
      const groupId = 1; // Set groupId to 1
      const userId = 1; // Set userId to 1
      this.groupService.createDiscussion(message, groupId, userId).subscribe(response => {
        this.discussions.push(response);
      });
    }
  }

  getDiscussion(discussionId: number) {
    this.groupService.getDiscussion(discussionId).subscribe(response => {
      this.discussion = response;
    });
  }

  getAllDiscussions() {
    this.groupService.getAllDiscussions().subscribe(response => {
      this.discussions = response;
    });
  }
}
