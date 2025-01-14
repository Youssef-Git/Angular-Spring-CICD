import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Project Methods', () => {
    it('should get all projects', () => {
      const mockProjects = [
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' }
      ];

      service.getProjects().subscribe((projects: any[]) => {
        expect(projects).toEqual(mockProjects);
      });

      const req = httpMock.expectOne('http://localhost:8081/projet');
      expect(req.request.method).toBe('GET');
      req.flush(mockProjects);
    });

    it('should get project by id', () => {
      const mockProject = { id: 1, name: 'Project 1' };

      service.getProjectById(1).subscribe((project: any) => {
        expect(project).toEqual(mockProject);
      });

      const req = httpMock.expectOne('http://localhost:8081/projet/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockProject);
    });

    it('should post project', () => {
      const mockProject = { name: 'New Project' };

      service.postProject(mockProject).subscribe((project: any) => {
        expect(project).toEqual(mockProject);
      });

      const req = httpMock.expectOne('http://localhost:8081/projet');
      expect(req.request.method).toBe('POST');
      req.flush(mockProject);
    });

    it('should update project', () => {
      const mockProject: any = { id: 1, name: 'Updated Project' };

      service.updateProject(mockProject).subscribe((project: any) => {
        expect(project).toEqual(mockProject);
      });

      const req = httpMock.expectOne('http://localhost:8081/projet/1');
      expect(req.request.method).toBe('PUT');
      req.flush(mockProject);
    });

    it('should delete project', () => {
      service.deleteProject(1).subscribe();

      const req = httpMock.expectOne('http://localhost:8081/projet/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('User Methods', () => {
    it('should get all users', () => {
      const mockUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' }
      ];

      service.getUsers().subscribe((users: any[]) => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne('http://localhost:8081/utilisateur');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should get user by id', () => {
      const mockUser: any = { id: 1, name: 'User 1' };
      const mockData = {};

      service.getUserById(1, mockData).subscribe((user: any) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne('http://localhost:8081/utilisateur/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should post user', () => {
      const mockUser: any = { name: 'New User' };

      service.postUsers(mockUser).subscribe((user: any) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne('http://localhost:8081/utilisateur');
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    });
  });

  describe('History Methods', () => {
    it('should navigate to historiques when onClickVoirHistorique is called', () => {
      spyOn(router, 'navigate');
      service.onClickVoirHistorique();
      expect(router.navigate).toHaveBeenCalledWith(['/historiques']);
    });

    it('should get history', () => {
      const mockHistory = [
        { id: 1, action: 'Action 1' },
        { id: 2, action: 'Action 2' }
      ];

      service.getHistory().subscribe((history: any[]) => {
        expect(history).toEqual(mockHistory);
      });

      const req = httpMock.expectOne('http://localhost:8081/historique');
      expect(req.request.method).toBe('GET');
      req.flush(mockHistory);
    });

    it('should log action', () => {
      service.logAction('test', 'user', 'admin');

      const req = httpMock.expectOne('http://localhost:8081/historique');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.action).toBe('test');
      expect(req.request.body.username).toBe('user');
      expect(req.request.body.role).toBe('admin');
      req.flush({});
    });
  });
});