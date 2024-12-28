import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesComponent } from './historiques.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';


describe('HistoriquesComponent', () => {
  let component: HistoriquesComponent;
  let fixture: ComponentFixture<HistoriquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriquesComponent, HttpClientTestingModule, ToastrModule.forRoot() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
