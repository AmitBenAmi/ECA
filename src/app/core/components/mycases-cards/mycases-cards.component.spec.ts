import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycasesCardsComponent } from './mycases-cards.component';

describe('MycasesCardsComponent', () => {
  let component: MycasesCardsComponent;
  let fixture: ComponentFixture<MycasesCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycasesCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycasesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
