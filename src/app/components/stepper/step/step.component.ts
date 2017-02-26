import { Component, Input, Output, EventEmitter } from '@angular/core';
import Animations from './step.animation';

@Component({
    selector: 'pa-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss'],
    animations: Animations
})
export class StepComponent {
    @Input() public state = 'inactive';
    @Input() public nextCopy = 'Next';
    @Input() public previousCopy = 'Back';

    @Output() public next = new EventEmitter();
    @Output() public previous = new EventEmitter();

    onNext() {
        this.next.emit();
    }

    onPrevious() {
        this.previous.emit();
    }
}
