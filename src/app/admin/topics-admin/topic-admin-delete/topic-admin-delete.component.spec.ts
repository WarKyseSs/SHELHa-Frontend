import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAdminDeleteComponent } from './topic-admin-delete.component';

describe('TopicAdminDeleteComponent', () => {
  let component: TopicAdminDeleteComponent;
  let fixture: ComponentFixture<TopicAdminDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicAdminDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicAdminDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
