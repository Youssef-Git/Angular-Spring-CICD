import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ObservateurComponent } from './observateur.component';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';
import { of, throwError } from 'rxjs';

describe('ObservateurComponent', () => {
  let component: ObservateurComponent;
  let fixture: ComponentFixture<ObservateurComponent>;
  let appService: jasmine.SpyObj<AppService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const appServiceSpy = jasmine.createSpyObj('AppService', ['getProjects', 'onClickVoirHistorique']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserNom', 'getUserRole']); // Modifié ici
    
    authServiceSpy.getUserNom.and.returnValue('Test User');
    authServiceSpy.getUserRole.and.returnValue('Observateur');

    await TestBed.configureTestingModule({
      imports: [
        ObservateurComponent, 
        HttpClientTestingModule, 
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: AppService, useValue: appServiceSpy },
        { provide: AuthService, useValue: authServiceSpy } // Modifié ici
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ObservateurComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickVoirHistorique()', () => {
    it('should call onClickVoirHistorique() method of appService', () => {
      component.onClickVoirHistorique();
      expect(appService.onClickVoirHistorique).toHaveBeenCalled();
    });
  });

  describe('ngOnInit()', () => {
    it('should call getProjects()', () => {
      const getProjectsSpy = spyOn(component, 'getProjects');
      component.ngOnInit();
      expect(getProjectsSpy).toHaveBeenCalled();
    });
  });

  describe('userNom and userRole', () => {
    it('should get userNom and userRole from authService', () => {
      component.ngOnInit(); // Ajouté ici pour s'assurer que les valeurs sont initialisées
      expect(component.userNom).toBe('Test User');
      expect(component.userRole).toBe('Observateur');
    });
  });

  describe('getProjects()', () => {
    it('should call appService.getProjects() and set projectList', () => {
      const fakeProjects = [{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }];
      appService.getProjects.and.returnValue(of(fakeProjects));
      component.getProjects();
      expect(appService.getProjects).toHaveBeenCalled();
      expect(component.projectList).toEqual(fakeProjects);
    });

    it('should handle error when appService.getProjects() fails', () => {
      spyOn(console, 'error');
      const errorResponse = new Error('Error fetching projects');
      appService.getProjects.and.returnValue(throwError(() => errorResponse));
      component.getProjects();
      expect(console.error).toHaveBeenCalledWith(errorResponse);
    });
  });
});
