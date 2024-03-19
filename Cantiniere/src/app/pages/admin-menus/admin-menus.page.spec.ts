import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMenusPage } from './admin-menus.page';

describe('AdminMenusPage', () => {
  let component: AdminMenusPage;
  let fixture: ComponentFixture<AdminMenusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminMenusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
