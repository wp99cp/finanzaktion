import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorenErfassenComponent } from './sponsoren-erfassen.component';

describe('SponsorenErfassenComponent', () => {
  let component: SponsorenErfassenComponent;
  let fixture: ComponentFixture<SponsorenErfassenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorenErfassenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorenErfassenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
