import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkServicesComponent } from './work-services.component';

describe('WorkServicesComponent', () => {
  let component: WorkServicesComponent;
  let fixture: ComponentFixture<WorkServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
