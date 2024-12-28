import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {AppService} from '../../services/app.service';
import {AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-historiques',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FontAwesomeModule],
  templateUrl: './historiques.component.html',
  styleUrl: './historiques.component.css',
  providers: [AppService, AuthService]
})
export class HistoriquesComponent implements OnInit {
  faTrash=faTrash;
  projectHistory:any[]=[];

  constructor(
    private appService: AppService,
    private authService: AuthService) { }
  


  ngOnInit(){
    this.loadHistory()
  }

  loadHistory(){
    this.appService.getHistory().subscribe((history) => {
      this.projectHistory = history;
      console.log(history)
    })
  }

  deleteHistory(id:number){
    this.appService.deleteHistory(id).subscribe((response) => {
      console.log(response)
      this.loadHistory();
    })
  }
}
