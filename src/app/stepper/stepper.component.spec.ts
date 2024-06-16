import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './stepper.component';
import { StepStatus } from './models/stepper.enum';
import { stepsMock } from '../mocks/mock-data';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperComponent],
      imports: [BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update step statuses on initialization', () => {
      const spy = spyOn(component as any, 'updateStepStatuses');
      component.steps = [...stepsMock];
      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    it('should update step statuses when currentStep or steps change', () => {
      const spy = spyOn(component as any, 'updateStepStatuses');
      component.steps = [...stepsMock];
      component.currentStep = 1;
      component.ngOnChanges({
        steps: {
          currentValue: [...stepsMock],
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        },
        currentStep: {
          currentValue: 1,
          previousValue: 0,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updateStepStatuses', () => {
    it('should correctly update step statuses based on current step', () => {
      component.steps = [...stepsMock];
      component.currentStep = 2;
      (component as any).updateStepStatuses();

      expect(component.steps[0].status).toBe(StepStatus.Completed);
      expect(component.steps[1].status).toBe(StepStatus.Completed);
      expect(component.steps[2].status).toBe(StepStatus.Active);
    });
  });

  describe('trackByFn', () => {
    it('should return the index as the tracking identifier', () => {
      expect(component.trackByFn(0)).toBe(0);
      expect(component.trackByFn(1)).toBe(1);
    });
  });
});
