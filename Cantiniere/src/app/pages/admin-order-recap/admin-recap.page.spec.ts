import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRecapPage } from './admin-recap.page';

describe('AdminRecapPage', () => {
  let component: AdminRecapPage;
  let fixture: ComponentFixture<AdminRecapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
