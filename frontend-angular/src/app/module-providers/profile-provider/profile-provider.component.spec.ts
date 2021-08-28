import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProviderComponent } from './profile-provider.component';

describe('ProfileProviderComponent', () => {
  let component: ProfileProviderComponent;
  let fixture: ComponentFixture<ProfileProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
