import { Component, Input } from '@angular/core';

@Component({
    selector: 'pa-step',
    templateUrl: './step.component.html'
})
export class StepComponent {
    @Input() public active = false;
}
