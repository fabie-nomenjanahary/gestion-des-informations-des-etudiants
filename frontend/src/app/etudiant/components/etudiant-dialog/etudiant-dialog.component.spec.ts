import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDialogComponent } from './etudiant-dialog.component';

describe('EtudiantDialogComponent', () => {
  let component: EtudiantDialogComponent;
  let fixture: ComponentFixture<EtudiantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
