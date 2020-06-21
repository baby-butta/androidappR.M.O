import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FillDataPage } from './fill-data.page';

describe('FillDataPage', () => {
  let component: FillDataPage;
  let fixture: ComponentFixture<FillDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FillDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
