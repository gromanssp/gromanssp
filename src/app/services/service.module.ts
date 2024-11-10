import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModalUploadService } from '../components/modals-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGardGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  AdminGuard,
  VerificaTokenGuard,
  ComputadoraService
 } from './service.index';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        LoginGardGuard,
        SubirArchivoService,
        ModalUploadService,
        HospitalService,
        MedicoService,
        AdminGuard,
        VerificaTokenGuard,
        ComputadoraService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ServiceModule { }
