export type Tutorial = 'intro' | 'addSpot' | 'reportSpot' | 'spotsList';

export interface TutorialState {
    open: boolean;
    tutorial: Tutorial;
};
