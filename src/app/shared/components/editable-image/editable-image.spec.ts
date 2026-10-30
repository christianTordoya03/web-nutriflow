import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableImage } from './editable-image';

describe('EditableImage', () => {
  let component: EditableImage;
  let fixture: ComponentFixture<EditableImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
