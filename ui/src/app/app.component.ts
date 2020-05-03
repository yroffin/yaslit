import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui';
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Views',
        icon: 'pi pi-list',
        items: [
          { label: 'Project', icon: 'pi pi-fw pi-folder', routerLink: ['/project'] },
          { label: 'Core', icon: 'pi pi-fw pi-tags', routerLink: ['/core'] },
          { label: 'Graph', icon: 'pi pi-fw pi-sitemap', routerLink: ['/graph'] }
        ]
      }
    ];
  }
}
