import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesAdminComponent } from './articles-admin.component';

describe('ArticlesAdminComponent', () => {
  let component: ArticlesAdminComponent;
  let fixture: ComponentFixture<ArticlesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
