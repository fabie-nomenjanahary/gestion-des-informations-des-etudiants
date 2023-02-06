import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneDialogComponent } from './personne-dialog.component';

describe('PersonneDialogComponent', () => {
  let component: PersonneDialogComponent;
  let fixture: ComponentFixture<PersonneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonneDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
