import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeScolaireDialogComponent } from './annee-scolaire-dialog.component';

describe('AnneeScolaireDialogComponent', () => {
  let component: AnneeScolaireDialogComponent;
  let fixture: ComponentFixture<AnneeScolaireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnneeScolaireDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnneeScolaireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
