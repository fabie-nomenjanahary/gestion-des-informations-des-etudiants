import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UEmatiereListComponent } from './uematiere-list.component';

describe('UEmatiereListComponent', () => {
  let component: UEmatiereListComponent;
  let fixture: ComponentFixture<UEmatiereListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UEmatiereListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UEmatiereListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
