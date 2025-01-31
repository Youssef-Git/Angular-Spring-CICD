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
    spyOn(router, 'navigate');

    // Ne pas configurer le comportement de logOut ici
    // Laissez-le comme un simple spy
    
    fixture.detectChanges();
  });

  // ... autres tests ...

  describe('loggedOut()', () => {
    it('should call auth.logOut()', () => {
      // Act
      component.loggedOut();

      // Assert
      expect(authService.logOut).toHaveBeenCalled();
    });
  });

  // ... autres tests ...
});
