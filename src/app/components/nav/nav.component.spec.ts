import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['logOut']);
    
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NavComponent ],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth.logOut()', () => {
    spyOn(router, 'navigate');
    component.loggedOut();
    expect(authService.logOut).toHaveBeenCalled();
  });
});