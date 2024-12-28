import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ObservateurComponent } from './observateur.component';

describe('ObservateurComponent', () => {
  let component: ObservateurComponent;
  let fixture: ComponentFixture<ObservateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservateurComponent, HttpClientTestingModule,  ToastrModule.forRoot() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
