import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeloRouteSinaiComponent } from './velo-route-sinai.component';

describe('VeloRouteSinaiComponent', () => {
  let component: VeloRouteSinaiComponent;
  let fixture: ComponentFixture<VeloRouteSinaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeloRouteSinaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeloRouteSinaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
