import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paMetersToFeet'
})
export class MetersToFeetPipe implements PipeTransform {
    transform(meters: number): number {
        return Math.round(meters * 3.28084);
    }
}
