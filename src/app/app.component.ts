import { Component, Inject} from '@angular/core';
import { NavItem } from './core/components/nav/nav.component';
import {TranslateService} from '@ngx-translate/core';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent{
  title = 'ECA';

  navitems : NavItem[]= null;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private translate: TranslateService) {
    
    translate.setDefaultLang(locale);
    translate.get("test").subscribe(() => {
      this.navitems = [
        {text: this.translate.instant("navbar.personalDetails.text"), icon:"search", href:'/', children: [{text: this.translate.instant("navbar.personalDetails.updateDetails.text"), href:'/events'}], expanded: true},
        {
          text: this.translate.instant("navbar.caseActivities.text"), 
          href:'/', 
          children: [
            {text: this.translate.instant("navbar.caseActivities.requestSubmit.text"), href:'/formdemo'},
            {text: this.translate.instant("navbar.caseActivities.waitRejectRequests.text"), href:'/'},
            {text: this.translate.instant("navbar.caseActivities.openCase.text"), href:'/'},
            {text: this.translate.instant("navbar.caseActivities.mainActivities.text"), href:'/'},
            {text: this.translate.instant("navbar.caseActivities.addRepresntative.text"), href: '/'},
            {text: this.translate.instant("navbar.caseActivities.addRepresntResult.text"), href: '/'}
          ]
        },
        {
          text: this.translate.instant("navbar.appActivities.text"),
          href: '/',
          children: [
            {text: this.translate.instant("navbar.appActivities.lishka.text"), href: '/'},
            {text: this.translate.instant("navbar.appActivities.caseForDate.text"), href: '/'},
            {text: this.translate.instant("navbar.appActivities.myCases.text"), href: '/'},
            {text: this.translate.instant("navbar.appActivities.checkProcess.text"), href: '/'},
            {text: this.translate.instant("navbar.appActivities.payment.text"), href: '/'},
          ]
        }
      ];
    })   
  }
  
}
