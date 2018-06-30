import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWidgetContainerComponent } from './profile-widget-container.component';

describe('ProfileWidgetContainerComponent', () => {
  let component: ProfileWidgetContainerComponent;
  let fixture: ComponentFixture<ProfileWidgetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWidgetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWidgetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
