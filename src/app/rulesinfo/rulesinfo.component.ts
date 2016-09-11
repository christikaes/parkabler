import { Component, OnInit } from '@angular/core';
import { RulesInfoService } from '../services';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rules-info',
  templateUrl: './rulesinfo.component.html',
  styleUrls: ['./rulesinfo.component.scss']
})
export class RulesInfoComponent implements OnInit {
  private rules: any;
  private sub: Subscription;
  private title: string;
  private content: any[];
  private id: number;
  private isHome: boolean;

  private updateContent = function(){
    if(!this.rules)
      return;
    if(this.rules[this.id]){
      this.title = this.rules[this.id].title;
      this.content = this.rules[this.id].content;
      this.isHome = false;
      console.log(this.title)
      console.log(this.content)
    } else {
      this.title = "Rules and Regulations"
      this.content = [];
      this.isHome = true;
      for (let i = 0; i < this.rules.length; i++) {
          let text = this.rules[i].title;
          let href = ['/rulesinfo', {id: i}];
          this.content.push({
            "text": text,
            "href": href
          });
      }
    }
  }

  constructor(
    private rulesInfoService: RulesInfoService,
    private route: ActivatedRoute
  ) {
    rulesInfoService.rules.subscribe(res => {
      this.rules = res[0];
      this.updateContent();
    });
  }

  ngOnInit() {
    console.log("here")
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       this.updateContent();
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
