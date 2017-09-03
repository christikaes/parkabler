import { RouterModule, Routes } from '@angular/router';

import {
  HomeComponent,
  RulesInfoComponent
} from './pages';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rulesinfo', component: RulesInfoComponent },
  { path: 'rulesinfo/:id', component: RulesInfoComponent },
  { path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(routes);
