import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: [],
    standalone: false
})
export class PagesComponent implements OnInit {


  ngOnInit() {
    init_plugins();
  }

}
