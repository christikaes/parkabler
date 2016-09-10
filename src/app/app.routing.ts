import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { TextComponent } from './text';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'text', component: TextComponent },
  { path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(routes);
