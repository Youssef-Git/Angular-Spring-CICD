import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'getItem');
    spyOn(toastrService, 'success');
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle isSignUp when switchToLogin is called', () => {
    service['isSignUp'] = false;
    service.switchToLogin();
    expect(service['isSignUp']).toBeTrue();
    service.switchToLogin();
    expect(service['isSignUp']).toBeFalse();
  });

  it('should toggle isSignUp when switchToSignIn is called', () => {
    service['isSignUp'] = true;
    service.switchToSignIn();
    expect(service['isSignUp']).toBeFalse();
    service.switchToSignIn();
    expect(service['isSignUp']).toBeTrue();
  });

  it('should set token in localStorage when logIn is called', () => {
    service.logIn();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'loggedIn');
  });

  it('should remove token and navigate to login when logOut is called', () => {
    service.logOut();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(toastrService.success).toHaveBeenCalledWith('Vous êtes déconnecté');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  describe('getNom', () => {
    it('should get nom from localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue('Test User');
      const result = service.getNom();
      expect(localStorage.getItem).toHaveBeenCalledWith('nom');
      expect(result).toBe('Test User');
    });

    it('should return null if nom is not in localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      const result = service.getNom();
      expect(localStorage.getItem).toHaveBeenCalledWith('nom');
      expect(result).toBeNull();
    });
  });

  describe('getRole', () => {
    it('should get role from localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue('Administrateur');
      const result = service.getRole();
      expect(localStorage.getItem).toHaveBeenCalledWith('role');
      expect(result).toBe('Administrateur');
    });

    it('should return null if role is not in localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      const result = service.getRole();
      expect(localStorage.getItem).toHaveBeenCalledWith('role');
      expect(result).toBeNull();
    });
  });
});