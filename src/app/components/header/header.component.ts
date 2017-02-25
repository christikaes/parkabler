import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AppModeActions } from '~/actions';

@Component({
  selector: 'pa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private mdIconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer,
    private appModeActions: AppModeActions
  ) {
     mdIconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('img/logo.svg'));
  }

   onClickHome() {
    this.appModeActions.setModeToHome();
   }
}
