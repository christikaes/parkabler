import { SpotsService } from './spots.service';
import { AngularFire } from 'angularfire2';

describe('when spots service is called', () => {
    
    it('should call for database value and save it', () => {
        let mockAngularFire : any = {
            database: {
                list : jasmine.createSpy('list').and.returnValue(3)
            }
        };
        
        let serviceToTest = new SpotsService(mockAngularFire as AngularFire);
        expect(mockAngularFire.database.list).toHaveBeenCalledTimes(1);
        expect(serviceToTest.get()).toEqual(3);
    });
});