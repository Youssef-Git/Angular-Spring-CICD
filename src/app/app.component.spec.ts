import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent ;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule, 
        ToastrModule.forRoot()
        ],
    
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });




});
