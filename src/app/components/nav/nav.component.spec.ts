import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logOut']);
    
    await TestBed.configureTestingModule({
      imports: [
        NavComponent, 
        RouterTestingModule, 
        HttpClientTestingModule, 
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
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
      component.loggedOut();
      expect(authService.logOut).toHaveBeenCalled();
    });
  });
});

