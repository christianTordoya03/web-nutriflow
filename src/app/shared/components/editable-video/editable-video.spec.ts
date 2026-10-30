import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableVideo } from './editable-video';

describe('EditableVideo', () => {
  let component: EditableVideo;
  let fixture: ComponentFixture<EditableVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
