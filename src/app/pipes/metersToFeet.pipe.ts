import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paMetersToFeet'
})
export class MetersToFeetPipe implements PipeTransform {
    transform(meters: number): string {
        let feet = Math.round(meters * 3.28084);
        if (isNaN(feet)) {
            return 'approximately 800';
        }
        return feet.toString();
    }
}
