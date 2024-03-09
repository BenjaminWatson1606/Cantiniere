import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersAccountPage } from './users-account.page';

describe('UsersAccountPage', () => {
  let component: UsersAccountPage;
  let fixture: ComponentFixture<UsersAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsersAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
