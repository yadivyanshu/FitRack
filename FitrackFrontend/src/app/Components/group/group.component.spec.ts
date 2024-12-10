import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { GroupComponent } from './group.component';
import { GroupService } from '../../services/group.service';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;
  let groupService: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    const groupServiceSpy = jasmine.createSpyObj('GroupService', [
      'createGroup',
      'joinGroup',
      'getGroup',
      'getGroupMembers',
      'createDiscussion',
      'getDiscussion',
      'getAllDiscussions'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ GroupComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: GroupService, useValue: groupServiceSpy }
      ]
    })
    .compileComponents();

    groupService = TestBed.inject(GroupService) as jasmine.SpyObj<GroupService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    groupService.getAllDiscussions.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty discussions', () => {
    expect(groupService.getAllDiscussions).toHaveBeenCalled();
    expect(component.discussions.length).toBe(0);
  });

  it('should create a group', () => {
    component.createForm.setValue({ name: 'New Group', userId: 1 });
    groupService.createGroup.and.returnValue(of({ id: 1, name: 'New Group' }));

    component.createGroup();
    expect(groupService.createGroup).toHaveBeenCalledWith('New Group', 1);
    expect(component.group).toEqual({ id: 1, name: 'New Group' });
  });

  it('should join a group', () => {
    component.joinForm.setValue({ groupId: 1 });
    groupService.joinGroup.and.returnValue(of({ id: 1, name: 'Joined Group' }));

    component.joinGroup();
    expect(groupService.joinGroup).toHaveBeenCalledWith(1);
    expect(component.group).toEqual({ id: 1, name: 'Joined Group' });
  });

  it('should get group details', () => {
    groupService.getGroup.and.returnValue(of({ id: 1, name: 'Group Details' }));

    component.getGroup(1);
    expect(groupService.getGroup).toHaveBeenCalledWith(1);
    expect(component.group).toEqual({ id: 1, name: 'Group Details' });
  });

  it('should get group members', () => {
    groupService.getGroupMembers.and.returnValue(of([{ email: 'member@example.com' }]));

    component.getGroupMembers(1);
    expect(groupService.getGroupMembers).toHaveBeenCalledWith(1);
    expect(component.members).toEqual([{ email: 'member@example.com' }]);
  });

  it('should create a discussion', () => {
    component.discussionForm.setValue({ message: 'New Discussion' });
    groupService.createDiscussion.and.returnValue(of({ id: 1, message: 'New Discussion' }));

    component.createDiscussion();
    expect(groupService.createDiscussion).toHaveBeenCalledWith('New Discussion', 1, 1);
    expect(component.discussions).toContain({ id: 1, message: 'New Discussion' });
  });

  it('should get discussion details', () => {
    groupService.getDiscussion.and.returnValue(of({ id: 1, message: 'Discussion Details' }));

    component.getDiscussion(1);
    expect(groupService.getDiscussion).toHaveBeenCalledWith(1);
    expect(component.discussion).toEqual({ id: 1, message: 'Discussion Details' });
  });

  it('should get all discussions', () => {
    groupService.getAllDiscussions.and.returnValue(of([{ id: 1, message: 'Discussion 1' }]));

    component.getAllDiscussions();
    expect(groupService.getAllDiscussions).toHaveBeenCalled();
    expect(component.discussions).toEqual([{ id: 1, message: 'Discussion 1' }]);
  });
});
