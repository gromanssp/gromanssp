import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { ModalsUploadComponent } from '../components/modals-upload/modals-upload.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ImagenPipe } from '../pipes/imagen.pipe';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: [],
    imports: [
      CommonModule,
      FormsModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      RouterOutlet,
      SidebarComponent,
      HeaderComponent,
      ModalsUploadComponent,
      BreadcrumbsComponent
    ],
    standalone: true
})
export class PagesComponent {

  constructor() {  }
}
