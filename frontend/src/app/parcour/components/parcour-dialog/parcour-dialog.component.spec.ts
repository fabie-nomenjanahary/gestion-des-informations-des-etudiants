import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcourDialogComponent } from './parcour-dialog.component';

describe('ParcourDialogComponent', () => {
  let component: ParcourDialogComponent;
  let fixture: ComponentFixture<ParcourDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcourDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcourDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
