import { NgModule } from '@angular/core';
import { PAGES_ROUTER } from './pages.routers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ng2- charts
import { ChartsModule } from 'ng2-charts';

import { ShareModule } from '../shared/share.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// Pipe Modulo
import { PipesModule } from '../pipes/pipes.module';


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ComputersComponent } from './computers/computers.component';
import { ComputerComponent } from './computers/computer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent,
        ComputersComponent,
        ComputerComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    imports: [
        CommonModule,
        ShareModule,
        PAGES_ROUTER,
        FormsModule,
        ChartsModule,
        PipesModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ]
})
export class PagesModule {}
