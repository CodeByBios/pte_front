import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSupprimerComponent } from './dialog-supprimer.component';

describe('DialogSupprimerComponent', () => {
  let component: DialogSupprimerComponent;
  let fixture: ComponentFixture<DialogSupprimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSupprimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
