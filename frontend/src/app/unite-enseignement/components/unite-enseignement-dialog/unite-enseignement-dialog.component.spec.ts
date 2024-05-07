import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteEnseignementDialogComponent } from './unite-enseignement-dialog.component';

describe('UniteEnseignementDialogComponent', () => {
  let component: UniteEnseignementDialogComponent;
  let fixture: ComponentFixture<UniteEnseignementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteEnseignementDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniteEnseignementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
