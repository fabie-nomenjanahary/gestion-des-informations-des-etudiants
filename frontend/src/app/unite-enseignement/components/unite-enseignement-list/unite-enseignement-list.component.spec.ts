import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteEnseignementListComponent } from './unite-enseignement-list.component';

describe('UniteEnseignementListComponent', () => {
  let component: UniteEnseignementListComponent;
  let fixture: ComponentFixture<UniteEnseignementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteEnseignementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniteEnseignementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
