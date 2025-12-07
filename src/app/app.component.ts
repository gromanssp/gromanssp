import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';
import { RouterOutlet } from '@angular/router';

declare function init_plugins(): void;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
      RouterOutlet
    ],
    standalone: true
})
export class AppComponent {
  title = 'adminpro';

  constructor( public ajustando: SettingsService) {}

   ngAfterViewInit() {
     init_plugins();
   }
}
