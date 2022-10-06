import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewPlayerComponent } from './edit-new-player.component';

describe('EditNewPlayerComponent', () => {
  let component: EditNewPlayerComponent;
  let fixture: ComponentFixture<EditNewPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
