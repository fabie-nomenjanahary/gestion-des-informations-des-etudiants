import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereDialogComponent } from './matiere-dialog.component';

describe('MatiereDialogComponent', () => {
  let component: MatiereDialogComponent;
  let fixture: ComponentFixture<MatiereDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatiereDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatiereDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
