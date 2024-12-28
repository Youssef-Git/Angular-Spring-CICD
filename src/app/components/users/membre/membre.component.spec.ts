import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MembreComponent } from './membre.component';

describe('MembreComponent', () => {
  let component: MembreComponent;
  let fixture: ComponentFixture<MembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembreComponent, HttpClientTestingModule,  ToastrModule.forRoot() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
