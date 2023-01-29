import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsAdminUpdateComponent } from './topics-admin-update.component';

describe('TopicsAdminUpdateComponent', () => {
  let component: TopicsAdminUpdateComponent;
  let fixture: ComponentFixture<TopicsAdminUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsAdminUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicsAdminUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
