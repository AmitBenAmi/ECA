import { Component } from '@angular/core';
import { NavItem } from './core/components/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ECA';

  navitems : NavItem[]= [
    {text: 'בלהבלה', href:'/'}
  ]
}
