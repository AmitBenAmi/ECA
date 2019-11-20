import { Component, OnInit } from '@angular/core';
import { NavItem } from './core/components/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ECA';

  constructor() {}

  async ngOnInit() {}

  navitems : NavItem[]= [
    {text: 'פרטים אישיים', href:'/', children: [{text: 'עדכון טלפון ודואר אלקטרוני', href:'/events'}], expanded: true},
    {
      text: 'פעילות בתיק', 
      href:'/', 
      children: [
        {text: 'הגשת בקשה', href:'/'},
        {text: 'בקשות בהמתנה/נדחו', href:'/'},
        {text: 'פתיחת תיק', href:'/'},
        {text: 'פעילויות עיקריות בתיקים', href:'/'},
        {text: 'הוספת ייצוג בתיקים', href: '/'},
        {text: 'תוצאות הוספת ייצוג', href: '/'}
      ]
    },
    {
      text: 'פעילות במערכת',
      href: '/',
      children: [
        {text: 'יומן לשכה', href: '/'},
        {text: 'תיקים לתאריך פתיחה', href: '/'},
        {text: 'תיקים שלי', href: '/'},
        {text: 'בדיקת הליך ביצוע', href: '/'},
        {text: 'לתשלום בכרטיס אשראי', href: '/'},
      ]
    }
  ]
}
