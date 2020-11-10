import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoSettingsComponent } from './konto-settings.component';

describe('KontoSettingsComponent', () => {
  let component: KontoSettingsComponent;
  let fixture: ComponentFixture<KontoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontoSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
