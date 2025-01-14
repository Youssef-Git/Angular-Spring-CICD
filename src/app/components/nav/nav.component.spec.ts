import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logOut', 'getNom', 'getRole']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);
    
    await TestBed.configureTestingModule({
      imports: [
        NavComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue('Administrateur');
    spyOn(localStorage, 'removeItem');
    
    // Configure les retours des spies
    authService.logOut.and.callFake(() => {
      localStorage.removeItem('token');
      toastrService.success('Vous êtes déconnecté');
      router.navigate(['/login']);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickMonCompt()', () => {
    beforeEach(() => {
      spyOn(router, 'navigate');
    });

    it('should navigate to /admin if userRole is Administrateur', () => {
      component.userRole = 'Administrateur';
      component.onClickMonCompt();
      expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    });

    it('should navigate to /membre if userRole is Membre', () => {
      component.userRole = 'Membre';
      component.onClickMonCompt();
      expect(router.navigate).toHaveBeenCalledWith(['/membre']);
    });

    it('should navigate to /observateur if userRole is Observateur', () => {
      component.userRole = 'Observateur';
      component.onClickMonCompt();
      expect(router.navigate).toHaveBeenCalledWith(['/observateur']);
    });

    it('should log an error if userRole is unknown', () => {
      spyOn(console, 'error');
      component.userRole = 'Inconnu';
      component.onClickMonCompt();
      expect(console.error).toHaveBeenCalledWith("Une erreur s'est produite");
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('loggedOut()', () => {
    it('should call auth.logOut()', () => {
      spyOn(router, 'navigate');
      component.loggedOut();
      expect(authService.logOut).toHaveBeenCalled();
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(toastrService.success).toHaveBeenCalledWith('Vous êtes déconnecté');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('ngOnInit()', () => {
    it('should get role from localStorage', () => {
      component.ngOnInit();
      expect(localStorage.getItem).toHaveBeenCalledWith('role');
      expect(component.userRole).toBe('Administrateur');
    });
  });

  describe('ImgLogo', () => {
    it('should have correct image path', () => {
      expect(component.ImgLogo).toBe('assets/logo-vignette.png');
    });
  });
});