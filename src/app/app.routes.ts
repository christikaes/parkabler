import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { TextComponent } from './text';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'text', component: TextComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
