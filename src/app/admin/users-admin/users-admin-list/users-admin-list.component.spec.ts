import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdminListComponent } from './users-admin-list.component';

describe('UsersAdminListComponent', () => {
  let component: UsersAdminListComponent;
  let fixture: ComponentFixture<UsersAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAdminListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
