import { Component, QueryList, ContentChildren, OnInit, AfterContentInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { StepComponent } from './step';

@Component({
    selector: 'pa-stepper',
    templateUrl: './stepper.component.html',
    styles: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterContentInit {
    @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

    private currentStep: number;

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
        let nextStep = this.currentStep + 1;
        if (nextStep < this.steps.length) {
            this.currentStep = nextStep;
            this.setStep();
            this.stepChange.emit(nextStep);
        }
    }

    public onPrevious() {
        let previousStep = this.currentStep - 1;
        if (previousStep > -1) {
            this.currentStep = previousStep;
            this.setStep();
            this.stepChange.emit(previousStep);
        }
    }

    private reset() {
        this.currentStep = 0;
    }

    ngAfterContentInit() {
       this.setStep();
    }

    private setStep() {
        this.steps.toArray().forEach(step => {
            step.active = false;
        });

        let current = this.steps.toArray()[this.currentStep];
        if (current) {
            current.active = true;
        }
    }
}
