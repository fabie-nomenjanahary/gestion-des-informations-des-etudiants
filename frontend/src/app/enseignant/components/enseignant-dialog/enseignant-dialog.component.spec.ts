import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantDialogComponent } from './enseignant-dialog.component';

describe('EnseignantDialogComponent', () => {
  let component: EnseignantDialogComponent;
  let fixture: ComponentFixture<EnseignantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
