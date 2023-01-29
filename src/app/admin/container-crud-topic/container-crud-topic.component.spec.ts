import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCrudTopicComponent } from './container-crud-topic.component';

describe('ContainerCrudTopicComponent', () => {
  let component: ContainerCrudTopicComponent;
  let fixture: ComponentFixture<ContainerCrudTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerCrudTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerCrudTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
