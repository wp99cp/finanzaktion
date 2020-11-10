import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutenOverviewComponent } from './routen-overview.component';

describe('RoutenOverviewComponent', () => {
  let component: RoutenOverviewComponent;
  let fixture: ComponentFixture<RoutenOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutenOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
