import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { AdduserformComponent } from './adduserform.component';

describe('AdduserformComponent', () => {
  let component: AdduserformComponent;
  let fixture: ComponentFixture<AdduserformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdduserformComponent, HttpClientTestingModule, ToastrModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
