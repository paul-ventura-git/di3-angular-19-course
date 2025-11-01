import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpMethodsComponent } from './http-methods.component';

describe('HttpMethodsComponent', () => {
  let component: HttpMethodsComponent;
  let fixture: ComponentFixture<HttpMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpMethodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
