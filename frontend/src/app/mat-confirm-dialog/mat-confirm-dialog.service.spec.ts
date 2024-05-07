import { TestBed } from '@angular/core/testing';

import { MatConfirmDialogService } from './mat-confirm-dialog.service';

describe('MatConfirmDialogService', () => {
  let service: MatConfirmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatConfirmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
