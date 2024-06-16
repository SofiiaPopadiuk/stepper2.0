import { StepStatus } from "./stepper.enum";

export interface StepConfig {
  label: string;
  status?: StepStatus;
}
