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

  constructor( public ajustando: SettingsService) {
    console.log("Angular CARGÓ el AppComponent");
   }

   ngAfterViewInit() {
    console.log("Angular terminó de renderizar. Ejecutando init_plugins...");
    try {
      init_plugins();
      console.log("init_plugins ejecutado correctamente");
    } catch (e) {
      console.error("Error ejecutando init_plugins:", e);
    }
  }
}
