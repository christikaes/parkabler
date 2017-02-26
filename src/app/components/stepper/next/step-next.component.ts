import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pa-step-next',
    templateUrl: './step-next.component.html'
})
export class StepNextComponent {
    @Output() private next = new EventEmitter();

    onNext() {
        this.next.emit();
    }
}
