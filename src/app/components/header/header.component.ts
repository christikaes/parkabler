import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AppModeActions } from '~/actions';

@Component({
  selector: 'pa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private appModeActions: AppModeActions
  ) {
     matIconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('assets/img/logo.svg'));
  }

   onClickHome() {
    this.appModeActions.setModeHome();
   }
}
