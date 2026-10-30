import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureSection } from './adventure-section';

describe('AdventureSection', () => {
  let component: AdventureSection;
  let fixture: ComponentFixture<AdventureSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventureSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
