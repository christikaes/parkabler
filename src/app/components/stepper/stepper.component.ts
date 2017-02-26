import {
    Component,
    QueryList,
    ContentChildren,
    AfterContentInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';
import { StepComponent } from './step';

@Component({
    selector: 'pa-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnChanges, AfterContentInit {
    private currentStepIndex = 0;

    @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

    @Input() private stepIndex: number;

    @Output() private cancel = new EventEmitter();
    @Output() private done = new EventEmitter();
    @Output() private stepChange = new EventEmitter();

    ngOnChanges(changes: SimpleChanges) {
        for (let change in changes) {
            if (change === 'stepIndex') {
                this.currentStepIndex = changes[change].currentValue;
                this.setStep();
            }
        }
    }

    public onNext() {
        let nextStepIndex = this.currentStepIndex + 1;
        if (nextStepIndex < this.steps.length) {
            this.currentStepIndex = nextStepIndex;
            this.setStep();
        } else {
            this.done.emit();
            this.reset();
        }
    }

    public onPrevious() {
        let previousStepIndex = this.currentStepIndex - 1;
        if (previousStepIndex > -1) {
            this.currentStepIndex = previousStepIndex;
            this.setStep();
        } else {
            this.cancel.emit();
            this.reset();
        }
    }

    private reset() {
        this.currentStepIndex = 0;
    }

    ngAfterContentInit() {
        // Subscribe to events from each step:
        this.steps.forEach( step => {
            step.next.subscribe(() => this.onNext());
            step.previous.subscribe(() => this.onPrevious());
        });

        this.setStep();
    }

    private setStep() {
        if (!this.steps) {
            // content has not yet been initialized
            return;
        }

        // Set the current step
        let current = this.steps.toArray()[this.currentStepIndex];
        if (current) {
            current.state = 'active';

            // Previous and next are necessary for animation:

            // Set the next step, and make anything after that inactive
            let nextStepIndex = this.currentStepIndex + 1;
            if (nextStepIndex < this.steps.length) {
                this.steps.toArray()[nextStepIndex].state = 'next';

                if (nextStepIndex < this.steps.length - 1) {
                    this.steps.toArray()[nextStepIndex + 1].state = 'inactive';
                }
            }

            // Set the previous step, and make anything before that inactive
            let previousStepIndex = this.currentStepIndex - 1;
            if (previousStepIndex > -1) {
                this.steps.toArray()[previousStepIndex].state = 'previous';

                if (previousStepIndex > 0) {
                    this.steps.toArray()[previousStepIndex - 1].state = 'inactive';
                }
            }

            // Emit the new step value
            this.stepChange.emit(this.currentStepIndex);
        }
    }
}
