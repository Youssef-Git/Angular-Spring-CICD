import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component} from '@angular/core';
import { AuthService } from './auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth.component';



describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent, ToastrModule.forRoot() ],
      
  
    })
    .compileComponents();
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
