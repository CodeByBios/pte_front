import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPteComponent } from './menu-pte.component';

describe('MenuPteComponent', () => {
  let component: MenuPteComponent;
  let fixture: ComponentFixture<MenuPteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
