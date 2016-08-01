import { Component, OnInit } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  directives: [MdToolbar, MdIcon],
  viewProviders: [MdIconRegistry]
})
export class HeaderComponent implements OnInit {

  constructor(mdIconRegistry: MdIconRegistry) {
    // Sample to register more icons:
    // mdIconRegistry
    //     .addSvgIcon('thumb-up', '/demo-app/icon/assets/thumbup-icon.svg')
    //     .addSvgIconSetInNamespace('core', '/demo-app/icon/assets/core-icon-set.svg')
    //     .registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {}
}
