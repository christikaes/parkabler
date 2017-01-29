import { Component, OnInit } from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'pa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
     mdIconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('img/logo.svg'));
   }
}
