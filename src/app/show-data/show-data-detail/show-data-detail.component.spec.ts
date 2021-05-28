import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataDetailComponent } from './show-data-detail.component';

describe('ShowDataDetailComponent', () => {
  let component: ShowDataDetailComponent;
  let fixture: ComponentFixture<ShowDataDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDataDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
