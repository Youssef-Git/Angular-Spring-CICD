import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ToastrModule } from 'ngx-toastr';


describe('AuthService', () => {
  let service: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ToastrModule.forRoot()]
    });
    
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
