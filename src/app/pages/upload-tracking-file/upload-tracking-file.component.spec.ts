import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTrackingFileComponent } from './upload-tracking-file.component';

describe('UploadTrackingFileComponent', () => {
  let component: UploadTrackingFileComponent;
  let fixture: ComponentFixture<UploadTrackingFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTrackingFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTrackingFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
