import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdminPage } from './admin.page';

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPage],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AdminPage);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
