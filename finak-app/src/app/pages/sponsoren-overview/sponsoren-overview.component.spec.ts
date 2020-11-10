import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorenOverviewComponent } from './sponsoren-overview.component';

describe('SponsorenOverviewComponent', () => {
  let component: SponsorenOverviewComponent;
  let fixture: ComponentFixture<SponsorenOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorenOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
