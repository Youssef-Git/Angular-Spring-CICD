import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { useRoleGuard } from './use-role.guard';

describe('useRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => useRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
