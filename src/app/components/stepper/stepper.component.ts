import { Component, QueryList, ContentChildren, OnInit, AfterContentInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { StepComponent } from './step';

@Component({
    selector: 'pa-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterContentInit {
    @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

    private currentStepIndex: number;

    @Output() private cancel = new EventEmitter();
    @Output() private done = new EventEmitter();
    @Output() private stepChange = new EventEmitter();

    constructor() {}

    ngOnInit() {
        this.reset();
    }

    public onCancel() {
        this.cancel.emit();
        this.reset();
    }

    public onDone() {
        this.done.emit();
        this.reset();
    }

    public onNext() {
        let nextStepIndex = this.currentStepIndex + 1;
        if (nextStepIndex < this.steps.length) {
            this.currentStepIndex = nextStepIndex;
            this.setStep();
        }
    }

    public onPrevious() {
        let previousStepIndex = this.currentStepIndex - 1;
        if (previousStepIndex > -1) {
            this.currentStepIndex = previousStepIndex;
            this.setStep();
        }
    }

    private reset() {
        this.currentStepIndex = 0;
    }

    ngAfterContentInit() {
       this.setStep();
    }

    private setStep() {
        let current = this.steps.toArray()[this.currentStepIndex];
        if (current) {
            current.state = 'active';

            let nextStepIndex = this.currentStepIndex + 1;
            if (nextStepIndex < this.steps.length){
                this.steps.toArray()[nextStepIndex].state = 'next';

                if (nextStepIndex < this.steps.length - 1) {
                    this.steps.toArray()[nextStepIndex + 1].state = 'inactive';
                }
            }

            let previousStepIndex = this.currentStepIndex - 1;
            if (previousStepIndex > -1){
                this.steps.toArray()[previousStepIndex].state = 'previous';

                if (previousStepIndex > 0) {
                    this.steps.toArray()[previousStepIndex - 1].state = 'inactive';
                }
            }
        }

        this.stepChange.emit(this.currentStepIndex);
    }
}
