import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpsTemplateComponent } from './fps-template.component';

describe('FpsTemplateComponent', () => {
  let component: FpsTemplateComponent;
  let fixture: ComponentFixture<FpsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
