import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers:[MatSidenav]
})

export class NavigationComponent implements OnInit {

  constructor(private sidenav: MatSidenav) { 
    
  }

  public toggle() {
    console.log('asdsadsad')
    this.sidenav.toggle()
  }
  ngOnInit() {
  }

}
