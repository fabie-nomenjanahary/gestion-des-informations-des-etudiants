import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauDialogComponent } from './niveau-dialog.component';

describe('NiveauDialogComponent', () => {
  let component: NiveauDialogComponent;
  let fixture: ComponentFixture<NiveauDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
