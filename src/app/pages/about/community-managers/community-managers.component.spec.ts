import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityManagersComponent } from './community-managers.component';

describe('CommunityManagersComponent', () => {
  let component: CommunityManagersComponent;
  let fixture: ComponentFixture<CommunityManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
