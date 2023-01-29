import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesListComponent } from './messages-list.component';

describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
