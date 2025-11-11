import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ParentComponent} from './parent.component';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ParentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'angular-demo' title`, () => {
    const fixture = TestBed.createComponent(ParentComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-demo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-demo');
  });
});
