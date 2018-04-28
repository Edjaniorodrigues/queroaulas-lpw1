import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAnuncioComponent } from './detalhes-anuncio.component';

describe('DetalhesAnuncioComponent', () => {
  let component: DetalhesAnuncioComponent;
  let fixture: ComponentFixture<DetalhesAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
