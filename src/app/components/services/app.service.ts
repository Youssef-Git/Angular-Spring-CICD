import { Injectable } from '@angular/core';
import { HttpClient ,} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AppService {


  private  urlApiProject = 'http://localhost:8081/projet';
  private urlApiUsers = 'http://localhost:8081/utilisateur';
  private urlApiHistory = 'http://localhost:8081/historique';

  constructor( 
    private http: HttpClient,
    private router: Router
  ) {}

  // Methodes Http projets
  getProjects(): Observable<any[]>{
    return this.http.get<any[]>(this.urlApiProject);
  }

  getProjectById(id: number): Observable<any>{
    return this.http.get(`${this.urlApiProject}/${id}`);
  }

  postProject(postData: any): Observable<any> {
    return this.http.post<any>(this.urlApiProject, postData, );
  }
  
  putProject(id:number , putData: any): Observable<any>{
    return this.http.put(`${this.urlApiProject}/${id}`, putData)
  }
  
  patchProject(projectId: number, patchData:any): Observable<any>{
    return this.http.patch(`${this.urlApiProject}/${projectId}`, patchData);
  }

  updateProject(project: any): Observable<any>{
    return this.http.put(`${this.urlApiProject}/${project.id}`, project)
  }

  deleteProject(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlApiProject}/${id}`);
  }

// Methodes Http utilisateus
getUsers(): Observable<any[]>{
  return this.http.get<any[]>(this.urlApiUsers);
}

getUserById(id: number, projectData: any): Observable<any[]>{
  return this.http.get<any>(`${this.urlApiUsers}/${id}`);
}
postUsers(usersData: any): Observable<any> {
  return this.http.post<any>(this.urlApiUsers, usersData, );
}
putUsers(id: number, usersData: any): Observable<any> {
  return this.http.put<any>(`${this.urlApiUsers}/${id}`, usersData);
}
patchUsers(userId: number, usersData: any): Observable<any> {
  return this.http.patch(`${this.urlApiUsers}/${userId}`, usersData);
}
deleteUsers(id: number): Observable<any> {
  return this.http.delete<any>( `${this.urlApiUsers}/${id}`);
}
updateUser(id:number , updateData: any){
  return this.http.put(`${this.urlApiUsers}/${id}`, updateData)
}

// Methodes Http Historiques
logAction(action: string,  username: string, role: string): void {
  const log = { action, username, role ,timestamp: new Date() };
  this.http.post(this.urlApiHistory, log).subscribe();
}

getHistory(): Observable<any[]>{
  return this.http.get<any[]>(this.urlApiHistory);
}
postHistory(historyData: any): Observable<any> {
  return this.http.post<any>(this.urlApiHistory, historyData, );
}
deleteHistory(id:number): Observable<any>{
  return this.http.delete(`${this.urlApiHistory}/${id}`)
}

onClickVoirHistorique() {
  this.router.navigate(['/historiques']);
}


}