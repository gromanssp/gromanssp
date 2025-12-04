import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'adminpro';

  constructor( public ajustando: SettingsService) { }
}
