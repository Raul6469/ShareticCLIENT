import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmEditorComponent } from './qcm-editor.component';

describe('QcmEditorComponent', () => {
  let component: QcmEditorComponent;
  let fixture: ComponentFixture<QcmEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
