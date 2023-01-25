import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeScolaireListComponent } from './annee-scolaire-list.component';

describe('AnneeScolaireListComponent', () => {
  let component: AnneeScolaireListComponent;
  let fixture: ComponentFixture<AnneeScolaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnneeScolaireListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnneeScolaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
