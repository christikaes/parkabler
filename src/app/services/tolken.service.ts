import { Injectable } from '@angular/core';

@Injectable()
export class TolkenService {
    // TODO-rangle: how do i store this key safely?

    public getMapboxAccessTolken() {
        return 'pk.eyJ1IjoiY2hyaXN0aWthZXMiLCJhIjoiY2l6M2htYjB4MDV0aTMycHhvamVzenJwNSJ9.XJpbIPXuOhlu7T9riCD77g';
    }
}
