import { Component, Input,  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent {
  @Input() items: NavItem[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, 
              private matIconRegistry: MatIconRegistry) {
                this.matIconRegistry.addSvgIcon(
                  'usa_flag',
                  'assets/usa.svg'
                );
              }

}

export class NavItem {
  text: string;
  href: string;
  children?: NavItem[];
  expanded?: boolean;
}
