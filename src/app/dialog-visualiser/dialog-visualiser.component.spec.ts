import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisualiserComponent } from './dialog-visualiser.component';

describe('DialogVisualiserComponent', () => {
  let component: DialogVisualiserComponent;
  let fixture: ComponentFixture<DialogVisualiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVisualiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
