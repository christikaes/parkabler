import { Component, OnInit, OnDestroy } from '@angular/core';
import { RulesInfoService } from '~/services';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import Animations from '~/animations';

@Component({
  selector: 'pa-rules-info',
  templateUrl: './rulesinfo.component.html',
  styleUrls: ['./rulesinfo.component.scss'],
  animations: Animations
})
export class RulesInfoComponent implements OnInit, OnDestroy {
  public isHome: boolean;
  public content: any[];
  public title: string;
  private rules: any;
  private sub: Subscription;
  private id: number;

  private updateContent = function(){
    if (!this.rules) {
      return;
    }
    if (this.rules[this.id]) {
      this.title = this.rules[this.id].title;
      this.content = this.rules[this.id].content;
      this.isHome = false;
    } else {
      this.title = 'Rules and Regulations';
      this.content = [];
      this.isHome = true;
      for (let i = 0; i < this.rules.length; i++) {
          let text = this.rules[i].title;
          let href = ['/rulesinfo', {id: i}];
          this.content.push({
            'text': text,
            'href': href
          });
      }
    }
  };

  constructor(
    private rulesInfoService: RulesInfoService,
    private route: ActivatedRoute
  ) {
    this.rules = rulesInfoService.rules;
    this.title = '';
    this.content = [];
    this.isHome = true;
    this.updateContent();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       this.updateContent();
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
