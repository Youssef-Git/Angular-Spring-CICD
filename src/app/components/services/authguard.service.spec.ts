import { TestBed } from '@angular/core/testing';

import { ToastrModule } from 'ngx-toastr';

import { AuthguardService } from './authguard.service';

describe('AuthguardService', () => {
  let service: AuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()]
    });
    service = TestBed.inject(AuthguardService, );
  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
