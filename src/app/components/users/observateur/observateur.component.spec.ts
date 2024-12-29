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
  let authService: AuthService;

  beforeEach(async () => {
    const appServiceSpy = jasmine.createSpyObj('AppService', ['getProjects', 'onClickVoirHistorique']); 

    await TestBed.configureTestingModule({
      imports: [ObservateurComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
      providers: [
        { provide: AppService, useValue: appServiceSpy },
        { provide: AuthService, useValue: { getNom: jasmine.createSpy().and.returnValue('Test User'), getRole: jasmine.createSpy().and.returnValue('Observateur') }},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ObservateurComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;  
    authService = TestBed.inject(AuthService);

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
      const getProjectsSpy = spyOn(component, 'getProjects').and.callThrough();
      component.ngOnInit();
      expect(getProjectsSpy).toHaveBeenCalled();
    });
  });

  describe('userNom and userRole', () => {
    it('should get userNom and userRole from authService', () => {
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
