export enum AppModes {
    Home,
    AddSpot,
    ReportSpot,
    SpotsList
}

export type AddSpotModes = 'open'
                        | 'closed'
                        | 'setlocation'
                        | 'setdetails'
                        | 'submitted' ;

export type ReportSpotModes = 'open'
                        | 'closed'
                        | 'setdetails'
                        | 'submitted' ;

export type SpotsListModes = 'open'
                        | 'closed'
                        | 'expanded' ;

