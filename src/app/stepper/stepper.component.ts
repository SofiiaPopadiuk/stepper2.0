import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Direction, StepStatus } from './models/stepper.enum';
import { StepConfig } from './models/stepper.interfaces';
import { progressHorisontalAnimation, progressVerticalAnimation } from './progress.animations';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  animations: [
    progressHorisontalAnimation,
    progressVerticalAnimation
  ]
})
export class StepperComponent implements OnInit, OnChanges {
  @Input() steps: StepConfig[] = [];
  @Input() currentStep: number = 0;
  @Input() direction: Direction = Direction.Horizontal;
  @Input() color: string = '#22ECE9';
  StepStatus = StepStatus;
  StepperDirection = Direction;

  constructor() { }

  ngOnInit(): void {
    this.updateStepStatuses();
    document.documentElement.style.setProperty('--active', this.color);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep'] || changes['steps']) {
      this.updateStepStatuses();
    }
  }

  private updateStepStatuses(): void {
    this.steps = this.steps.map((step, index) => {
      if (index < this.currentStep) {
        return { ...step, status: StepStatus.Completed };
      }
      if (index === this.currentStep) {
        return { ...step, status: StepStatus.Active };
      }
      return { ...step, status: StepStatus.Default };
    });
  }

  trackByFn(index: number) {
    return index;
  }
}
