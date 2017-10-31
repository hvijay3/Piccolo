import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication-guard.service';

describe('AuthenticationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationGuard]
    });
  });

  it('should be created', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
    expect(service).toBeTruthy();
  }));
});
