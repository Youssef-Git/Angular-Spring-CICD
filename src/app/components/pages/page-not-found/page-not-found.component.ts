import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{

  constructor(    private router: Router){}

  ngOnInit(): void {
  }

  onDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
