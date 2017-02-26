import { Component, Input } from '@angular/core';
import Animations from './step.animation';

@Component({
    selector: 'pa-step',
    templateUrl: './step.component.html',
    animations: Animations
})
export class StepComponent {
    @Input() public state = 'inactive';
}
