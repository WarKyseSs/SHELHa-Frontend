import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsAdminCreateComponent } from './topics-admin-create.component';

describe('TopicsAdminCreateComponent', () => {
  let component: TopicsAdminCreateComponent;
  let fixture: ComponentFixture<TopicsAdminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsAdminCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicsAdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
