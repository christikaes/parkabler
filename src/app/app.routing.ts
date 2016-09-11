import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { TextComponent } from './text';
import { RulesInfoComponent } from './rulesinfo';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'text', component: TextComponent },
  { path: 'rulesinfo', component: RulesInfoComponent },
  { path: 'rulesinfo/:id', component: RulesInfoComponent },
  { path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(routes);
