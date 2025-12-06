import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';


@Component({
    selector: 'app-accout-settings',
    templateUrl: './accout-settings.component.html',
    styles: [],
    standalone: true
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public ajustando: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {

    this.aplicarCheck( link );
    this.ajustando.aplicarTema( tema );
  }

  aplicarCheck( link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.ajustando.ajustes.tema;
    for (const ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
