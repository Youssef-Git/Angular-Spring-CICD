import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent ;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,BrowserAnimationsModule,  RouterTestingModule, CommonModule,  HttpClientTestingModule, ToastrModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  
  it('should create the app', () => {
  
    expect(app).toBeTruthy();
  });

  it(`should have the 'app' title`, () => {
  
    expect(app.title).toEqual('app');
  });




});
