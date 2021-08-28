import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProviderComponent } from './edit-provider.component';

describe('EditProviderComponent', () => {
  let component: EditProviderComponent;
  let fixture: ComponentFixture<EditProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
