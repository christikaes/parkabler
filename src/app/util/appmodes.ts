export enum AppModes {
    Home,
    AddSpot,
    ReportSpot,
    SpotsList
}

export enum AddSpotSteps {
    Location,
    Details,
    Submitted
}

export enum ReportSpotSteps {
    Details,
    Submitted
}

export type SpotsListModes = 'open'
                        | 'closed'
                        | 'expanded' ;

export type StepStates = 'active'
                        | 'previous'
                        | 'next' ;
