import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDeleteComponent } from './pet-delete.component';

describe('PetDeleteComponent', () => {
  let component: PetDeleteComponent;
  let fixture: ComponentFixture<PetDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
