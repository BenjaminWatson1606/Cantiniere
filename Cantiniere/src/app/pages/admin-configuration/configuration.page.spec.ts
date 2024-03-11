import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminConfigPage } from './configuration.page';

describe('AdminConfigPage', () => {
  let component: AdminConfigPage;
  let fixture: ComponentFixture<AdminConfigPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
